import { getAccessToken, getCurrentUserWithMembership, signInWithEmail, signOut } from './auth.js';

const THEME_KEY = 'matdeff-theme-accent';

const THEME_PRESETS = {
    red: {
        accent: '#e10600',
        accentDark: '#b40000',
        accentSoft: '#ffe5e4'
    },
    blue: {
        accent: '#0072e5',
        accentDark: '#0056ad',
        accentSoft: '#e6f2ff'
    },
    green: {
        accent: '#169b62',
        accentDark: '#11764b',
        accentSoft: '#e8f8f0'
    },
    orange: {
        accent: '#e57a00',
        accentDark: '#b86000',
        accentSoft: '#fff1e1'
    },
    black: {
        accent: '#090909',
        accentDark: '#000000',
        accentSoft: '#ececef'
    }
};

function getMembershipTier(payload) {
    return payload?.membership?.tier === 'premium' ? 'premium' : 'free';
}

function applyThemePreset(presetName) {
    const preset = THEME_PRESETS[presetName] || THEME_PRESETS.red;
    document.documentElement.style.setProperty('--accent', preset.accent);
    document.documentElement.style.setProperty('--accent-dark', preset.accentDark);
    document.documentElement.style.setProperty('--accent-soft', preset.accentSoft);
}

function readSavedThemePreset() {
    const stored = localStorage.getItem(THEME_KEY);
    return stored && THEME_PRESETS[stored] ? stored : 'red';
}

function markThemeChoice(activeName) {
    const buttons = document.querySelectorAll('[data-theme-choice]');
    buttons.forEach((button) => {
        const isActive = button.getAttribute('data-theme-choice') === activeName;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });

    const label = document.getElementById('theme-active-label');
    if (label) {
        label.textContent = activeName;
    }
}

function setupThemePicker() {
    const buttons = document.querySelectorAll('[data-theme-choice]');
    if (!buttons.length) {
        return;
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const presetName = button.getAttribute('data-theme-choice');
            if (!presetName || !THEME_PRESETS[presetName]) {
                return;
            }

            localStorage.setItem(THEME_KEY, presetName);
            applyThemePreset(presetName);
            markThemeChoice(presetName);
        });
    });

    markThemeChoice(readSavedThemePreset());
}

function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu || hamburger.dataset.mobileMenuBound === 'true') {
        return;
    }

    hamburger.dataset.mobileMenuBound = 'true';

    const closeMenu = () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active') ? 'true' : 'false');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

function setLoginStatus(message, isError) {
    const status = document.getElementById('login-status');
    if (!status) {
        return;
    }

    status.textContent = message;
    status.style.color = isError ? '#ff5a5a' : '#2ecc71';
}

function applyAccessVisualState(membershipTier) {
    const cards = document.querySelectorAll('[data-access-level]');
    cards.forEach((card) => {
        const accessLevel = card.getAttribute('data-access-level') === 'premium' ? 'premium' : 'free';
        const isLocked = accessLevel === 'premium' && membershipTier !== 'premium';
        card.classList.toggle('access-locked', isLocked);

        const badge = card.querySelector('[data-access-label]');
        if (badge) {
            badge.textContent = accessLevel === 'premium' ? 'Premium' : 'Free';
            badge.classList.toggle('access-badge-premium', accessLevel === 'premium');
            badge.classList.toggle('access-badge-free', accessLevel !== 'premium');
        }
    });
}

function getPageKey() {
    return document.body.getAttribute('data-page') || '';
}

