# 📦 Guide de Déploiement - Matdeff Site

## Options de déploiement

Votre site peut être déployé de plusieurs façons selon vos besoins.

---

## Option 1 : GitHub Pages (Site statique gratuit)

**Avantages** :
- ✅ Gratuit
- ✅ Facile à mettre en place
- ✅ Domaine personnalisé possible
- ❌ Pas de backend Node.js

**Étapes** :

1. Créer un dépôt GitHub : `Matdeff-Site`
2. Pousser votre code (SANS `node_modules/`)
3. Aller aux paramètres du dépôt → Pages
4. Sélectionner la branche `main` et le dossier `/(root)`
5. Votre site sera à `https://<username>.github.io/Matdeff-Site`

**Limitation** : Pas de serveur Node.js, juste les fichiers statiques.

---

## Option 2 : Heroku (Serveur Node.js gratuit → payant)

**Avantages** :
- ✅ Supporte Node.js
- ✅ Simple à déployer
- ✅ Gratuit pendant 12 mois (avec card bancaire)
- ⚠️ Payant après (7$/mois minimum)

### Installation et déploiement :

```bash
# 1. Installer Heroku CLI
brew install heroku

# 2. Se connecter à Heroku
heroku login

# 3. Créer l'application Heroku
heroku create matdeff-site

# 4. Vérifier la configuration
git remote -v  # Vous devriez voir une URL Heroku

# 5. Pousser votre code
git push heroku main

# 6. Voir les logs
heroku logs --tail
```

**URL** : `https://matdeff-site.herokuapp.com/`

**Configuration optionnelle** :
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=8080
```

---

## Option 3 : Vercel (Next.js optimisé, très rapide)

**Avantages** :
- ✅ Performance optimale
- ✅ Déploiement automatique depuis GitHub
- ✅ Gratuit pour sites statiques
- ✅ CDN global

### Installation et déploiement :

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# Ou lier votre repo GitHub pour un déploiement automatique
```

**URL** : Vous la recevrez après le déploiement

---

## Option 4 : Netlify (Hébergement statique avancé)

**Avantages** :
- ✅ Gratuit
- ✅ Déploiement auto depuis Git
- ✅ Forms et redirects simples
- ✅ Excellent pour statique

### Installation et déploiement :

```bash
# 1. Installer Netlify CLI
npm install -g netlify-cli

# 2. Se connecter
netlify login

# 3. Déployer
netlify deploy

# Ou via l'interface web
```

**URL** : `https://<votre-site>.netlify.app/`

---

## Option 5 : Serveur personnel (AWS, DigitalOcean, Linode)

**Avantages** :
- ✅ Contrôle total
- ✅ Performance personnalisable
- ❌ Nécessite connaissances d'administration serveur
- ❌ Payant

### Exemple avec DigitalOcean Droplet :

```bash
# 1. Créer un droplet with Node.js 18.x
# 2. SSH sur le serveur
ssh root@<YOUR_IP>

# 3. Installer les dépendances
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Cloner votre repo
git clone https://github.com/<username>/Matdeff-Site.git
cd Matdeff-Site

# 5. Installer npm packages
npm install

# 6. Utiliser PM2 pour manage le serveur
npm install -g pm2
pm2 start server.js --name "matdeff-site"
pm2 startup
pm2 save

# 7. Configurer Nginx comme reverse proxy

# 8. Configurer SSL avec Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d votre-domaine.com
```

---

## Configuration pour production

### 1. Créer un fichier `.env.production` (optionnel)

```bash
NODE_ENV=production
PORT=8080
```

### 2. Créer un fichier `Procfile` pour Heroku

```
web: node server.js
```

### 3. Mettre à jour `package.json` pour production

```json
{
  "engines": {
    "node": "18.x",
    "npm": "8.x"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  }
}
```

---

## Checklist avant déploiement

- [ ] Vérifier que votre code fonctionne localement (`npm start`)
- [ ] Configurer `.gitignore` (node_modules, .env)
- [ ] Supprimer les logs de débogage
- [ ] Tester avec `NODE_ENV=production npm start`
- [ ] Vérifier les ports (Heroku utilise la variable `PORT`)
- [ ] Vérifier les URLs des ressources (href, src)
- [ ] Tester HTTPS/SSL si applicable

---

## Variables d'environnement

Si vous devez des variables sensibles (API keys, etc.) :

```bash
# Heroku
heroku config:set KEY=value

# Vercel
vercel env add NEXT_PUBLIC_API_KEY

# Netlify
(Configuré via l'interface web → Site settings → Environment)
```

---

## Recommandation finale

Pour un premier déploiement simple et gratuit : **Netlify** ou **Vercel**

Pour un serveur complet avec backend : **Heroku** ou **DigitalOcean**

---

**Questions ?** Consultez les docs officielles :
- Heroku: https://devcenter.heroku.com/
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com/
- DigitalOcean: https://www.digitalocean.com/docs/
