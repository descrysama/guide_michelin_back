import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExperienceQueryDto } from './dto/experience-query.dto';
import { AlongRouteExperienceDto } from './dto/along-route-experience.dto';

type ExperienceRow = {
  id: string;
  title: string;
  imageUrl: string;
  locationName: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  priceEur: number;
  description: string;
  category: string;
  duration: string;
  bookingUrl: string;
  sourceUrl: string | null;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  distance?: number;
};

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pointToSegmentKm(
  pLat: number,
  pLng: number,
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number,
): number {
  const cosLat = Math.cos(((aLat + bLat) / 2) * (Math.PI / 180));
  const ax = aLng * cosLat * 111.32;
  const ay = aLat * 110.574;
  const bx = bLng * cosLat * 111.32;
  const by = bLat * 110.574;
  const px = pLng * cosLat * 111.32;
  const py = pLat * 110.574;
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  const t = lenSq > 0 ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq)) : 0;
  return Math.sqrt((px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2);
}

function minDistanceToPolylineKm(lat: number, lng: number, coords: [number, number][]): number {
  let min = Infinity;
  for (let i = 0; i < coords.length - 1; i++) {
    const d = pointToSegmentKm(lat, lng, coords[i][1], coords[i][0], coords[i + 1][1], coords[i + 1][0]);
    if (d < min) min = d;
  }
  return min;
}

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ExperienceQueryDto = {}) {
    const { search, category, city, lat, lng, range = 25, limit = 30, featured } = query;

    const filters: string[] = [];
    const args: Array<string | number | boolean> = [];

    if (search) {
      filters.push('("title" LIKE ? OR "locationName" LIKE ? OR "city" LIKE ? OR "description" LIKE ?)');
      const token = `%${search}%`;
      args.push(token, token, token, token);
    }
    if (category) {
      filters.push('"category" = ?');
      args.push(category);
    }
    if (city) {
      filters.push('"city" LIKE ?');
      args.push(`%${city}%`);
    }
    if (featured !== undefined) {
      filters.push('"isFeatured" = ?');
      args.push(featured ? 1 : 0);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    const preLimit = lat === undefined || lng === undefined ? limit : Math.max(limit * 12, 250);
    const rows = (await this.prisma.$queryRawUnsafe(
      `SELECT * FROM "experiences" ${whereClause} ORDER BY "isFeatured" DESC, "updatedAt" DESC LIMIT ?`,
      ...args,
      preLimit,
    )) as ExperienceRow[];

    if (lat === undefined || lng === undefined) {
      return rows;
    }

    return rows
      .map((row) => ({ ...row, distance: haversineKm(lat, lng, row.latitude, row.longitude) }))
      .filter((row) => row.distance! <= range)
      .sort((a, b) => a.distance! - b.distance!)
      .slice(0, limit)
      .map((row) => ({ ...row, distance: Math.round(row.distance! * 10) / 10 }));
  }

  async highlights(limit = 8) {
    return this.findAll({ featured: true, limit });
  }

  async findById(id: string) {
    const rows = (await this.prisma.$queryRawUnsafe(
      'SELECT * FROM "experiences" WHERE "id" = ? LIMIT 1',
      id,
    )) as ExperienceRow[];

    if (!rows[0]) {
      throw new NotFoundException('Exp\u00e9rience introuvable');
    }
    return rows[0];
  }

  async findAlongRoute(dto: AlongRouteExperienceDto) {
    const { coordinates, maxDistanceKm = 15, limit = 20 } = dto;
    const path = coordinates.map((c) => [c.lng, c.lat] as [number, number]);

    const lats = path.map(([, lat]) => lat);
    const lngs = path.map(([lng]) => lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const midLat = (minLat + maxLat) / 2;
    const deltaLat = maxDistanceKm / 110.574;
    const deltaLng = maxDistanceKm / (111.32 * Math.cos(midLat * (Math.PI / 180)));

    const rows = (await this.prisma.$queryRawUnsafe(
      `SELECT * FROM "experiences"
       WHERE "latitude" BETWEEN ? AND ?
         AND "longitude" BETWEEN ? AND ?
       ORDER BY "isFeatured" DESC, "updatedAt" DESC`,
      minLat - deltaLat,
      maxLat + deltaLat,
      minLng - deltaLng,
      maxLng + deltaLng,
    )) as ExperienceRow[];

    return rows
      .map((row) => ({ ...row, distance: minDistanceToPolylineKm(row.latitude, row.longitude, path) }))
      .filter((row) => row.distance! <= maxDistanceKm)
      .sort((a, b) => a.distance! - b.distance!)
      .slice(0, limit)
      .map((row) => ({ ...row, distance: Math.round(row.distance! * 10) / 10 }));
  }
}

