// app/sitemap.js
const SITE_URL = 'https://timera.tn';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function sitemap() {
    // Fetch all products
    const res = await fetch(`${API_URL}/api/product`, {
        cache: 'no-store',
    });

    const products = res.ok ? await res.json() : [];

    const productUrls = products.map((product) => ({
        url: `${SITE_URL}/products/${product._id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${SITE_URL}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/montres-acier-inoxydable-tunisie`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        ...productUrls,
    ];
}
