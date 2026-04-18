# Gestion du Logo et Favicon

Ce dossier contient les fichiers pour gérer le logo et favicon depuis Supabase.

## Fichiers

- `logo_manager.js` : Script JavaScript pour charger le logo et favicon depuis Supabase

## Configuration Supabase

- **Bucket** : `Logo_Matdeff`
- **URL Supabase** : `https://kskjilmsxhnuhqjzjuot.supabase.co`
- **Fichier logo** : `Logo_Matdeff.JPG`

## Fonctionnalités

### Logo dans la navbar
- Le logo s'affiche automatiquement dans la navbar
- Taille responsive (60px normal, 50px quand scrolled)
- Animation au hover (scale 1.05)
- Fallback vers le texte "LA CELLULE" si l'image ne charge pas

### Favicon
- Défini automatiquement dans le `<head>`
- Utilise le même fichier que le logo
- Type MIME : `image/jpg`

## Utilisation

Le script `logo_manager.js` s'initialise automatiquement au chargement de la page et :
1. Définit le favicon
2. Ajoute le logo dans la navbar

## Styles CSS

Les styles sont définis dans `landing-style.css` :
- `.logo-link` : Container du lien logo
- `.navbar-logo` : Styles de l'image logo
- Adaptation automatique en mode scrolled

## Dépannage

Si le logo ne s'affiche pas :
1. Vérifier que le bucket `Logo_Matdeff` existe dans Supabase
2. Vérifier que `Logo_Matdeff.JPG` est présent et public
3. Ouvrir la console du navigateur (F12) pour voir les erreurs réseau