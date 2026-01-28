'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const FeaturedCollections = () => {
    const collections = [
        {
            id: 1,
            title: 'Collection Inox',
            subtitle: 'Robuste & Moderne',
            description: 'Des montres en acier inoxydable, conçues pour un usage quotidien avec un style urbain et durable.',
            image: 'https://res.cloudinary.com/dizjoy6v5/image/upload/v1769431371/Photo_12-1-2026_4_11_53_PM_1_fn7rrx.png',
            count: 2,
            label: 'Best Choice',
            href: '/collections/inox'
        },
        {
            id: 2,
            title: 'Collection Classique',
            subtitle: 'Élégance Intemporelle',
            description: 'Montres raffinées au design élégant, idéales pour le travail, les occasions et les cadeaux.',
            image: 'https://res.cloudinary.com/dizjoy6v5/image/upload/v1769431371/Photo_12-1-2026_4_01_35_PM_skte9q.png',
            count: 1,
            label: 'Élégant',
            href: '/collections/classique'
        },
        {
            id: 3,
            title: 'Collection Sport',
            subtitle: 'Performance & Style',
            description: 'Des montres sportives pensées pour les esprits actifs. Résistance, précision et caractère.',
            image: 'https://res.cloudinary.com/dizjoy6v5/image/upload/v1769431371/Photo_12-1-2026_4_01_35_PM_skte9q.png',
            count: 0,
            label: 'Bientôt disponible',
            disabled: true,
            href: '/collections/sport'
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0E2B1F] mb-4">
                        Nos Collections
                    </h2>
                    <p className="text-[#12362A] max-w-2xl mx-auto text-lg">
                        Découvrez nos trois lignes de collections, chacune incarnant une vision distincte de l&apos;excellence horlogère.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection) => {
                        const isDisabled = collection.disabled;

                        return (
                            <Link
                                key={collection.id}
                                href={isDisabled ? '#' : collection.href}
                                className={`group block ${isDisabled ? 'pointer-events-none opacity-80' : ''}`}
                            >
                                <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#12362A]/10">

                                    {/* IMAGE */}
                                    <div className="relative aspect-square overflow-hidden">
                                        <Image
                                            src={collection.image}
                                            alt={collection.title}
                                            fill
                                            className={`object-cover transition-transform duration-700 
              ${isDisabled ? 'grayscale' : 'group-hover:scale-110'}`}
                                        />

                                        {/* Gradient overlay - changed to green gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2B1F]/60 via-[#12362A]/30 to-transparent" />

                                        {/* Subtitle */}
                                        {collection.subtitle && (
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <p className="text-sm uppercase tracking-widest opacity-90">
                                                    {collection.subtitle}
                                                </p>
                                            </div>
                                        )}

                                        {/* Label badge - changed to gold */}
                                        {collection.label && (
                                            <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full shadow
                                                ${isDisabled
                                                    ? 'bg-gray-400 text-white'
                                                    : 'bg-[#D4AF37] text-[#0E2B1F]'
                                                }`}>
                                                {collection.label}
                                            </span>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className={`text-xl font-serif font-semibold transition-colors
                                                ${isDisabled
                                                    ? 'text-[#12362A]'
                                                    : 'text-[#0E2B1F] group-hover:text-[#D4AF37]'
                                                }`}>
                                                {collection.title}
                                            </h3>

                                            {collection.count > 0 && (
                                                <span className="text-xs text-[#12362A] bg-[#12362A]/10 px-3 py-1 rounded-full">
                                                    {collection.count} modèle{collection.count > 1 && 's'}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-[#12362A] text-sm mb-5 leading-relaxed">
                                            {collection.description}
                                        </p>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between">
                                            {!isDisabled ? (
                                                <div className="flex items-center text-[#D4AF37] font-medium group-hover:text-[#C8A24A] transition-colors">
                                                    <span>Découvrir</span>
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            ) : (
                                                <span className="text-sm text-[#12362A]/60 italic">
                                                    Bientôt disponible
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;