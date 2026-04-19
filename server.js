require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = Number(process.env.PORT || 8080);

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const stripePriceId = process.env.STRIPE_PRICE_ID || '';
const appBaseUrl = process.env.APP_BASE_URL || `http://localhost:${port}`;

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;
const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

const fallbackCourses = [
    {
        id: 'cours-fondations',
        title: 'Module 1 - Fondations',
        description: 'Bases de la routine et execution propre des mouvements.',
        accessLevel: 'free'
    },
    {
        id: 'cours-progression',
        title: 'Module 2 - Progression',
        description: 'Montée en intensite sur des cycles courts et repetables.',
        accessLevel: 'premium'
    },
    {
        id: 'cours-consolidation',
        title: 'Module 3 - Consolidation',
        description: 'Consolider les habitudes et stabiliser les resultats.',
        accessLevel: 'premium'
    }
];

const fallbackResources = [
    {
        id: 'res-guide-pdf',
        title: 'Guide PDF',
        description: 'Repere rapide pour les objectifs de la semaine.',
        accessLevel: 'free'
    },
    {
        id: 'res-video-courte',
        title: 'Videos courtes',
        description: 'Formats pedagogiques courts pour progresser pas a pas.',
        accessLevel: 'premium'
    },
    {
        id: 'res-fiche-pratique',
        title: 'Fiches pratiques',
        description: 'Checklists d execution et de suivi quotidien.',
        accessLevel: 'premium'
    }
];

const fallbackStats = [
    {
        key: 'sessions_completed',
        label: 'Sessions completees',
        value: '12',
        hint: 'sur les 30 derniers jours',
        accessLevel: 'free'
    },
    {
        key: 'weekly_progress',
        label: 'Progression hebdomadaire',
        value: '+18%',
        hint: 'vs semaine precedente',
        accessLevel: 'premium'
    },
    {
        key: 'monthly_goals',
        label: 'Objectifs du mois',
        value: '2 / 4',
        hint: 'objectifs atteints',
        accessLevel: 'premium'
    }
];

app.use(cors());

app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    if (!stripe || !stripeWebhookSecret || !supabaseAdmin) {
        return res.status(503).json({ error: 'Stripe webhook not configured.' });
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], stripeWebhookSecret);
    } catch (error) {
        return res.status(400).json({ error: `Webhook signature verification failed: ${error.message}` });
    }

    try {
        if (event.type === 'checkout.session.completed' || event.type === 'invoice.paid') {
            const object = event.data.object;
            const userId = object.metadata?.supabase_user_id || object.client_reference_id || null;
            const stripeSubscriptionId = object.subscription || object.id;

            if (userId) {
                await supabaseAdmin.from('memberships').upsert({
                    user_id: userId,
                    tier: 'premium',
                    status: 'active',
                    stripe_subscription_id: String(stripeSubscriptionId),
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' });
            }
        }

        if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.updated') {
            const object = event.data.object;
            const subscriptionId = object.id;
            const status = object.status;

            if (subscriptionId) {
                const isActive = status === 'active' || status === 'trialing';
                await supabaseAdmin
                    .from('memberships')
                    .update({
                        tier: isActive ? 'premium' : 'free',
                        status: isActive ? 'active' : 'inactive',
                        updated_at: new Date().toISOString()
                    })
                    .eq('stripe_subscription_id', String(subscriptionId));
            }
        }

        return res.json({ received: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/health', (_req, res) => {
    res.json({ ok: true, now: new Date().toISOString() });
});

app.get('/api/config', (_req, res) => {
    res.json({
        supabaseUrl,
        supabaseAnonKey,
        stripePriceId,
        appBaseUrl
    });
});

async function getAuthUser(req, res) {
    if (!supabaseAdmin) {
        res.status(503).json({ error: 'Supabase admin client not configured.' });
        return null;
    }

    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Missing bearer token.' });
        return null;
    }

    const token = authHeader.slice('Bearer '.length);
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data?.user) {
        res.status(401).json({ error: 'Invalid session token.' });
        return null;
    }

    return data.user;
}

app.get('/api/me', async (req, res) => {
    const user = await getAuthUser(req, res);
    if (!user) {
        return;
    }

    let tier = 'free';

    const { data: membership } = await supabaseAdmin
        .from('memberships')
        .select('tier,status')
        .eq('user_id', user.id)
        .maybeSingle();

    if (membership?.tier === 'premium' && membership?.status === 'active') {
        tier = 'premium';
    }

    res.json({
        user: {
            id: user.id,
            email: user.email,
            user_metadata: user.user_metadata || {}
        },
        membership: {
            tier,
            status: membership?.status || 'inactive'
        }
    });
});

