// Gestion du logo et favicon depuis les fichiers statiques locaux.
const LOGO_CANDIDATE_PATHS = [
  'images/content/logo.png',
  'images/content/logo.jpg',
  'images/content/logo.jpeg',
  'images/content/logo.webp',
  'images/content/logo.svg',
  'images/logo_favicon/logo.png',
  'images/logo_favicon/logo.jpg',
  'images/logo_favicon/logo.jpeg',
  'images/logo_favicon/logo.webp',
  'images/logo_favicon/logo.svg',
  'images/logo_favicon/favicon.png',
  'images/logo_favicon/favicon.jpg',
  'images/logo_favicon/favicon.jpeg',
  'images/logo_favicon/favicon.webp',
  'images/logo_favicon/favicon.svg',
  'images/logo_favicon/Logo_Matdeff.JPG'
];

function fileExists(path) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = `${path}?v=${Date.now()}`;
  });
}

async function getLogoUrl() {
  for (const path of LOGO_CANDIDATE_PATHS) {
    // eslint-disable-next-line no-await-in-loop
    const exists = await fileExists(path);
    if (exists) {
      return path;
    }
  }
  return '';
}

// Fonction pour définir le favicon
async function setFavicon(logoUrl) {
  const faviconUrl = logoUrl;
  if (!faviconUrl) return;

  // Supprimer les favicons existants
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
  existingFavicons.forEach(favicon => favicon.remove());

  // Créer et ajouter le nouveau favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = faviconUrl;
  document.head.appendChild(link);
}

// Fonction pour ajouter le logo dans la navbar
function addLogoToNavbar(logoUrl) {
  const navbar = document.querySelector('.navbar-container');

  if (!navbar || !logoUrl) return;
  if (navbar.querySelector('.logo-link')) return;

  // Créer l'élément logo
  const logoLink = document.createElement('a');
  logoLink.href = document.getElementById('home') ? '#home' : '/';
  logoLink.className = 'logo-link';

  const logoImg = document.createElement('img');
  logoImg.src = logoUrl;
  logoImg.alt = 'LA CELLULE Logo';
  logoImg.className = 'navbar-logo';
  logoImg.loading = 'eager';

  logoLink.appendChild(logoImg);

  // Insérer le logo au début de la navbar
  navbar.insertBefore(logoLink, navbar.firstChild);

}

// Initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', async () => {
  const logoUrl = await getLogoUrl();
  if (!logoUrl) return;
  await setFavicon(logoUrl);
  addLogoToNavbar(logoUrl);
});

// Export pour utilisation dans d'autres fichiers
window.LogoManager = {
  getLogoUrl,
  setFavicon,
  addLogoToNavbar
};