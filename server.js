/**
 * Matdeff Site - Serveur Express
 * Sert les fichiers statiques de l'application
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing-page.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Route pour servir les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Gestion des fichiers non trouvés
app.use((req, res) => {
    console.log(`404 Not Found: ${req.path}`);
    res.status(404).sendFile(path.join(__dirname, 'landing-page.html'));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Erreur serveur:', err);
    res.status(500).json({ 
        error: 'Erreur serveur interne',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Démarrer le serveur
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔════════════════════════════════════════╗
║     Matdeff Site - Serveur Lancé       ║
╠════════════════════════════════════════╣
║ 🌐 Local:     http://localhost:${PORT}     ║
║ 🔗 Network:   http://0.0.0.0:${PORT}      ║
║ 📱 Signets:   landing-page (/)          ║
║               dashboard (/dashboard)    ║
║               signup (/signup)          ║
║ ℹ️  Appuyez sur Ctrl+C pour arrêter    ║
╚════════════════════════════════════════╝
    `);
});

// Gestion de l'arrêt gracieux
process.on('SIGTERM', () => {
    console.log('SIGTERM reçu, arrêt du serveur...');
    server.close(() => {
        console.log('Serveur arrêté');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\nSIGINT reçu, arrêt du serveur...');
    server.close(() => {
        console.log('Serveur arrêté');
        process.exit(0);
    });
});
