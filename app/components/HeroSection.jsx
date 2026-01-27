// app/components/HeroSection.js
'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ArrowRight, Clock, Shield, Truck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSection = () => {
    // const swiperRef = useRef(null);

    // Product images
    const products = [
        {
            id: 1,
            image: 'https://res.cloudinary.com/dizjoy6v5/image/upload/v1769431371/Photo_12-1-2026_4_11_53_PM_1_fn7rrx.png',
            name: 'Édition Classique',
            collection: 'Collection Héritage',
            badge: 'Nouveau',
        },
        {
            id: 2,
            image: 'https://res.cloudinary.com/dizjoy6v5/image/upload/v1769431371/Photo_12-1-2026_4_11_53_PM_twrbrz.png',
            name: 'Montre Sport Luxe',
            collection: 'Collection Performance',
            badge: 'Nouveau',
        },
        {
            id: 3,
            image: 'https://res.cloudinary.com/dizjoy6v5/image/upload/v1769431371/Photo_12-1-2026_4_01_35_PM_skte9q.png',
            name: 'Chronographe Élite',
            collection: 'Collection Maîtres',
            badge: 'Nouveau',
        },
    ];

    const features = [
        {
            icon: <Clock className="w-5 h-5" />,
            title: 'Mouvement Suisse',
            desc: 'Précision certifiée COSC',
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: 'Garantie 5 ans',
            desc: 'Service après-vente exclusif',
        },
        {
            icon: <Truck className="w-5 h-5" />,
            title: 'Livraison 24h',
            desc: 'Emballage cadeau inclus',
        },
    ];

    return (
        <section className="relative bg-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>

            <div className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
                {/* Mobile & Tablet: Image First, Text Second */}
                <div className="block lg:hidden">
                    {/* Image Slider - Top on Mobile */}
                    <div className="mb-8">
                        <div className="relative max-w-md mx-auto">
                            {/* Collection Badge */}
                            <div className="flex justify-center mb-4">
                                <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-sm font-medium tracking-wider">COLLECTION 2026</span>
                                </div>
                            </div>

                            {/* Swiper */}
                            <div className="relative">
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    loop={true}
                                    autoplay={{
                                        delay: 4000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                        bulletClass: 'swiper-pagination-bullet !bg-gray-300 !w-2 !h-2 !opacity-100',
                                        bulletActiveClass: '!bg-amber-500 !w-6'
                                    }}
                                    className="rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    {products.map((product) => (
                                        <SwiperSlide key={product.id}>
                                            <div className="relative aspect-square bg-gray-50">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="100vw"
                                                    priority={product.id === 1}
                                                />

                                                {/* Product Badge */}
                                                <div className="absolute top-4 left-4">
                                                    <div className="bg-black/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                                                        {product.badge}
                                                    </div>
                                                </div>

                                                {/* Product Info */}
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                                                    <div className="text-white">
                                                        <div className="text-sm text-amber-300 font-medium mb-1">
                                                            {product.collection}
                                                        </div>
                                                        <h3 className="text-xl font-serif font-semibold">
                                                            {product.name}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Pagination */}
                                <div className="swiper-pagination !relative !bottom-0 !mt-4"></div>
                            </div>
                        </div>
                    </div>

                    {/* Text Content - Below Image on Mobile */}
                    <div className="text-center px-2">
                        <h1 className="font-serif text-3xl text-gray-900 mb-4">
                            Le Temps, <br /> Sélectionné avec Exigence
                        </h1>

                        <p className="text-gray-600 mb-8">
                            Une sélection exigeante de montres originales,
                            issues de marques reconnues, choisies pour leur
                            fiabilité, leur design et leur excellent rapport
                            qualité-prix.
                        </p>

                        {/* CTA Buttons - Centered on Mobile */}
                        <div className="flex flex-col gap-4 mb-8 max-w-sm mx-auto">
                            <Link
                                href="/collections"
                                className="group inline-flex items-center justify-center bg-black text-white px-6 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <span className="mr-3">Explorer la sélection</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>


                        </div>


                    </div>
                </div>

                {/* Desktop: Side by Side Layout */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                    {/* Left Side - Text & CTA */}
                    <div className="space-y-8">
                        <h1 className="font-serif text-6xl text-gray-900">
                            Le Temps, <br /> Sélectionné avec Exigence
                        </h1>

                        <p className="text-xl text-gray-600">
                            Chez TimEra, nous sélectionnons des montres
                            authentiques issues de marques reconnues,
                            choisies pour leur précision, leur élégance
                            intemporelle et leur fiabilité au quotidien.
                        </p>


                        {/* CTA Buttons */}
                        <div className="flex gap-6">
                            <Link
                                href="/collections"
                                className="group inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                            >
                                <span className="mr-3">Explorer la sélection</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>


                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={0}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                                pagination={{
                                    clickable: true,
                                    bulletClass: 'swiper-pagination-bullet !bg-gray-300 !w-2 !h-2 !opacity-100',
                                    bulletActiveClass: '!bg-amber-500 !w-8'
                                }}
                                className="rounded-2xl overflow-hidden shadow-2xl"
                            >
                                {products.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <div className="relative aspect-square bg-gray-50">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                sizes="50vw"
                                                priority={product.id === 1}
                                            />

                                            {/* Product Badge */}
                                            <div className="absolute top-6 left-6">
                                                <div className="bg-black/80 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
                                                    {product.badge}
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8">
                                                <div className="text-white">
                                                    <div className="text-base text-amber-300 font-medium mb-2">
                                                        {product.collection}
                                                    </div>
                                                    <h3 className="text-2xl font-serif font-semibold">
                                                        {product.name}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Custom Navigation Buttons with Icons */}
                            <button
                                className="swiper-button-prev absolute left-6 top-1/2 -translate-y-1/2 z-10
    w-14 h-14 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center
    shadow-xl hover:shadow-2xl hover:scale-110 hover:bg-white transition-all duration-300 group"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:text-black" />
                            </button>

                            <button
                                className="swiper-button-next absolute right-6 top-1/2 -translate-y-1/2 z-10
    w-14 h-14 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center
    shadow-xl hover:shadow-2xl hover:scale-110 hover:bg-white transition-all duration-300 group"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-800 group-hover:text-black" />
                            </button>

                            {/* Pagination */}
                            <div className="swiper-pagination !relative !bottom-0 !mt-6"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;