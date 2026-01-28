'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import {
    ShoppingBag,
    Heart,
    Share2,
    Truck,
    Shield,
    Clock,
    ChevronLeft,
    Star,
    Check,
    ArrowLeft,
    Package,
    RotateCcw
} from 'lucide-react';

const ProductDetail = ({ product }) => {
    const { addToCart, openCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [specs, setSpecs] = useState([])
    const [loading, setLoading] = useState(false)
    const handleAddToCart = () => {
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity,
            sku: product.sku,
        });
        openCart();
    };
    const router = useRouter()
    const handleBuyNow = () => {
        setLoading(true)
        setTimeout(() => {
            handleAddToCart();
            router.push("/checkout")
        }, 400)
        // Could navigate directly to checkout here
    };

    useEffect(() => {
        setSpecs(product.specs.split("\n"))
    }, [])

    const features = [
        {
            icon: <Package className="w-5 h-5" />,
            title: 'Livraison Rapide',
            desc: 'Livraison offerte en Tunisie'
        },
        {
            icon: <Clock className="w-5 h-5" />,
            title: 'Support 24/7',
            desc: 'Assistance client dédiée'
        }
    ];

    const collectionNames = {
        inox: 'Inox',
        classique: 'Classique',
        sport: 'Sport'
    };

    if (loading) {
        return (
            <div className="h-96 w-full flex items-center justify-center bg-black/70">
                <span className="text-white text-xl font-semibold">Loading...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-[#12362A]/5 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-[#12362A] hover:text-[#D4AF37] transition-colors">
                            Accueil
                        </Link>
                        <ChevronLeft className="w-4 h-4 text-[#12362A]/40 rotate-180" />
                        <Link href="/collections" className="text-[#12362A] hover:text-[#D4AF37] transition-colors">
                            Collections
                        </Link>
                        <ChevronLeft className="w-4 h-4 text-[#12362A]/40 rotate-180" />
                        <Link href={`/collections/${product.collection}`} className="text-[#12362A] hover:text-[#D4AF37] transition-colors">
                            {collectionNames[product.collection]}
                        </Link>
                        <ChevronLeft className="w-4 h-4 text-[#12362A]/40 rotate-180" />
                        <span className="text-[#0E2B1F] font-medium truncate max-w-xs">
                            {product.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Back Button - Mobile */}
            <div className="lg:hidden px-4 pt-4">
                <Link
                    href={`/collections/${product.collection}`}
                    className="inline-flex items-center text-[#12362A] hover:text-[#0E2B1F] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Retour
                </Link>
            </div>

            {/* Product Main Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div>
                        {/* Main Image */}
                        <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square mb-4 relative border border-[#12362A]/10">
                            <Image
                                src={product.images[selectedImage] || 'https://via.placeholder.com/800x800'}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Badges */}
                            <div className="absolute top-4 left-4">
                                <div className="bg-[#0E2B1F]/90 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
                                    {collectionNames[product.collection]}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        {product.images.length > 1 && (
                            <div className="flex space-x-4 overflow-x-auto py-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                            ? 'border-[#D4AF37]'
                                            : 'border-gray-200 hover:border-[#12362A]/30'
                                            }`}
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={image}
                                                alt={`${product.name} - vue ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Collection Badge */}
                        <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 text-[#C8A24A] px-4 py-2 rounded-full mb-4 border border-[#D4AF37]/20">
                            <span className="text-sm font-medium tracking-wider">
                                COLLECTION {collectionNames[product.collection].toUpperCase()}
                            </span>
                        </div>

                        {/* Product Title */}
                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0E2B1F] mb-4">
                            {product.name}
                        </h1>

                        {/* SKU */}
                        <div className="text-[#12362A] mb-6">
                            Référence: <span className="font-medium">{product.sku}</span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="text-3xl md:text-4xl font-bold text-[#0E2B1F]">
                                {product.price} TND
                            </div>
                            <div className="text-sm text-[#12362A] mt-1">
                                TVA incluse • Paiement à la livraison disponible
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className={`mb-6 p-4 rounded-lg ${product.stock > 0
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'}`}>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 mr-2" />
                                <span className="font-medium">
                                    {product.stock > 0
                                        ? `${product.stock} disponible${product.stock > 1 ? 's' : ''} en stock`
                                        : 'Rupture de stock'}
                                </span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-8">
                            <label className="block text-[#12362A] mb-2">Quantité</label>
                            <div className="flex items-center max-w-xs">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 border border-[#12362A]/30 rounded-l-lg flex items-center justify-center hover:bg-[#12362A]/5 transition-colors text-[#12362A]"
                                    disabled={quantity <= 1}
                                >
                                    <span className="text-xl">−</span>
                                </button>
                                <div className="w-16 h-12 border-t border-b border-[#12362A]/30 flex items-center justify-center">
                                    <span className="text-lg font-medium text-[#0E2B1F]">{quantity}</span>
                                </div>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 border border-[#12362A]/30 rounded-r-lg flex items-center justify-center hover:bg-[#12362A]/5 transition-colors text-[#12362A]"
                                    disabled={product.stock > 0 && quantity >= product.stock}
                                >
                                    <span className="text-xl">+</span>
                                </button>
                            </div>
                            {product.stock > 0 && (
                                <p className="text-sm text-[#12362A] mt-2">
                                    Maximum: {product.stock} unité{product.stock > 1 ? 's' : ''}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                                className="flex-1 group inline-flex items-center justify-center bg-[#0E2B1F] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#12362A] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingBag className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                                <span>Ajouter au panier</span>
                            </button>

                            <button
                                onClick={handleBuyNow}
                                disabled={product.stock <= 0}
                                className="flex-1 inline-flex items-center justify-center border-2 border-[#12362A] text-[#12362A] px-8 py-4 rounded-lg font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Acheter maintenant
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-[#12362A]/5 rounded-lg border border-[#12362A]/10">
                                    <div className="p-2 bg-white text-[#D4AF37] rounded-lg">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-[#0E2B1F]">{feature.title}</h4>
                                        <p className="text-sm text-[#12362A]">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="border-t border-[#12362A]/20 pt-8">
                            <h3 className="font-serif text-xl font-semibold text-[#0E2B1F] mb-4">
                                Description du produit
                            </h3>
                            <div className="prose max-w-none text-[#12362A]">
                                <p>
                                    La montre {product.name} incarne l&apos;excellence de la collection {collectionNames[product.collection]}.
                                    Conçue avec des matériaux de première qualité et une attention particulière aux détails,
                                    cette pièce allie esthétique et fonctionnalité.
                                </p>

                                <h4 className="font-medium text-[#0E2B1F] mt-6 mb-3">Caractéristiques techniques:</h4>
                                <ul className="space-y-2">
                                    {specs.map((s) => (
                                        <li className="flex items-center" key={s}>
                                            <Check className="w-5 h-5 text-green-500 mr-2" />
                                            <span> {s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="bg-[#12362A]/5 py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="font-serif text-3xl text-[#0E2B1F] mb-2">
                                Produits similaires
                            </h2>
                            <p className="text-[#12362A]">
                                Découvrez d&apos;autres modèles de la même collection
                            </p>
                        </div>
                        <Link
                            href={`/collections/${product.collection}`}
                            className="text-[#D4AF37] hover:text-[#C8A24A] font-medium transition-colors"
                        >
                            Voir toute la collection →
                        </Link>
                    </div>

                    {/* Related products would be fetched here */}
                    <div className="text-center py-12">
                        <div className="text-[#12362A]">
                            Chargement des produits similaires...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;