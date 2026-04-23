import { PrismaClient } from '@prisma/client';
import { experiences } from './data/experiences';

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
  // --- Lyon � 3 �toiles ----------------------------------------
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

  // --- Lyon � 2 �toiles ----------------------------------------
  {
    nom: 'M�re Brazier',
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
    adresse: '33 Rue du B�uf, 69005 Lyon',
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
    nom: 'Le Neuvi�me Art',
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

  // --- Lyon � 1 �toile -----------------------------------------
  {
    nom: 'T�tedoie',
    adresse: '14 Mont�e du Chemin Neuf, 69005 Lyon',
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
    adresse: '23 Rue de S�ze, 69006 Lyon',
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
    adresse: '3 Place Kl�ber, 69006 Lyon',
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

  // --- Beaune & alentours (C�te-d'Or) -------------------------
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
    nom: 'Le B�naton',
    adresse: '25 Faubourg Bretonni�re, 21200 Beaune',
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
    adresse: '10 Rue de l\'H�tel-Dieu, 21200 Beaune',
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

  // --- M�con & alentours ---------------------------------------
  {
    nom: 'Georges Blanc',
    adresse: 'Place du March�, 01540 Vonnas',
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
    adresse: '19 Quai Jean Jaur�s, 71000 M�con',
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
    adresse: '2 All�e du Parc, 71850 Charnay-l�s-M�con',
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

async function ensureExperienceSchema() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "experiences" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "title" TEXT NOT NULL,
      "imageUrl" TEXT NOT NULL,
      "locationName" TEXT NOT NULL,
      "address" TEXT NOT NULL,
      "city" TEXT NOT NULL,
      "country" TEXT NOT NULL,
      "latitude" REAL NOT NULL,
      "longitude" REAL NOT NULL,
      "priceEur" INTEGER NOT NULL,
      "description" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "duration" TEXT NOT NULL,
      "bookingUrl" TEXT NOT NULL,
      "sourceUrl" TEXT,
      "isFeatured" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )
  `);
  await prisma.$executeRawUnsafe(
    'CREATE INDEX IF NOT EXISTS "experiences_city_idx" ON "experiences"("city")',
  );
  await prisma.$executeRawUnsafe(
    'CREATE INDEX IF NOT EXISTS "experiences_category_idx" ON "experiences"("category")',
  );
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "user_experience_favorites" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "experienceId" TEXT NOT NULL,
      "experienceTitle" TEXT NOT NULL,
      "experienceImage" TEXT NOT NULL,
      "experienceCity" TEXT NOT NULL,
      "experiencePrice" INTEGER NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL,
      CONSTRAINT "user_experience_favorites_userId_fkey"
        FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT "user_experience_favorites_experienceId_fkey"
        FOREIGN KEY ("experienceId") REFERENCES "experiences" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);
  await prisma.$executeRawUnsafe(
    'CREATE UNIQUE INDEX IF NOT EXISTS "user_experience_favorites_userId_experienceId_key" ON "user_experience_favorites"("userId", "experienceId")',
  );
}

async function main() {
  console.log('Seeding restaurants...');
  await ensureExperienceSchema();

  await prisma.$executeRawUnsafe('DELETE FROM "user_experience_favorites"');
  await prisma.$executeRawUnsafe('DELETE FROM "experiences"');
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
    console.log(`  ? ${data.distinction}? ${restaurant.nom}`);
  }

  for (const data of experiences) {
    const now = new Date().toISOString();
    const id = `exp_${Math.random().toString(36).slice(2, 10)}`;
    await prisma.$executeRawUnsafe(
      `INSERT INTO "experiences" ("id","title","imageUrl","locationName","address","city","country","latitude","longitude","priceEur","description","category","duration","bookingUrl","sourceUrl","isFeatured","createdAt","updatedAt")
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      id,
      data.title,
      data.imageUrl,
      data.locationName,
      data.address,
      data.city,
      data.country,
      data.latitude,
      data.longitude,
      data.priceEur,
      data.description,
      data.category,
      data.duration,
      data.bookingUrl,
      data.sourceUrl ?? null,
      data.isFeatured ? 1 : 0,
      now,
      now,
    );
    console.log(`  ? exp�rience ${data.title}`);
  }

  console.log(`\nDone � ${restaurants.length} restaurants et ${experiences.length} exp�riences cr��s.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
