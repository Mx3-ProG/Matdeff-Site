---
name: Dépannage et démarrage rapide
about: Guide rapide pour lancer Matdeff Site
title: "🚀 Démarrage rapide"
labels: documentation
assignees: ''

---

# 🚀 Guide de démarrage rapide - Matdeff Site

## Avant tout

Votre projet a été reconfigurable du zéro. Consultez les fichiers de guide (en priorité) :

1. **RÉSUMÉ_MODIFICATIONS.md** ← Lisez d'abord ! ⭐
2. **INSTALLATION_NODEJS.md** ← Si Node.js n'est pas installé
3. **README.md** ← Documentation complète
4. **DEPLOYMENT.md** ← Pour mettre en ligne

## ⚡ Démarrage en 3 étapes

### 1️⃣ Installer Node.js (si pas encore fait)

```bash
# Option A : Télécharger depuis https://nodejs.org/ (LTS)
# Option B : Homebrew
brew install node
```

Vérifier :
```bash
node --version  # v14.0.0+
npm --version   # 6.0.0+
```

### 2️⃣ Installer les dépendances

```bash
cd "Site internet/Matdeff Site"
npm install
```

### 3️⃣ Lancer l'application

**Option A - Avec VS Code (meilleur pour développement)**
- Appuyer sur **F5** 
- VS Code lance le serveur + ouvre Chrome automatiquement

**Option B - Mode commande**
```bash
npm start
```
Puis ouvrir http://localhost:8080

## ✅ Vérifications

Le serveur devrait afficher :
```
╔════════════════════════════════════════╗
║     Matdeff Site - Serveur Lancé       ║
╠════════════════════════════════════════╣
║ 🌐 Local:     http://localhost:8080    ║
║ 📱 Signets:   landing-page (/)         ║
║               dashboard (/dashboard)   ║
║               signup (/signup)         ║
║ ℹ️  Appuyez sur Ctrl+C pour arrêter    ║
╚════════════════════════════════════════╝
```

## 🌐 Accès au site

Ouvrir dans le navigateur :
- 🏠 **Accueil** : http://localhost:8080/
- 📊 **Dashboard** : http://localhost:8080/dashboard  
- 📝 **Inscription** : http://localhost:8080/signup

## 🐛 Problèmes courants

| Problème | Solution |
|----------|----------|
| "npm not found" | Installer Node.js depuis https://nodejs.org/ |
| "Port 8080 in use" | `lsof -i :8080` puis `kill -9 <PID>` |
| Chrome ne s'ouvre pas | Vérifier que Chrome est installé |
| "Cannot GET /" | Vérifier que server.js existe dans le dossier |

## 📦 Mise à jour du repo GitHub

```bash
# Ajouter les nouveaux fichiers
git add .

# Committer les changements
git commit -m "🔧 Ajout server Node.js, configuration pour déploiement"

# Pousser vers GitHub
git push origin main

# Ou si votre branche s'appelle master
git push origin master
```

## 🚀 Déploiement en ligne

Voir **DEPLOYMENT.md** pour :
- GitHub Pages (gratuit)
- Heroku (Node.js)
- Vercel (ultra-rapide)
- Netlify (gratuit et facile)

## 💡 Fichiers importants

| Fichier | Rôle |
|---------|------|
| `server.js` | 🖥️ Serveur Express qui sert votre site |
| `package.json` | 📦 Configuration npm et dépendances |
| `.vscode/launch.json` | 🔧 Configuration de débogage VS Code |
| `.vscode/tasks.json` | ⚙️ Tâches automatiques VS Code |
| `README.md` | 📖 Documentation complète |
| `DEPLOYMENT.md` | 🚀 Guide de déploiement |
| `Procfile` | 🌐 Config pour Heroku |

## ❓ Questions ?

1. Commencez par lire **README.md**
2. Consultez **INSTALLATION_NODEJS.md** pour les problèmes d'installation
3. Consultez **DEPLOYMENT.md** pour mettre en ligne
4. Consultez **RESUME_MODIFICATIONS.md** pour voir tous les changements
5. Ouvrez une issue sur GitHub si vous êtes bloqué

## 🎉 Bravo !

Votre site est maintenant configuré pour fonctionner localement ET être déployé en ligne !

**Prêt à développer ? Appuyez sur F5 dans VS Code ! 🚀**
