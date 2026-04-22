import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantDto, HoraireDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantQueryDto } from './dto/restaurant-query.dto';
import { AlongRouteDto } from './dto/along-route.dto';

export type Creneau = { ouverture: string; fermeture: string };

export type RestaurantWithHoraires = {
  id: string;
  nom: string;
  imageUrls: string[];
  adresse: string;
  distinction: number;
  latitude: number | null;
  longitude: number | null;
  distance?: number;
  createdAt: Date;
  updatedAt: Date;
  horaires: {
    id: string;
    jour: string;
    creneaux: Creneau[];
  }[];
};

// Distance minimale (km) d'un point à un segment de droite (approximation planaire avec correction cosinus)
function pointToSegmentKm(
  pLat: number, pLng: number,
  aLat: number, aLng: number,
  bLat: number, bLng: number,
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

// Distance minimale (km) d'un point à un polyline GeoJSON ([lng, lat][])
function minDistanceToPolylineKm(lat: number, lng: number, coords: [number, number][]): number {
  let min = Infinity;
  for (let i = 0; i < coords.length - 1; i++) {
    const d = pointToSegmentKm(lat, lng, coords[i][1], coords[i][0], coords[i + 1][1], coords[i + 1][0]);
    if (d < min) min = d;
  }
  return min;
}

// Haversine formula — returns distance in km
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

@Injectable()
export class RestaurantRepository {
  constructor(private prisma: PrismaService) {}

  private parseRestaurant(raw: any, distance?: number): RestaurantWithHoraires {
    return {
      ...raw,
      imageUrls: JSON.parse(raw.imageUrls) as string[],
      distance,
      horaires: raw.horaires.map((h: any) => ({
        id: h.id,
        jour: h.jour,
        creneaux: JSON.parse(h.creneaux) as Creneau[],
      })),
    };
  }

  async findAll(query: RestaurantQueryDto = {}): Promise<RestaurantWithHoraires[]> {
    const { search, lat, lng, range = 15, distinction } = query;
    const hasGeo = lat !== undefined && lng !== undefined;

    const where: Record<string, any> = {};

    if (search) {
      where.nom = { contains: search };
    }

    if (distinction) {
      where.distinction = distinction;
    }

    // Bounding-box pre-filter (SQL level) — avoids loading the whole table
    if (hasGeo) {
      const deltaLat = range / 111;
      const deltaLng = range / (111 * Math.cos((lat! * Math.PI) / 180));
      where.latitude = { gte: lat! - deltaLat, lte: lat! + deltaLat };
      where.longitude = { gte: lng! - deltaLng, lte: lng! + deltaLng };
    }

    const raws = await this.prisma.restaurant.findMany({
      where,
      include: { horaires: true },
    });

    if (!hasGeo) {
      return raws.map((r) => this.parseRestaurant(r));
    }

    // Exact Haversine filter + sort by distance
    return raws
      .map((r) => {
        const dist = haversine(lat!, lng!, r.latitude!, r.longitude!);
        return { raw: r, dist };
      })
      .filter(({ dist }) => dist <= range)
      .sort((a, b) => a.dist - b.dist)
      .map(({ raw, dist }) => this.parseRestaurant(raw, Math.round(dist * 10) / 10));
  }

  async findAlongRoute(dto: AlongRouteDto): Promise<RestaurantWithHoraires[]> {
    const { coordinates, maxDistanceKm = 15, distinction } = dto;

    // Bounding box du trajet + marge maxDistanceKm pour le pre-filter SQL
    const lats = coordinates.map(([, lat]) => lat);
    const lngs = coordinates.map(([lng]) => lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const midLat = (minLat + maxLat) / 2;
    const deltaLat = maxDistanceKm / 110.574;
    const deltaLng = maxDistanceKm / (111.32 * Math.cos(midLat * (Math.PI / 180)));

    const where: Record<string, any> = {
      latitude: { gte: minLat - deltaLat, lte: maxLat + deltaLat },
      longitude: { gte: minLng - deltaLng, lte: maxLng + deltaLng },
    };

    if (distinction) where.distinction = distinction;

    const raws = await this.prisma.restaurant.findMany({ where, include: { horaires: true } });

    return raws
      .map((r) => {
        const dist = minDistanceToPolylineKm(r.latitude!, r.longitude!, coordinates);
        return { raw: r, dist };
      })
      .filter(({ dist }) => dist <= maxDistanceKm)
      .sort((a, b) => a.dist - b.dist)
      .map(({ raw, dist }) => this.parseRestaurant(raw, Math.round(dist * 10) / 10));
  }

  async findById(id: string): Promise<RestaurantWithHoraires | null> {
    const raw = await this.prisma.restaurant.findUnique({
      where: { id },
      include: { horaires: true },
    });
    return raw ? this.parseRestaurant(raw) : null;
  }

  async create(dto: CreateRestaurantDto): Promise<RestaurantWithHoraires> {
    const raw = await this.prisma.restaurant.create({
      data: {
        nom: dto.nom,
        imageUrls: JSON.stringify(dto.imageUrls),
        adresse: dto.adresse,
        distinction: dto.distinction,
        latitude: dto.latitude ?? null,
        longitude: dto.longitude ?? null,
        horaires: {
          create: this.serializeHoraires(dto.horaires ?? []),
        },
      },
      include: { horaires: true },
    });
    return this.parseRestaurant(raw);
  }

  async update(id: string, dto: UpdateRestaurantDto): Promise<RestaurantWithHoraires> {
    const data: any = {};

    if (dto.nom !== undefined) data.nom = dto.nom;
    if (dto.adresse !== undefined) data.adresse = dto.adresse;
    if (dto.distinction !== undefined) data.distinction = dto.distinction;
    if (dto.imageUrls !== undefined) data.imageUrls = JSON.stringify(dto.imageUrls);
    if (dto.latitude !== undefined) data.latitude = dto.latitude;
    if (dto.longitude !== undefined) data.longitude = dto.longitude;

    if (dto.horaires !== undefined) {
      await this.prisma.restaurantHoraire.deleteMany({ where: { restaurantId: id } });
      data.horaires = { create: this.serializeHoraires(dto.horaires) };
    }

    const raw = await this.prisma.restaurant.update({
      where: { id },
      data,
      include: { horaires: true },
    });
    return this.parseRestaurant(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.restaurant.delete({ where: { id } });
  }

  private serializeHoraires(horaires: HoraireDto[]) {
    return horaires.map((h) => ({
      jour: h.jour,
      creneaux: JSON.stringify(h.creneaux),
    }));
  }
}
