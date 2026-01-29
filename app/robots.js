// app/robots.js
export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api',
                    '/admin',
                    '/cart',
                    '/checkout',
                ],
            },
        ],
        sitemap: 'https://timera.tn/sitemap.xml',
    };
}
