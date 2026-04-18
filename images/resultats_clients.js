
// Liste des résultats clients optimisés en WebP
const clientImages = [
  { filename: 'Amelie_cellule_fitness_avant_apres2-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Amelie', category: 'fitness' },
  { filename: 'Camille_cellule_fessier_avant_apres_1-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Camille', category: 'fessier' },
  { filename: 'Camille_cellule_fitness_avant_apres3-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Camille', category: 'fitness' },
  { filename: 'Cece_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Cece', category: 'fitness' },
  { filename: 'Celine_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Celine', category: 'fitness' },
  { filename: 'Claire_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Claire', category: 'fitness' },
  { filename: 'Coralie_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Coralie', category: 'fitness' },
  { filename: 'Coraline_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Coraline', category: 'fitness' },
  { filename: 'Greg_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Greg', category: 'fitness' },
  { filename: 'Julie_cellule_abdos_avant_apres_1-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Julie', category: 'abdos' },
  { filename: 'Lucie_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Lucie', category: 'fitness' },
  { filename: 'Mama_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Mama', category: 'fitness' },
  { filename: 'Marie_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Marie', category: 'fitness' },
  { filename: 'Marion_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Marion', category: 'fitness' },
  { filename: 'Mathis_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Mathis', category: 'fitness' },
  { filename: 'Melanie_cellule_fessier_avant_apres_1-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Melanie', category: 'fessier' },
  { filename: 'Melanie_cellule_fessier_avant_apres_2-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Melanie', category: 'fessier' },
  { filename: 'Melanie_cellule_fessier_avant_apres_3-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Melanie', category: 'fessier' },
  { filename: 'Melanie_cellule_fessier_avant_apres_4-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Melanie', category: 'fessier' },
  { filename: 'Nath_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Nath', category: 'fitness' },
  { filename: 'Nathalie_cellule_abdos_avant_apres_1-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Nathalie', category: 'abdos' },
  { filename: 'Ophe_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Ophe', category: 'fitness' },
  { filename: 'Sophie_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Sophie', category: 'fitness' },
  { filename: 'Stephane_lacellule_complet-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Stephane', category: 'fitness' },
  { filename: 'Thomas_cellule_abdos_avant_apres_1-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Thomas', category: 'abdos' },
  { filename: 'Valentine_cellule_fitness_avant_apres-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Valentine', category: 'fitness' },
  { filename: 'Vic_cellule_abdos_avant_apres_1-ezgif.com-jpg-to-webp-converter.webp', clientName: 'Vic', category: 'abdos' }
];

const INITIAL_VISIBLE_RESULTS = 6;

const categoryLabels = {
  fitness: 'Routine complete',
  fessier: 'Focus bas du corps',
  abdos: 'Focus sangle abdominale'
};

const categoryNotes = {
  fitness: '15 minutes, repetition et cadre net',
  fessier: 'Progression ciblee et effort concentre',
  abdos: 'Execution courte et engagement visible'
};

// Les visuels clients sont servis en local depuis images/content_webp.
function getImageUrl(filename) {
  return `images/content_webp/${encodeURIComponent(filename)}`;
}

function isSupportedImage(filename) {
  const lower = filename.toLowerCase();
  return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp');
}

// Fonction pour récupérer les données depuis le dossier local
async function getClientResults(category = null) {
  return clientImages
    .filter(image => !category || image.category === category)
    .filter(image => isSupportedImage(image.filename))
    .map(image => ({
      ...image,
      public_url: getImageUrl(image.filename)
    }));
}

function createResultCard(result, index) {
  const animationClasses = [
    'animate-scale-in',
    'animate-scale-in delay-100',
    'animate-scale-in delay-200',
    'animate-scale-in delay-300',
    'animate-scale-in delay-400',
    'animate-scale-in delay-500'
  ];
  const animationClass = animationClasses[index % animationClasses.length];
  const category = result.category || 'fitness';
  const tag = categoryLabels[category] || 'Transformation reelle';
  const note = categoryNotes[category] || 'Cadre simple et progression visible';
  const clientName = result.client_name || result.clientName || 'Membre';
  const loadingMode = index < 2 ? 'eager' : 'lazy';
  const fetchPriority = index === 0 ? 'high' : 'low';

  return `
    <article class="resultat-card ${animationClass}">
      <img src="${result.public_url}" alt="Résultat de ${clientName}" loading="${loadingMode}" fetchpriority="${fetchPriority}" decoding="async" />
      <div class="resultat-card__overlay">
        <span class="resultat-card__tag">${tag}</span>
        <strong class="resultat-card__name">${clientName}</strong>
        <span class="resultat-card__meta">${note}</span>
      </div>
    </article>
  `;
}

function renderResultsBatch(container, results, fromIndex, toIndex, append = false) {
  const batch = results.slice(fromIndex, toIndex);
  const html = batch.map((result, batchIndex) => createResultCard(result, fromIndex + batchIndex)).join('');

  if (append) {
    container.insertAdjacentHTML('beforeend', html);
    return;
  }

  container.innerHTML = html;
}

// Fonction pour afficher les résultats sur la page (exemple)
async function displayClientResults(containerId, category = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const results = await getClientResults(category);
  if (results.length === 0) {
    container.innerHTML = '<p>Aucun résultat trouvé pour le moment.</p>';
    return;
  }

  container.innerHTML = '';

  let visibleCount = Math.min(INITIAL_VISIBLE_RESULTS, results.length);
  renderResultsBatch(container, results, 0, visibleCount);

  if (results.length <= visibleCount) {
    return;
  }

  const actions = document.createElement('div');
  actions.className = 'resultats-actions';

  const showMoreButton = document.createElement('button');
  showMoreButton.type = 'button';
  showMoreButton.className = 'cta-button cta-button-secondary resultats-more-btn';
  showMoreButton.textContent = `Voir plus de transformations (+${results.length - visibleCount})`;

  showMoreButton.addEventListener('click', () => {
    const nextCount = Math.min(visibleCount + INITIAL_VISIBLE_RESULTS, results.length);
    renderResultsBatch(container, results, visibleCount, nextCount, true);
    visibleCount = nextCount;

    if (visibleCount >= results.length) {
      actions.remove();
      return;
    }

    showMoreButton.textContent = `Voir plus de transformations (+${results.length - visibleCount})`;
  });

  actions.appendChild(showMoreButton);
  container.insertAdjacentElement('afterend', actions);
}

// Export pour utilisation dans d'autres fichiers
window.ClientResults = {
  getImageUrl,
  getClientResults,
  displayClientResults
};










