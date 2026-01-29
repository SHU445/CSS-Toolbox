# CSS Toolbox 🎨

Suite complète d'outils CSS pour designers et développeurs web. Créez des layouts, gradients, shadows et animations CSS en quelques clics.

![Next.js](https://img.shields.io/badge/Next.js-16.0.4-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square)

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

## 🛠️ Outils disponibles

### 1. Flexbox & Grid Generator
Créez visuellement vos layouts Flexbox et CSS Grid avec contrôle complet sur toutes les propriétés.

**Fonctionnalités :**
- Basculer entre Flexbox et Grid
- Contrôle de direction, justify-content, align-items
- Ajustement du nombre d'items
- Génération de code CSS instantanée

### 2. Gradient Generator
Générez des dégradés CSS personnalisés (linéaires, radiaux, coniques).

**Fonctionnalités :**
- Support multi-couleurs avec contrôle de position
- Préréglages populaires (Sunset, Ocean, Forest...)
- Générateur aléatoire
- Ajustement de l'angle

### 3. Box Shadow Generator
Créez des ombres CSS complexes avec plusieurs couches.

**Fonctionnalités :**
- Multi-couches d'ombres
- Contrôle X, Y, blur, spread
- Support inset shadow
- Préréglages (Neumorphism, Glow, Layered...)

### 4. Animation Generator
Créez des animations CSS keyframes de manière visuelle.

**Fonctionnalités :**
- Keyframes visuels
- Contrôle translate, scale, rotate, opacity
- Paramètres d'animation (duration, timing, direction)
- Préréglages (Bounce, Pulse, Fade In...)

### 5. Layout Templates
Templates de layouts CSS prêts à l'emploi.

**Templates inclus :**
- Holy Grail Layout
- Dashboard
- Card Grid
- Masonry
- Split Screen
- Sticky Footer
- Centered Content
- Sidebar Fixed

### 6. 3D Transform
Explorez les transformations CSS 3D et la perspective.

**Fonctionnalités :**
- Rotation sur 3 axes (X, Y, Z)
- Translation 3D
- Scale 3D
- Contrôle de perspective
- Préréglages (Flip Card, Isometric, Pop Up...)

### 7. 3D Shapes
Créez des formes 3D complexes en CSS pur.

**Fonctionnalités :**
- 6 formes 3D (Cube, Pyramide, Prisme, Cylindre, Cône, Octaèdre)
- Contrôle des dimensions et profondeur
- Personnalisation des couleurs pour chaque face
- Rotation automatique
- Ajustement de la perspective

### 8. Card Maker
Générez des cartes UI/UX modernes avec différents styles.

**Fonctionnalités :**
- 6 styles (Glassmorphism, Neumorphism, Gradient, Flat, Outlined, Elevated)
- 6 types de cartes (Product, Profile, Stats, Blog, Pricing, Testimonial)
- Personnalisation complète (couleurs, dimensions, bordures)
- Effets hover interactifs
- Export HTML + CSS

## 🎨 Caractéristiques

- ✨ **Interface moderne** avec design sombre et palette bleue/violette/rose
- 🎭 **Animations fluides** avec Framer Motion
- 📋 **Copie de code** en un clic avec feedback visuel
- 👁️ **Prévisualisation en temps réel** pour chaque outil
- 📱 **Design responsive** qui s'adapte à tous les écrans
- 🚫 **Gestion d'erreurs** pour les extensions de navigateur (MetaMask, etc.)

## 🏗️ Technologies utilisées

- **Next.js 16** - Framework React avec App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations
- **Lucide React** - Icônes modernes

## 📂 Structure du projet

```
css-toolbox/
├── src/
│   ├── app/
│   │   ├── animations/      # Animation Generator
│   │   ├── box-shadow/      # Box Shadow Generator
│   │   ├── flexbox-grid/    # Flexbox & Grid Generator
│   │   ├── gradients/       # Gradient Generator
│   │   ├── layouts/         # Layout Templates
│   │   ├── transform-3d/    # 3D Transform
│   │   ├── 3d-shapes/       # 3D Shapes Generator
│   │   ├── card-maker/      # Card Maker (UI/UX Cards)
│   │   ├── error.tsx        # Page d'erreur
│   │   ├── globals.css      # Styles globaux
│   │   ├── layout.tsx       # Layout principal
│   │   └── page.tsx         # Page d'accueil
│   └── components/
│       ├── CodePreview.tsx  # Composant de prévisualisation de code
│       └── Sidebar.tsx      # Navigation latérale
└── next.config.ts           # Configuration Next.js
```

## 🐛 Résolution des problèmes

### Erreur MetaMask / Extensions de navigateur

Si vous rencontrez des erreurs liées à MetaMask ou d'autres extensions :

1. **C'est normal** - L'application gère automatiquement ces erreurs
2. Les erreurs sont interceptées et n'affectent pas le fonctionnement
3. Si nécessaire, désactivez temporairement les extensions Web3

### Port déjà utilisé

Si le port 3000 est déjà utilisé :

```bash
# Utiliser un autre port
PORT=3001 npm run dev
```

## 🚀 Deployment

### Build de production

```bash
npm run build
npm start
```

### Déploiement sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

## 📝 Scripts disponibles

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Crée le build de production
npm start        # Lance le serveur de production
npm run lint     # Vérifie le code avec ESLint
```

## 🎯 Roadmap

- [ ] Export de code React/Vue/Angular
- [ ] Sauvegarde de projets (localStorage)
- [ ] Thème clair
- [ ] Plus de préréglages
- [ ] Import/Export de configurations
- [ ] Mode collaboratif

## 📄 Licence

MIT - Utilisez librement pour vos projets personnels et professionnels.

## 🙏 Inspirations

Ce projet centralise et améliore les fonctionnalités des outils suivants :
- [CSS Grid & Flexbox Generator](https://www.ondevtools.com/)
- [Layout.bradwoods.io](https://layout.bradwoods.io/)
- [CSS Gradient](https://www.css-gradient.com/)
- [CSS Animation Generator](https://uisurgeon.com/tools/css-animation-generator)
- Et plus encore...

---

Créé avec ❤️ pour la communauté des développeurs web
