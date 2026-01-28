import CollectionsGrid from '@/app/components/CollectionsGrid';

export const metadata = {
    title: 'Collections - TimEra',
    description: 'Découvrez nos collections de montres de luxe',
};
const API_URL = process.env.NEXT_PUBLIC_API_URL
export default async function CollectionsPage() {
    // Fetch all products
    const response = await fetch(`${API_URL}/api/product`, {
        cache: 'no-store'
    });

    const products = await response.json();

    // Group products by collection
    const collections = {
        inox: products.filter(product => product.collection === 'inox'),
        classique: products.filter(product => product.collection === 'classique'),
        sport: products.filter(product => product.collection === 'sport')
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section for Collections */}
            <div className="bg-gradient-to-b from-[#12362A]/5 to-white py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0E2B1F] mb-6">
                            Nos Collections
                        </h1>
                        <p className="text-[#12362A] text-lg md:text-xl mb-8">
                            Découvrez nos trois lignes de collections exclusives,
                            chacune incarnant une vision distincte de l&apos;excellence horlogère.
                        </p>
                    </div>
                </div>
            </div>

            {/* Collections Grid */}
            <CollectionsGrid collections={collections} />
        </div>
    );
}