function renderDynamicContent(items, membershipTier, type) {
    const container = document.getElementById('dynamic-content');
    if (!container) {
        return;
    }

    const html = items.map((item) => {
        const accessLevel = item.accessLevel === 'premium' ? 'premium' : 'free';
        const isLocked = accessLevel === 'premium' && membershipTier !== 'premium';
        const title = item.title || item.label || 'Element';
        const description = item.description || item.hint || '';
        const value = type === 'statistiques' && item.value ? `<p class="metric-value">${item.value}</p>` : '';

        return `
            <article class="user-placeholder-card ${isLocked ? 'access-locked' : ''}" data-access-level="${accessLevel}">
                <span class="access-badge ${accessLevel === 'premium' ? 'access-badge-premium' : 'access-badge-free'}" data-access-label>${accessLevel === 'premium' ? 'Premium' : 'Free'}</span>
                <h3>${title}</h3>
                ${value}
                <p>${description}</p>
            </article>
        `;
    }).join('');

    if (html) {
        container.innerHTML = html;
    }
}

async function fetchJsonWithAuth(url) {
    const token = await getAccessToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error('Chargement API impossible');
    }

    return response.json();
}

async function loadDynamicPageContent(membershipTier) {
    const pageKey = getPageKey();
    const endpointMap = {
        cours: '/api/v2/cours',
        ressources: '/api/v2/ressources',
        statistiques: '/api/v2/statistiques'
    };

    const endpoint = endpointMap[pageKey];
    if (!endpoint) {
        return;
    }

    try {
        const payload = await fetchJsonWithAuth(endpoint);
        if (Array.isArray(payload.items) && payload.items.length) {
            renderDynamicContent(payload.items, membershipTier, pageKey);
        }
    } catch (_error) {
        // Keep static placeholders if API is unavailable.
    }
}

function showProtectedContent(payload) {
    const loginSection = document.getElementById('login-section');
    const protectedSection = document.getElementById('protected-content');
    const logoutButton = document.getElementById('logout-btn');
    const welcome = document.getElementById('user-welcome');

    if (loginSection) {
        loginSection.style.display = 'none';
    }
    if (protectedSection) {
        protectedSection.style.display = 'block';
    }
    if (logoutButton) {
        logoutButton.style.display = 'inline-flex';
    }

    if (welcome && payload?.user?.user_metadata) {
        const firstName = payload.user.user_metadata.first_name || 'Membre';
        welcome.textContent = `Connecté en tant que ${firstName}`;
    }

    const tier = getMembershipTier(payload);
    applyAccessVisualState(tier);
    loadDynamicPageContent(tier);
}

function showLoginForm() {
    const loginSection = document.getElementById('login-section');
    const protectedSection = document.getElementById('protected-content');
    const logoutButton = document.getElementById('logout-btn');

    if (loginSection) {
        loginSection.style.display = 'block';
    }
    if (protectedSection) {
        protectedSection.style.display = 'none';
    }
    if (logoutButton) {
        logoutButton.style.display = 'none';
    }
}

async function loadProtectedPage() {
    try {
        const payload = await getCurrentUserWithMembership();
        if (!payload) {
            showLoginForm();
            return;
        }

        showProtectedContent(payload);
    } catch (error) {
        showLoginForm();
        setLoginStatus(error.message || 'Session invalide.', true);
    }
}

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        return;
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('login-email')?.value.trim() || '';
        const password = document.getElementById('login-password')?.value || '';

        try {
            setLoginStatus('Connexion en cours...', false);
            await signInWithEmail({ email, password });
            setLoginStatus('Connexion reussie.', false);
            await loadProtectedPage();
        } catch (error) {
            setLoginStatus(error.message || 'Email ou mot de passe incorrect.', true);
        }
    });
}

function setupLogout() {
    const logoutButton = document.getElementById('logout-btn');
    if (!logoutButton) {
        return;
    }

    logoutButton.addEventListener('click', async () => {
        try {
            await signOut();
        } catch (_error) {
            // noop
        }

        showLoginForm();
        setLoginStatus('Vous etes deconnecte.', false);
    });
}

export function initUserPage() {
    const savedPreset = readSavedThemePreset();
    applyThemePreset(savedPreset);

    setupMobileMenu();
    setupThemePicker();
    setupLoginForm();
    setupLogout();
    loadProtectedPage();
}
