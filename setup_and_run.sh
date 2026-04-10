#!/bin/bash
# 🚀 Matdeff Site - Setup & Run Script
# Utilisation: bash setup_and_run.sh

set -e

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   🚀 Matdeff Site - Configuration & Lancement         ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Vérifier l'existence de Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé!"
    echo ""
    echo "📥 Installez Node.js depuis https://nodejs.org/"
    echo "   Ou avec Homebrew: brew install node"
    echo ""
    exit 1
fi

# Vérifier l'existence de npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé!"
    exit 1
fi

echo "✅ Node.js $(node --version) détecté"
echo "✅ npm $(npm --version) détecté"
echo ""

# Naviguer vers le répertoire correct
cd "$(dirname "$0")"

# Installer les dépendances
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo "✅ Dépendances installées"
else
    echo "✅ Dépendances déjà installées"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║   ✅ Configuration terminée! Lancement du serveur...  ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Lancer le serveur
npm start
