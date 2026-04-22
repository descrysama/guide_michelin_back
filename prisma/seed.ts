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
