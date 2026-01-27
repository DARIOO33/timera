// app/components/CollectionProducts.js
'use client';

import ProductCard from '@/app/components/ProductCard';

const CollectionProducts = ({ products, collection }) => {
    if (products.length === 0) {
        return (
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-serif text-3xl text-gray-900 mb-4">
                        Aucun produit disponible
                    </h2>
                    <p className="text-gray-600">
                        Aucune montre n&apos;est disponible dans cette collection pour le moment.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">
                            Tous les modèles
                        </h2>
                        <p className="text-gray-600">
                            {products.length} produit{products.length > 1 ? 's' : ''} dans cette collection
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollectionProducts;