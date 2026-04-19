let supabaseClientPromise;

async function fetchPublicConfig() {
    const response = await fetch('/api/config');
    if (!response.ok) {
        throw new Error('Configuration API indisponible.');
    }

    const config = await response.json();
    if (!config.supabaseUrl || !config.supabaseAnonKey) {
        throw new Error('Supabase n est pas configure sur le serveur.');
    }

    return config;
}

export async function getSupabaseClient() {
    if (supabaseClientPromise) {
        return supabaseClientPromise;
    }

    supabaseClientPromise = (async () => {
        const config = await fetchPublicConfig();
        const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');

        return createClient(config.supabaseUrl, config.supabaseAnonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });
    })();

    return supabaseClientPromise;
}

export async function signUpWithEmail({ email, password, firstName, lastName, phone }) {
    const supabase = await getSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                phone: phone || ''
            }
        }
    });

    if (error) {
        throw error;
    }

    return data;
}

export async function signInWithEmail({ email, password }) {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        throw error;
    }

    return data;
}

export async function signOut() {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw error;
    }
}

export async function getSession() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw error;
    }

    return data.session;
}

export async function getAccessToken() {
    const session = await getSession();
    return session?.access_token || null;
}

export async function getCurrentUserWithMembership() {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        return null;
    }

    const response = await fetch('/api/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Impossible de recuperer le profil membre.');
    }

    return response.json();
}

export async function createStripeCheckoutSession() {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        throw new Error('Session utilisateur invalide.');
    }

    const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });

    const payload = await response.json();
    if (!response.ok) {
        throw new Error(payload.error || 'Erreur checkout Stripe.');
    }

    return payload;
}

export async function getReferralLink() {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        throw new Error('Session utilisateur invalide.');
    }

    const response = await fetch('/api/referral-link', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const payload = await response.json();
    if (!response.ok) {
        throw new Error(payload.error || 'Erreur generation referral link.');
    }

    return payload.referralLink;
}
