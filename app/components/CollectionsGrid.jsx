// app/components/CollectionsGrid.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CollectionsGrid = ({ collections }) => {
    const collectionData = [
        {
            id: 'inox',
            title: 'Collection Inox',
            description: 'Modernité et durabilité en acier inoxydable',
            count: collections.inox.length,
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop',
            featured: collections.inox[0]?.images[0] || 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w-800'
        },
        {
            id: 'classique',
            title: 'Collection Classique',
            description: 'Élégance intemporelle et artisanat traditionnel',
            count: collections.classique.length,
            image: 'https://images.unsplash.com/photo-1547996160-81f58f6e6e68?w=800&auto=format&fit=crop',
            featured: collections.classique[0]?.images[0] || 'https://images.unsplash.com/photo-1547996160-81f58f6e6e68?w=800'
        },
        {
            id: 'sport',
            title: 'Collection Sport',
            description: 'Performance et robustesse pour les actifs',
            count: collections.sport.length,
            image: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&auto=format&fit=crop',
            featured: collections.sport[0]?.images[0] || 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800'
        }
    ];

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collectionData.map((collection) => (
                        <Link
                            key={collection.id}
                            href={`/collections/${collection.id}`}
                            className="group block"
                        >
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={collection.featured}
                                        alt={collection.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="text-white">
                                            <div className="text-sm text-amber-300 font-medium mb-1">
                                                {collection.count} modèles
                                            </div>
                                            <h3 className="text-2xl font-serif font-semibold">
                                                {collection.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600 mb-4">
                                        {collection.description}
                                    </p>
                                    <div className="flex items-center text-amber-600 font-medium">
                                        <span>Explorer la collection</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollectionsGrid;