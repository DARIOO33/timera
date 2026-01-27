// app/collections/[collection]/page.js
import CollectionProducts from '@/app/components/CollectionProducts';

export async function generateMetadata({ params }) {
    const { collection } = await params;
    const collectionNames = {
        inox: 'Inox',
        classique: 'Classique',
        sport: 'Sport',
        hommes: "Hommes",
        femmes: "Femmes",
    };

    return {
        title: `${collectionNames[collection]} - TimEra`,
        description: `Collection ${collectionNames[collection]} de montres TimEra`,
    };
}

export default async function CollectionPage({ params }) {
    const { collection } = await params;

    // Fetch products for this collection
    const response = await fetch('http://localhost:5001/api/product', {
        cache: 'no-store'
    });

    const allProducts = await response.json();
    const products = allProducts.filter(product => product.collection === collection || product.gender === collection);

    const collectionData = {
        inox: {
            title: 'Collection Inox',
            description: 'Notre collection Inox allie modernité et durabilité avec des montres en acier inoxydable de qualité supérieure. Chaque pièce est conçue pour résister à l\'épreuve du temps tout en conservant son éclat.',
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&auto=format&fit=crop'
        },
        classique: {
            title: 'Collection Classique',
            description: 'La collection Classique incarne l\'élégance intemporelle et l\'artisanat traditionnel. Des montres raffinées pour les occasions spéciales et les amateurs de style traditionnel.',
            image: 'https://images.unsplash.com/photo-1547996160-81f58f6e6e68?w=1200&auto=format&fit=crop'
        },
        sport: {
            title: 'Collection Sport',
            description: 'Conçue pour les actifs, la collection Sport combine performance, robustesse et style. Des montres résistantes à l\'eau avec des fonctionnalités avancées pour votre vie active.',
            image: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=1200&auto=format&fit=crop'
        },
        hommes: {
            title: 'Collection Pour Hommes',
            description: 'Conçue pour les actifs, la collection Sport combine performance, robustesse et style. Des montres résistantes à l\'eau avec des fonctionnalités avancées pour votre vie active.',
            image: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=1200&auto=format&fit=crop'
        },
        femmes: {
            title: 'Collection Pour Femmes',
            description: 'Conçue pour les actifs, la collection Sport combine performance, robustesse et style. Des montres résistantes à l\'eau avec des fonctionnalités avancées pour votre vie active.',
            image: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=1200&auto=format&fit=crop'
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Collection Hero */}
            <div className="relative bg-gradient-to-b from-gray-900 to-black text-white">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                </div>
                <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full mb-6">
                            <span className="text-sm font-medium">COLLECTION</span>
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
                            {collectionData[collection].title}
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl">
                            {collectionData[collection].description}
                        </p>
                        <div className="text-gray-400">
                            {products.length} modèle{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <CollectionProducts products={products} collection={collection} />
        </div>
    );
}