# 🚀 Guide d'Installation - Matdeff Site

## Problème identifié

Node.js et npm ne sont pas installés sur votre ordinateur. C'est pourquoi le serveur ne peut pas démarrer.

## ✅ Solution : Installer Node.js + npm

### Pour macOS (votre système actuel)

**Option 1 : Installer directement (Plus simple)**

1. Aller sur https://nodejs.org/
2. Télécharger la version **LTS** (Long Term Support)
3. Exécuter l'installeur `.pkg`
4. Suivre les étapes de l'installation
5. Redémarrer VS Code

**Option 2 : Utiliser Homebrew (recommandé pour développeurs)**

```bash
# Si vous n'avez pas Homebrew, l'installer d'abord :
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer Node.js via Homebrew
brew install node

# Vérifier l'installation
node --version
npm --version
```

**Option 3 : Utiliser NVM (Node Version Manager - recommandé)**

```bash
# Installer NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Fermer et rouvrir votre terminal

# Installer la version LTS
nvm install --lts

# Utiliser la version LTS
nvm use --lts

# Vérifier
node --version
npm --version
```

## Après l'installation de Node.js

Une fois Node.js installé, retournez dans VS Code et exécutez :

```bash
# Se placer dans le dossier du projet
cd "Site internet/Matdeff Site"

# Installer les dépendances
npm install

# Lancer l'application
npm start
```

Ou appuyez sur **F5** pour déboguer directement avec VS Code.

## Vérification

Après installation, vérifiez que tout fonctionne :

```bash
node --version    # Devrait afficher v14.x.x ou plus recent
npm --version     # Devrait afficher 6.x.x ou plus recent
```

## Problème persistent ?

Si vous avez toujours des problèmes :

1. Redémarrer VS Code complètement
2. Redémarrer le terminal 
3. Taper `which node` pour vérifier l'installation
4. Ouvrir une nouvelle issue sur le GitHub du projet

---

**Dès que Node.js est installé, votre site Matdeff sera accessible sur :** 
🌐 http://localhost:8080
