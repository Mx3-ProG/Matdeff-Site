
// Liste des images clients (pour initialisation ou référence)
const clientImages = [
  { filename: 'Amelie_cellule_fitness_avant_apres2.jpeg', clientName: 'Amélie', category: 'fitness' },
  { filename: 'Camille_cellule_fessier_avant_apres_1.jpg', clientName: 'Camille', category: 'fessier' },
  { filename: 'Camille_cellule_fitness_avant_apres3.jpeg', clientName: 'Camille', category: 'fitness' },
  { filename: 'Cece_cellule_fitness_avant_apres.jpeg', clientName: 'Céce', category: 'fitness' },
  { filename: 'Celine_cellule_fitness_avant_apres.jpeg', clientName: 'Céline', category: 'fitness' },
  { filename: 'Claire_cellule_fitness_avant_apres.jpeg', clientName: 'Claire', category: 'fitness' },
  { filename: 'Coralie_cellule_fitness_avant_apres.jpeg', clientName: 'Coralie', category: 'fitness' },
  { filename: 'Coraline_cellule_fitness_avant_apres.jpeg', clientName: 'Coraline', category: 'fitness' },
  { filename: 'Greg_cellule_fitness_avant_apres.jpeg', clientName: 'Greg', category: 'fitness' },
  { filename: 'Julie_cellule_abdos_avant_apres_1.jpeg', clientName: 'Julie', category: 'abdos' },
  { filename: 'Lucie_cellule_fitness_avant_apres.jpeg', clientName: 'Lucie', category: 'fitness' },
  { filename: 'Mama_cellule_fitness_avant_apres.jpeg', clientName: 'Mama', category: 'fitness' },
  { filename: 'Marie_cellule_fitness_avant_apres.jpeg', clientName: 'Marie', category: 'fitness' },
  { filename: 'Marion_cellule_fitness_avant_apres.jpeg', clientName: 'Marion', category: 'fitness' },
  { filename: 'Mathis_cellule_fitness_avant_apres.jpeg', clientName: 'Mathis', category: 'fitness' },
  { filename: 'Melanie_cellule_fessier_avant_apres_1.jpeg', clientName: 'Mélanie', category: 'fessier' },
  { filename: 'Melanie_cellule_fessier_avant_apres_2.jpeg', clientName: 'Mélanie', category: 'fessier' },
  { filename: 'Melanie_cellule_fessier_avant_apres_3.jpeg', clientName: 'Mélanie', category: 'fessier' },
  { filename: 'Melanie_cellule_fessier_avant_apres_4.jpeg', clientName: 'Mélanie', category: 'fessier' },
  { filename: 'Nath_cellule_fitness_avant_apres.jpeg', clientName: 'Nath', category: 'fitness' },
  { filename: 'Nathalie_cellule_abdos_avant_apres_1.jpeg', clientName: 'Nathalie', category: 'abdos' },
  { filename: 'Ophe_cellule_fitness_avant_apres.jpeg', clientName: 'Ophe', category: 'fitness' },
  { filename: 'Sophie_cellule_fitness_avant_apres.jpeg', clientName: 'Sophie', category: 'fitness' },
  { filename: 'Stephane_cellule_fitness_avant_apres.jpeg', clientName: 'Stephane', category: 'fitness' },
  { filename: 'Valentine_cellule_fitness_avant_apres.jpeg', clientName: 'Valentine', category: 'fitness' },
  { filename: 'Vic_cellule_abdos_avant_apres_1.jpeg', clientName: 'Vic', category: 'abdos' }
];

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

// Les visuels clients sont servis en local depuis images/content.
function getImageUrl(filename) {
  return `images/content/${encodeURIComponent(filename)}`;
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

// Fonction pour afficher les résultats sur la page (exemple)
async function displayClientResults(containerId, category = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const results = await getClientResults(category);
  if (results.length === 0) {
    container.innerHTML = '<p>Aucun résultat trouvé pour le moment.</p>';
    return;
  }

  // Classes d'animation pour chaque carte
  const animationClasses = [
    'animate-scale-in',
    'animate-scale-in delay-100',
    'animate-scale-in delay-200',
    'animate-scale-in delay-300',
    'animate-scale-in delay-400',
    'animate-scale-in delay-500'
  ];

  container.innerHTML = results.map((result, index) => {
    const animationClass = animationClasses[index % animationClasses.length];
    const category = result.category || 'fitness';
    const tag = categoryLabels[category] || 'Transformation reelle';
    const note = categoryNotes[category] || 'Cadre simple et progression visible';
    const clientName = result.client_name || result.clientName || 'Membre';
    return `
      <article class="resultat-card ${animationClass}">
        <img src="${result.public_url}" alt="Résultat de ${clientName}" loading="lazy" />
        <div class="resultat-card__overlay">
          <span class="resultat-card__tag">${tag}</span>
          <strong class="resultat-card__name">${clientName}</strong>
          <span class="resultat-card__meta">${note}</span>
        </div>
      </article>
    `;
  }).join('');
}

// Export pour utilisation dans d'autres fichiers
window.ClientResults = {
  getImageUrl,
  getClientResults,
  displayClientResults
};










