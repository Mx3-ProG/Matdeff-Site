# Matdeff Site

Ce dépôt contient le site web de `Matdeff Site`, conçu pour présenter une landing page, un tableau de bord et un formulaire d'inscription. L'application est servie via **Express.js** et peut être déployée en ligne ou exécutée localement.

## Structure du projet

```
Matdeff Site/
├── landing-page.html              # Page d'accueil / landing page principale
├── landing-style.css              # Styles CSS associés à la page de présentation
├── landing-style-accessible.css   # Styles CSS accessibles alternative
├── dashboard.html                 # Page de tableau de bord (dashboard)
├── signup.html                    # Page ou formulaire d'inscription
├── app.js                         # Code client-side avancé (animations, interactions)
├── server.js                      # Serveur Express.js pour servir l'application
├── package.json                   # Configuration npm et dépendances
├── .gitignore                     # Fichiers et dossiers à ignorer par Git
├── images/                        # Dossier contenant les images du site
└── README.md                      # Ce fichier
```

## Prérequis

- **Node.js** >= 14.0.0 (télécharger depuis https://nodejs.org/)
- **npm** (inclus avec Node.js)
- **Git** (pour versionner le projet)
- **VS Code** (optionnel, pour développement local)

## Installation

### 1. Installer Node.js et npm

Téléchargez et installez Node.js depuis https://nodejs.org/

```bash
# Vérifier l'installation
node --version   # v14.0.0 ou plus récent
npm --version    # 6.0.0 ou plus récent
```

### 2. Installer les dépendances du projet

```bash
cd "Site internet/Matdeff Site"
npm install
```

Cela installera :
- **Express.js** : serveur web Node.js
- **CORS** : gestion des requêtes cross-origin

## Exécution locale

### Option 1 : Avec VS Code (recommandé pour développement)

1. Ouvrir le dossier du projet dans VS Code
2. Appuyer sur **F5** ou aller à Run > Start Debugging
3. VS Code lancera automatiquement :
   - Le serveur Node.js sur `http://localhost:8080`
   - Chrome en mode débogage

### Option 2 : En ligne de commande

```bash
cd "Site internet/Matdeff Site"
npm start
```

Puis ouvrir votre navigateur sur `http://localhost:8080`

## Routeurs disponibles

Une fois le serveur lancé, vous pouvez accéder à :

- **Landing Page (Accueil)** : http://localhost:8080/ ou /landing-page.html
- **Dashboard** : http://localhost:8080/dashboard
- **Inscription** : http://localhost:8080/signup

## Développement

### Développer en local

```bash
npm start
```

Le serveur se relance automatiquement. Modifiez les fichiers HTML/CSS et rafraîchissez le navigateur (Ctrl+R ou Cmd+R).

### Debugging avec VS Code

1. Appuyer sur **F5**
2. Placer des points d'arrêt (breakpoints) dans le code
3. Utiliser la console pour inspecter les variables

## Déploiement

### Déploiement sur un serveur (GitHub Pages, Netlify, Vercel, etc.)

#### Option 1 : En tant que site statique

1. Pousser votre code sur GitHub
2. Activer GitHub Pages dans les paramètres du dépôt
3. Sélectionner la branche `main` ou `master`
4. Le site sera accessible à `https://<username>.github.io/<repo-name>`

#### Option 2 : Serveur Node.js (Heroku, DigitalOcean, AWS, etc.)

**Déploiement sur Heroku**

```bash
# Installer Heroku CLI
brew install heroku  # macOS

# Se connecter
heroku login

# Créer l'application
heroku create matdeff-site

# Déployer
git push heroku main

# Voir les logs
heroku logs --tail
```

## Scripts npm

```bash
npm start      # Lancer le serveur en mode production
npm run dev    # Lancer le serveur en mode développement
npm test       # Exécuter les tests (non configuré pour l'instant)
```

## Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **Backend** : Node.js, Express.js
- **Gestion des requêtes** : CORS

## Fonctionnalités du client-side

Le fichier `app.js` contient :
- Animations au scroll
- Navbar dynamique avec scroll
- Intersection Observer pour les animations
- Smooth scrolling
- Menu mobile réactif
- États de chargement
- Navigation au clavier
- Optimisations de performance (lazy loading)

## Notes et points d'attention

- **Port par défaut** : 8080 (modifiable via variable d'environnement `PORT`)
- **CORS activé** : pour accepter les requêtes cross-origin
- **Fichiers statiques** : servis depuis le répertoire racine du projet
- **Erreur 404** : redirige vers la landing page

## Troubleshooting

### Le port 8080 est déjà utilisé

```bash
# Trouver le processus qui utilise le port
lsof -i :8080

# Terminer le processus
kill -9 <PID>

# Ou utiliser un autre port
PORT=3000 npm start
```

### npm install échoue

```bash
# Nettoyer le cache npm
npm cache clean --force

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Le navigateur n'ouvre pas automatiquement en VS Code

Vérifier que Chrome est installé et que le chemin est correct dans `launch.json`.

## Contribution

Pour contribuer :

1. Créer une nouvelle branche : `git checkout -b feature/ma-fonctionnalité`
2. Committer les modifications : `git commit -m "Ajouter ma fonctionnalité"`
3. Pousser vers la branche : `git push origin feature/ma-fonctionnalité`
4. Créer une Pull Request

## Auteur

- **Développé par** : Mx3-ProG
- **Dépôt original** : https://github.com/Mx3-ProG/Matdeff-Site

## Licence

MIT - Voir le fichier LICENSE pour plus d'informations

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur le dépôt GitHub.
