// app/products/[id]/page.js
import ProductDetail from '@/app/components/ProductDetail';

const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function generateMetadata({ params }) {
    const { id } = await params;

    // Fetch product data
    const response = await fetch(`${API_URL}/api/product/${id}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        return {
            title: 'Produit non trouvé - TimEra',
            description: 'Produit non disponible',
        };
    }

    const product = await response.json();

    return {
        title: `${product.name} - TimEra`,
        description: product.description || `Montre ${product.name} de la collection ${product.collection}`,
    };
}
export default async function ProductPage({ params }) {
    const { id } = await params;

    // Fetch product data
    const response = await fetch(`${API_URL}/api/product/${id}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-serif text-3xl text-gray-900 mb-4">
                        Produit non trouvé
                    </h1>
                    <p className="text-gray-600">
                        Le produit que vous recherchez n&apos;existe pas ou a été supprimé.
                    </p>
                </div>
            </div>
        );
    }

    const product = await response.json();

    return <ProductDetail product={product} />;
}