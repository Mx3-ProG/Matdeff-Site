# 📤 Guide - Mettre à jour votre repo GitHub

Depuis que nous avons ajouté les nouveaux fichiers (server.js, package.json, etc.), vous devez mettre à jour votre dépôt GitHub.

## Étape 1 : Vérifier les changements

```bash
cd "Site internet/Matdeff Site"
git status
```

Vous devriez voir :
```
New file:   DEPLOYMENT.md
New file:   INSTALLATION_NODEJS.md
New file:   RESUME_MODIFICATIONS.md
New file:   DEMARRAGE_RAPIDE.md
New file:   package.json
New file:   server.js
New file:   Procfile
Modified:   README.md
Modified:   .gitignore
```

## Étape 2 : Ajouter tous les fichiers

```bash
git add .
```

## Étape 3 : Créer un commit

```bash
git commit -m "🔧 Ajout serveur Node.js Express et configuration déploiement

- Ajout server.js pour servir l'application sur localhost:8080
- Ajout package.json avec Express.js et CORS
- Ajout tâches VS Code pour lancement automatique
- Ajout guides d'installation, déploiement et démarrage
- Création Procfile pour Heroku
- Mise à jour README avec instructions complètes
- Amélioration .gitignore pour Node.js"
```

## Étape 4 : Pousser vers GitHub

```bash
# Si votre branche principale s'appelle 'main'
git push origin main

# Ou si elle s'appelle 'master'
git push origin master

# Ou simplement
git push
```

## Étape 5 : Vérifier sur GitHub

1. Allez sur https://github.com/votre-username/Matdeff-Site
2. Actualisez la page (F5)
3. Vous devriez voir les nouveaux fichiers

## ✅ Checklist avant de pousser

- [ ] Node.js est installé sur votre machine
- [ ] `npm install` a fonctionné sans erreur
- [ ] `npm start` fonctionne localement
- [ ] `git status` montre les fichiers que vous voulez ajouter
- [ ] `.gitignore` inclut `node_modules/`
- [ ] Pas de fichiers sensibles (pas de `.env` avec des clés)

## 🚀 Déploiement après mise à jour

Une fois que vous avez poussé sur GitHub, vous pouvez :

### Option 1 : Déployer sur Heroku

```bash
# Installer Heroku CLI
brew install heroku

# Se connecter
heroku login

# Créer l'app
heroku create matdeff-site

# Pousser vers Heroku
git push heroku main

# Lancer les logs
heroku logs --tail
```

**URL** : https://matdeff-site.herokuapp.com/

### Option 2 : Déployer sur Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

**Ou** connecter votre repo GitHub via https://vercel.com et déploiement automatique

### Option 3 : Déployer sur Netlify

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy
```

**Ou** connecter votre repo GitHub via https://netlify.com et déploiement automatique

---

## Conseil finaux

✅ **Bonnes pratiques** :
- Committer souvent avec des messages clairs
- Pousser votre code régulièrement
- Utiliser `.gitignore` pour les fichiers sensibles
- Tester localement avant de pousser

❌ **À ne pas faire** :
- Ne pas pousser `node_modules/` (c'est lourd)
- Ne pas committer vos `.env` avec des clés API
- Ne pas oublier de push régulièrement

---

**Voilà ! Votre repo GitHub est maintenant à jour et prêt pour le déploiement ! 🎉**