app.post('/api/create-checkout-session', async (req, res) => {
    const user = await getAuthUser(req, res);
    if (!user) {
        return;
    }

    if (!stripe || !stripePriceId) {
        return res.status(503).json({ error: 'Stripe not configured.' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [{ price: stripePriceId, quantity: 1 }],
            client_reference_id: user.id,
            metadata: {
                supabase_user_id: user.id
            },
            success_url: `${appBaseUrl}/dashboard.html?checkout=success`,
            cancel_url: `${appBaseUrl}/dashboard.html?checkout=cancel`
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/referral-link', async (req, res) => {
    const user = await getAuthUser(req, res);
    if (!user) {
        return;
    }

    const referralLink = `${appBaseUrl}/signup.html?ref=${encodeURIComponent(user.id)}`;
    res.json({ referralLink });
});

app.get('/api/v2/cours', async (_req, res) => {
    if (!supabaseAdmin) {
        return res.json({ source: 'fallback', items: fallbackCourses });
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('courses')
            .select('id,title,description,access_level,position')
            .order('position', { ascending: true });

        if (error) {
            throw error;
        }

        if (!data || !data.length) {
            return res.json({ source: 'fallback', items: fallbackCourses });
        }

        const items = data.map((item) => ({
            id: String(item.id),
            title: item.title,
            description: item.description,
            accessLevel: item.access_level === 'premium' ? 'premium' : 'free'
        }));

        return res.json({ source: 'supabase', items });
    } catch (_error) {
        return res.json({ source: 'fallback', items: fallbackCourses });
    }
});

app.get('/api/v2/ressources', async (_req, res) => {
    if (!supabaseAdmin) {
        return res.json({ source: 'fallback', items: fallbackResources });
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('resources')
            .select('id,title,description,access_level,position')
            .order('position', { ascending: true });

        if (error) {
            throw error;
        }

        if (!data || !data.length) {
            return res.json({ source: 'fallback', items: fallbackResources });
        }

        const items = data.map((item) => ({
            id: String(item.id),
            title: item.title,
            description: item.description,
            accessLevel: item.access_level === 'premium' ? 'premium' : 'free'
        }));

        return res.json({ source: 'supabase', items });
    } catch (_error) {
        return res.json({ source: 'fallback', items: fallbackResources });
    }
});

app.get('/api/v2/statistiques', async (req, res) => {
    if (!supabaseAdmin) {
        return res.json({ source: 'fallback', items: fallbackStats });
    }

    const user = await getAuthUser(req, res);
    if (!user) {
        return;
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('user_stats')
            .select('metric_key,metric_label,metric_value,metric_hint,access_level,position')
            .eq('user_id', user.id)
            .order('position', { ascending: true });

        if (error) {
            throw error;
        }

        if (!data || !data.length) {
            return res.json({ source: 'fallback', items: fallbackStats });
        }

        const items = data.map((item) => ({
            key: item.metric_key,
            label: item.metric_label,
            value: item.metric_value,
            hint: item.metric_hint,
            accessLevel: item.access_level === 'premium' ? 'premium' : 'free'
        }));

        return res.json({ source: 'supabase', items });
    } catch (_error) {
        return res.json({ source: 'fallback', items: fallbackStats });
    }
});

app.get('/dashboard', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/signup', (_req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/cellules', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/cours', (_req, res) => {
    res.sendFile(path.join(__dirname, 'cours.html'));
});

app.get('/ressources', (_req, res) => {
    res.sendFile(path.join(__dirname, 'ressources.html'));
});

app.get('/supports', (_req, res) => {
    res.sendFile(path.join(__dirname, 'supports.html'));
});

app.get('/statistiques', (_req, res) => {
    res.sendFile(path.join(__dirname, 'statistiques.html'));
});

app.get('/parametres', (_req, res) => {
    res.sendFile(path.join(__dirname, 'parametres.html'));
});

app.get('/outils', (_req, res) => {
    res.sendFile(path.join(__dirname, 'outils.html'));
});

app.listen(port, () => {
    console.log(`Matdeff server running on port ${port}`);
});
