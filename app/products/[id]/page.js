// app/products/[id]/page.js
import ProductDetail from '@/app/components/ProductDetail';
const SITE_URL = "https://timera.tn"
const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function generateMetadata({ params }) {
    const { id } = await params;
    console.log(id);


    const response = await fetch(`${API_URL}/api/product/${id}`, {
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        return {
            title: 'Produit non trouvé | TimEra',
            description: 'Ce produit n’est plus disponible sur TimEra.',
            robots: 'noindex',
        };
    }

    const product = await response.json();

    const title = `${product.name} – Montre ${product.gender} | TimEra`;
    const description =
        product.description ||
        `Achetez la montre ${product.name} (${product.collection}) en Tunisie. Bracelet ${product.specs?.includes('cuir') ? 'cuir' : 'haut de gamme'}, prix ${product.price} DT. Livraison rapide.`;

    return {
        title,
        description,
        keywords: [
            product.name,
            'montre Tunisie',
            'montre homme Tunisie',
            'montre cuir',
            product.collection,
            product.category,
            'TimEra',
        ],
        alternates: {
            canonical: `${SITE_URL}/products/${id}`,
        },
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/products/${id}`,
            images: [
                {
                    url: product.images?.[0],
                    width: 800,
                    height: 800,
                    alt: product.name,
                },
            ],
            locale: 'fr_TN',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [product.images?.[0]],
        },
    };
}
export default async function ProductPage({ params }) {
    const { id } = await params;

    const response = await fetch(`${API_URL}/api/product/${id}`, {
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-serif mb-4">Produit non trouvé</h1>
                    <p className="text-gray-600">
                        Le produit que vous recherchez n'existe pas ou a été supprimé.
                    </p>
                </div>
            </div>
        );
    }

    const product = await response.json();

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images,
        description:
            product.description ||
            `Montre ${product.name} de la collection ${product.collection}`,
        sku: product.sku,
        brand: {
            '@type': 'Brand',
            name: 'TimEra',
        },
        offers: {
            '@type': 'Offer',
            url: `https://timera.tn/products/${id}`,
            priceCurrency: 'TND',
            price: product.price,
            availability:
                product.stock > 0
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <ProductDetail product={product} />
        </>
    );
}
