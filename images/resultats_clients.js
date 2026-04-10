// filepath: /Users/mathieu_pro/Empire/Site internet/Matdeff Site/resultats_clients.js

// Configuration Supabase (remplacez par vos vraies valeurs)
const SUPABASE_URL = 'votre_supabase_url';
const SUPABASE_ANON_KEY = 'votre_clé_anonyme';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Liste des images clients (pour initialisation ou référence)
const clientImages = [
  { filename: 'Amelie_cellule_fitness_avant.jpg', clientName: 'Amélie', category: 'fitness' },
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
  { filename: 'Melanie_cellule_fessier_avant_apres_2.jpeg', clientName: 'Mélanie', category: 'fessier' }
];

// Fonction pour obtenir l'URL publique d'une image
function getImageUrl(filename) {
  const { data } = supabase.storage.from('Resultats_clients').getPublicUrl(filename);
  return data.publicUrl;
}

// Fonction pour sauvegarder les données en base (appelée une fois pour initialiser)
async function saveClientResultsToDB() {
  for (let image of clientImages) {
    const publicUrl = getImageUrl(image.filename);
    await supabase.from('client_results').insert({
      filename: image.filename,
      public_url: publicUrl,
      client_name: image.clientName,
      category: image.category,
      description: `Résultat de ${image.clientName} - ${image.category}`
    });
  }
}

// Fonction pour récupérer les données depuis la base
async function getClientResults(category = null) {
  let query = supabase.from('client_results').select('*');
  if (category) {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  if (error) console.error('Erreur récupération:', error);
  return data || [];
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
    return `
      <article class="resultat-card ${animationClass}">
        <img src="${result.public_url}" alt="Résultat de ${result.client_name}" loading="lazy" />
      </article>
    `;
  }).join('');
}

// Export pour utilisation dans d'autres fichiers
window.ClientResults = {
  getImageUrl,
  saveClientResultsToDB,
  getClientResults,
  displayClientResults
};










