# Guide Michelin Backend API

Backend API pour le site du Guide Michelin, développé avec NestJS, Prisma et SQLite.

## 📋 Fonctionnalités

- ✅ Authentification JWT avec cookies httpOnly
- ✅ Gestion des utilisateurs (inscription, connexion, profil)
- ✅ Base de données SQLite avec Prisma ORM
- ✅ Architecture clean (Repository/Service/Controller)
- ✅ Validation des données
- ✅ CORS configuré

## 🛠️ Technologies utilisées

- **Framework** : NestJS
- **ORM** : Prisma
- **Base de données** : SQLite
- **Authentification** : JWT + Passport
- **Validation** : class-validator
- **Chiffrement** : bcryptjs

## 🏗️ Architecture

```
src/
├── auth/                 # Module d'authentification
│   ├── controllers/      # Contrôleurs HTTP
│   ├── services/        # Logique métier
│   ├── strategies/      # Stratégies Passport (JWT, Local)
│   └── guards/          # Guards d'authentification
├── user/                # Module utilisateur
│   ├── repositories/    # Couche d'accès aux données
│   ├── services/        # Logique métier
│   └── dto/             # Data Transfer Objects
├── prisma/              # Configuration Prisma
└── main.ts              # Point d'entrée de l'application
```

## 🚀 Installation et lancement

### Prérequis
- Node.js (v16+)
- npm

### Installation

```bash
# Installation des dépendances
npm install

# Configuration de la base de données
npx prisma migrate deploy
npx prisma generate
```

### Variables d'environnement

Le fichier `.env` contient :
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="guide-michelin-super-secret-key-2024"
PORT=3001
```

### Lancement

```bash
# Mode développement avec rechargement automatique
npm run start:dev

# Mode production
npm run start:prod

# Build
npm run build
```

L'API sera accessible sur `http://localhost:3001`

## 📍 API Endpoints

### Authentification (`/auth`)

#### POST `/auth/register`
Inscription d'un nouvel utilisateur.

**Body:**
```json
{
  "prenom": "John",
  "nom": "Doe",
  "email": "john.doe@example.com",
  "password": "motdepasse123",
  "phoneNumber": "0123456789",
  "aboutMe": "Description personnelle"
}
```

**Réponse:**
```json
{
  "user": {
    "id": "cmo8dr29z0000mwf7pntrwaj1",
    "prenom": "John",
    "nom": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "0123456789",
    "aboutMe": "Description personnelle",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/auth/login`
Connexion d'un utilisateur.

**Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "motdepasse123"
}
```

**Réponse:**
- Retourne les informations utilisateur
- Définit un cookie httpOnly `access_token` contenant le JWT

#### POST `/auth/logout`
Déconnexion de l'utilisateur.

**Réponse:**
```json
{
  "message": "Déconnexion réussie"
}
```

#### GET `/auth/profile` 🔒
Récupération du profil de l'utilisateur connecté (route protégée).

**Réponse:**
```json
{
  "id": "cmo8dr29z0000mwf7pntrwaj1",
  "prenom": "John",
  "nom": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "0123456789",
  "aboutMe": "Description personnelle",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🗄️ Modèle de données

### User (Utilisateur)
```prisma
model User {
  id          String   @id @default(cuid())
  prenom      String
  nom         String
  email       String   @unique
  password    String   // Mot de passe hashé avec bcrypt
  phoneNumber String?  // Optionnel
  aboutMe     String?  // Optionnel
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("users")
}
```

## 🔐 Sécurité

- **Mots de passe** : Hashage avec bcryptjs (salt rounds: 10)
- **JWT** : Tokens stockés dans des cookies httpOnly sécurisés
- **CORS** : Configuré pour accepter les credentials
- **Validation** : Validation stricte des données d'entrée
- **Variables sensibles** : JWT secret en variable d'environnement

## 🧪 Tests

Pour tester l'API avec curl :

```bash
# Inscription
curl -X POST http://localhost:3001/auth/register \
-H "Content-Type: application/json" \
-d '{"prenom":"John","nom":"Doe","email":"test@example.com","password":"motdepasse123"}'

# Connexion (avec sauvegarde des cookies)
curl -c cookies.txt -X POST http://localhost:3001/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"motdepasse123"}'

# Profil (avec cookies)
curl -b cookies.txt http://localhost:3001/auth/profile

# Déconnexion
curl -b cookies.txt -X POST http://localhost:3001/auth/logout
```

## 📦 Scripts disponibles

```bash
# Développement
npm run start:dev

# Build
npm run build

# Lancement production
npm run start:prod

# Base de données
npx prisma migrate dev    # Créer une migration
npx prisma migrate deploy  # Appliquer les migrations
npx prisma generate       # Générer le client Prisma
npx prisma studio         # Interface graphique pour la BDD
```

## 🤝 Intégration Frontend

Cette API est conçue pour être utilisée avec un frontend. Les cookies httpOnly permettent une authentification sécurisée sans gestion manuelle des tokens côté client.

**Configuration CORS pour le frontend :**
```typescript
app.enableCors({
  origin: 'http://localhost:3000', // URL de votre frontend
  credentials: true,
});
```