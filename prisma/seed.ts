import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Creneau = { ouverture: string; fermeture: string };
type Horaire = { jour: string; creneaux: Creneau[] };
type RestaurantSeed = {
  nom: string;
  adresse: string;
  distinction: number;
  latitude: number;
  longitude: number;
  imageUrls: string[];
  horaires: Horaire[];
};

const restaurants: RestaurantSeed[] = [
  // ─── Lyon — 3 étoiles ────────────────────────────────────────
  {
    nom: 'Paul Bocuse',
    adresse: '40 Rue de la Plage, 69660 Collonges-au-Mont-d\'Or',
    distinction: 3,
    latitude: 45.9988,
    longitude: 4.8516,
    imageUrls: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },

  // ─── Lyon — 2 étoiles ────────────────────────────────────────
  {
    nom: 'Mère Brazier',
    adresse: '12 Rue Royale, 69001 Lyon',
    distinction: 2,
    latitude: 45.7679,
    longitude: 4.8338,
    imageUrls: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Takao Takano',
    adresse: '33 Rue du Bœuf, 69005 Lyon',
    distinction: 2,
    latitude: 45.7620,
    longitude: 4.8281,
    imageUrls: [
      'https://images.unsplash.com/photo-1551882547-ff40c4c5d09a?w=800',
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:15', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:15' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:15', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:15' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:15', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:15' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:15', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:15' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '19:30', fermeture: '21:15' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Neuvième Art',
    adresse: '173 Rue Cuvier, 69006 Lyon',
    distinction: 2,
    latitude: 45.7699,
    longitude: 4.8515,
    imageUrls: [
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },

  // ─── Lyon — 1 étoile ─────────────────────────────────────────
  {
    nom: 'Têtedoie',
    adresse: '14 Montée du Chemin Neuf, 69005 Lyon',
    distinction: 1,
    latitude: 45.7619,
    longitude: 4.8175,
    imageUrls: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Prairial',
    adresse: '11 Rue Chavanne, 69001 Lyon',
    distinction: 1,
    latitude: 45.7647,
    longitude: 4.8323,
    imageUrls: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c4c5d09a?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:15', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:15', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:15', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:15', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Les Apothicaires',
    adresse: '23 Rue de Sèze, 69006 Lyon',
    distinction: 1,
    latitude: 45.7736,
    longitude: 4.8467,
    imageUrls: [
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800',
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    horaires: [
      { jour: 'MERCREDI', creneaux: [{ ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Pierre Orsi',
    adresse: '3 Place Kléber, 69006 Lyon',
    distinction: 1,
    latitude: 45.7741,
    longitude: 4.8460,
    imageUrls: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Substrat',
    adresse: '7 Rue Pleney, 69001 Lyon',
    distinction: 1,
    latitude: 45.7668,
    longitude: 4.8337,
    imageUrls: [
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Passe Temps',
    adresse: '52 Rue Pierre Corneille, 69003 Lyon',
    distinction: 1,
    latitude: 45.7553,
    longitude: 4.8484,
    imageUrls: [
      'https://images.unsplash.com/photo-1551882547-ff40c4c5d09a?w=800',
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800',
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },

  // ─── Beaune & alentours (Côte-d'Or) ─────────────────────────
  {
    nom: 'Maison Lameloise',
    adresse: '36 Place d\'Armes, 71150 Chagny',
    distinction: 3,
    latitude: 46.9144,
    longitude: 4.7442,
    imageUrls: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    horaires: [
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Loiseau des Vignes',
    adresse: '31 Rue Maufoux, 21200 Beaune',
    distinction: 1,
    latitude: 47.0241,
    longitude: 4.8383,
    imageUrls: [
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Bénaton',
    adresse: '25 Faubourg Bretonnière, 21200 Beaune',
    distinction: 1,
    latitude: 47.0258,
    longitude: 4.8456,
    imageUrls: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c4c5d09a?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Jardin des Remparts',
    adresse: '10 Rue de l\'Hôtel-Dieu, 21200 Beaune',
    distinction: 1,
    latitude: 47.0271,
    longitude: 4.8368,
    imageUrls: [
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    horaires: [
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Hostellerie de Levernois',
    adresse: 'Route de Combertault, 21200 Levernois',
    distinction: 1,
    latitude: 47.0035,
    longitude: 4.8698,
    imageUrls: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Charlemagne',
    adresse: 'Route des Vergelesses, 21420 Pernand-Vergelesses',
    distinction: 1,
    latitude: 47.0785,
    longitude: 4.8426,
    imageUrls: [
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    ],
    horaires: [
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }] },
    ] satisfies Horaire[],
  },

  // ─── Dijon ───────────────────────────────────────────────────
  {
    nom: 'William Frachot',
    adresse: '18 Rue Ste-Anne, 21000 Dijon',
    distinction: 2,
    latitude: 47.3211,
    longitude: 5.0407,
    imageUrls: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Stéphane Derbord',
    adresse: '10 Place Wilson, 21000 Dijon',
    distinction: 1,
    latitude: 47.3213,
    longitude: 5.0460,
    imageUrls: [
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Pré aux Clercs',
    adresse: '13 Place de la Libération, 21000 Dijon',
    distinction: 1,
    latitude: 47.3219,
    longitude: 5.0370,
    imageUrls: [
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },

  // ─── Marseille ───────────────────────────────────────────────
  {
    nom: 'Le Petit Nice',
    adresse: 'Anse de Maldormé, Corniche Kennedy, 13007 Marseille',
    distinction: 3,
    latitude: 43.2726,
    longitude: 5.3490,
    imageUrls: [
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'AM par Alexandre Mazzia',
    adresse: '9 Rue François Rocca, 13008 Marseille',
    distinction: 3,
    latitude: 43.2893,
    longitude: 5.3808,
    imageUrls: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '19:30', fermeture: '21:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Une Table au Sud',
    adresse: '2 Quai du Port, 13002 Marseille',
    distinction: 2,
    latitude: 43.2950,
    longitude: 5.3726,
    imageUrls: [
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Alcyone',
    adresse: '1 Place Daviel, 13002 Marseille',
    distinction: 1,
    latitude: 43.2972,
    longitude: 5.3702,
    imageUrls: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'La Virgule',
    adresse: '62 Rue Grignan, 13001 Marseille',
    distinction: 1,
    latitude: 43.2928,
    longitude: 5.3751,
    imageUrls: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }] },
    ] satisfies Horaire[],
  },

  // ─── Bordeaux ────────────────────────────────────────────────
  {
    nom: 'Le Pressoir d\'Argent',
    adresse: '2 Place de la Comédie, 33000 Bordeaux',
    distinction: 2,
    latitude: 44.8420,
    longitude: -0.5764,
    imageUrls: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'La Grande Maison de Bernard Magrez',
    adresse: '10 Rue Labottière, 33000 Bordeaux',
    distinction: 2,
    latitude: 44.8393,
    longitude: -0.5838,
    imageUrls: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Garopapilles',
    adresse: '62 Rue Édouard Lartet, 33000 Bordeaux',
    distinction: 1,
    latitude: 44.8441,
    longitude: -0.5862,
    imageUrls: [
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Quatrième Mur',
    adresse: '2 Place de la Comédie, 33000 Bordeaux',
    distinction: 1,
    latitude: 44.8418,
    longitude: -0.5760,
    imageUrls: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '19:00', fermeture: '22:30' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '19:00', fermeture: '22:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '19:00', fermeture: '22:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '19:00', fermeture: '22:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '19:00', fermeture: '22:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '19:00', fermeture: '22:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Belle Campagne',
    adresse: '15 Rue des Faussets, 33000 Bordeaux',
    distinction: 1,
    latitude: 44.8359,
    longitude: -0.5734,
    imageUrls: [
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },

  // ─── Avignon ─────────────────────────────────────────────────
  {
    nom: 'La Mirande',
    adresse: '4 Place de l\'Amirande, 84000 Avignon',
    distinction: 1,
    latitude: 43.9499,
    longitude: 4.8065,
    imageUrls: [
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Christian Étienne',
    adresse: '10 Rue de Mons, 84000 Avignon',
    distinction: 1,
    latitude: 43.9510,
    longitude: 4.8070,
    imageUrls: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Saule Pleureur',
    adresse: 'Quartier Beauchamp, 84140 Montfavet',
    distinction: 1,
    latitude: 43.9286,
    longitude: 4.8775,
    imageUrls: [
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },

  // ─── Aix-en-Provence ─────────────────────────────────────────
  {
    nom: 'Pierre Reboul',
    adresse: '11 Petite Rue Saint-Jean, 13100 Aix-en-Provence',
    distinction: 1,
    latitude: 43.5265,
    longitude: 5.4484,
    imageUrls: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Mickaël Féval',
    adresse: '6 Rue de la Fonderie, 13100 Aix-en-Provence',
    distinction: 1,
    latitude: 43.5290,
    longitude: 5.4466,
    imageUrls: [
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=800',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Saint-Estève',
    adresse: '2120 Route du Tholonet, 13100 Aix-en-Provence',
    distinction: 1,
    latitude: 43.5220,
    longitude: 5.5011,
    imageUrls: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
    ],
    horaires: [
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }] },
    ] satisfies Horaire[],
  },

  // ─── Paris ───────────────────────────────────────────────────
  {
    nom: 'Épicure',
    adresse: '112 Rue du Faubourg Saint-Honoré, 75008 Paris',
    distinction: 3,
    latitude: 48.8741,
    longitude: 2.3134,
    imageUrls: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Guy Savoy',
    adresse: '11 Quai de Conti, 75006 Paris',
    distinction: 3,
    latitude: 48.8579,
    longitude: 2.3408,
    imageUrls: [
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'L\'Arpège',
    adresse: '84 Rue de Varenne, 75007 Paris',
    distinction: 3,
    latitude: 48.8556,
    longitude: 2.3168,
    imageUrls: [
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800',
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '20:00', fermeture: '22:30' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '20:00', fermeture: '22:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '20:00', fermeture: '22:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '20:00', fermeture: '22:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '20:00', fermeture: '22:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Grand Véfour',
    adresse: '17 Rue de Beaujolais, 75001 Paris',
    distinction: 2,
    latitude: 48.8644,
    longitude: 2.3370,
    imageUrls: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:30', fermeture: '14:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Cinq',
    adresse: '31 Avenue George V, 75008 Paris',
    distinction: 3,
    latitude: 48.8696,
    longitude: 2.3012,
    imageUrls: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:30', fermeture: '14:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:30', fermeture: '14:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:30', fermeture: '14:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },

  // ─── Nice ────────────────────────────────────────────────────
  {
    nom: 'Chantecler',
    adresse: '37 Promenade des Anglais, 06000 Nice',
    distinction: 2,
    latitude: 43.6947,
    longitude: 7.2607,
    imageUrls: [
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:30', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Jan',
    adresse: '12 Rue Lascaris, 06000 Nice',
    distinction: 1,
    latitude: 43.6978,
    longitude: 7.2769,
    imageUrls: [
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '22:00' }] },
    ] satisfies Horaire[],
  },

  // ─── Strasbourg ──────────────────────────────────────────────
  {
    nom: 'Au Crocodile',
    adresse: '10 Rue de l\'Outre, 67000 Strasbourg',
    distinction: 1,
    latitude: 48.5806,
    longitude: 7.7468,
    imageUrls: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Buerehiesel',
    adresse: '4 Parc de l\'Orangerie, 67000 Strasbourg',
    distinction: 1,
    latitude: 48.5892,
    longitude: 7.7715,
    imageUrls: [
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=800',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
    ],
    horaires: [
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }] },
    ] satisfies Horaire[],
  },

  // ─── Reims ───────────────────────────────────────────────────
  {
    nom: 'L\'Assiette Champenoise',
    adresse: '40 Avenue Paul Vaillant-Couturier, 51430 Tinqueux',
    distinction: 3,
    latitude: 49.2472,
    longitude: 3.9924,
    imageUrls: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    ],
    horaires: [
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Les Crayères',
    adresse: '64 Boulevard Henry Vasnier, 51100 Reims',
    distinction: 2,
    latitude: 49.2442,
    longitude: 4.0501,
    imageUrls: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    horaires: [
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }] },
    ] satisfies Horaire[],
  },

  // ─── Mâcon & alentours ───────────────────────────────────────
  {
    nom: 'Georges Blanc',
    adresse: 'Place du Marché, 01540 Vonnas',
    distinction: 3,
    latitude: 46.2533,
    longitude: 4.9875,
    imageUrls: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    ],
    horaires: [
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:30', fermeture: '22:00' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'L\'Ambroisie',
    adresse: '19 Quai Jean Jaurès, 71000 Mâcon',
    distinction: 1,
    latitude: 46.3071,
    longitude: 4.8296,
    imageUrls: [
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800',
      'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800',
    ],
    horaires: [
      { jour: 'LUNDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Le Poisson d\'Or',
    adresse: '2 Allée du Parc, 71850 Charnay-lès-Mâcon',
    distinction: 1,
    latitude: 46.2871,
    longitude: 4.8153,
    imageUrls: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c4c5d09a?w=800',
    ],
    horaires: [
      { jour: 'MARDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:30' }] },
    ] satisfies Horaire[],
  },
  {
    nom: 'Auberge de Clochemerle',
    adresse: 'Rue Gabriel Chevallier, 01140 Vaux-en-Beaujolais',
    distinction: 1,
    latitude: 46.1843,
    longitude: 4.7631,
    imageUrls: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    horaires: [
      { jour: 'JEUDI',    creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
      { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
      { jour: 'SAMEDI',   creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
      { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }] },
    ] satisfies Horaire[],
  },
];

async function main() {
  console.log('Seeding restaurants...');

  await prisma.restaurantHoraire.deleteMany();
  await prisma.restaurant.deleteMany();

  for (const data of restaurants) {
    const restaurant = await prisma.restaurant.create({
      data: {
        nom: data.nom,
        adresse: data.adresse,
        distinction: data.distinction,
        latitude: data.latitude,
        longitude: data.longitude,
        imageUrls: JSON.stringify(data.imageUrls),
        horaires: {
          create: data.horaires.map((h) => ({
            jour: h.jour,
            creneaux: JSON.stringify(h.creneaux),
          })),
        },
      },
    });
    console.log(`  ✓ ${data.distinction}⭐ ${restaurant.nom}`);
  }

  console.log(`\nDone — ${restaurants.length} restaurants créés.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
