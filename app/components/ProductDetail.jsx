// app/components/ProductDetail.js
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

    const handleBuyNow = () => {
        handleAddToCart();
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

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-gray-600 hover:text-amber-600">
                            Accueil
                        </Link>
                        <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                        <Link href="/collections" className="text-gray-600 hover:text-amber-600">
                            Collections
                        </Link>
                        <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                        <Link href={`/collections/${product.collection}`} className="text-gray-600 hover:text-amber-600">
                            {collectionNames[product.collection]}
                        </Link>
                        <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                        <span className="text-gray-900 font-medium truncate max-w-xs">
                            {product.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Back Button - Mobile */}
            <div className="lg:hidden px-4 pt-4">
                <Link
                    href={`/collections/${product.collection}`}
                    className="inline-flex items-center text-gray-600 hover:text-gray-900"
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
                        <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square mb-4 relative">
                            <Image
                                src={product.images[selectedImage] || 'https://via.placeholder.com/800x800'}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Badges */}
                            <div className="absolute top-4 left-4">
                                <div className="bg-black/80 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
                                    {collectionNames[product.collection]}
                                </div>
                            </div>

                            {product.stock <= 5 && (
                                <div className="absolute top-4 right-4">
                                    <div className="bg-amber-500 text-white text-sm font-medium px-4 py-2 rounded-full">
                                        Plus que {product.stock} en stock
                                    </div>
                                </div>
                            )}

                            {/* Quick Actions */}
                            <div className="absolute top-4 right-4 space-y-2">
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all ${isWishlisted
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white/90 text-gray-700 hover:bg-white'
                                        }`}
                                >
                                    <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                                <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm hover:bg-white transition-all">
                                    <Share2 className="w-6 h-6 text-gray-700" />
                                </button>
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
                                            ? 'border-amber-500'
                                            : 'border-gray-200 hover:border-gray-300'
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
                        <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full mb-4">
                            <span className="text-sm font-medium">COLLECTION {collectionNames[product.collection].toUpperCase()}</span>
                        </div>

                        {/* Product Title */}
                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
                            {product.name}
                        </h1>

                        {/* SKU */}
                        <div className="text-gray-500 mb-6">
                            Référence: <span className="font-medium">{product.sku}</span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="text-3xl md:text-4xl font-bold text-gray-900">
                                {product.price} TND
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                TVA incluse • Paiement à la livraison disponible
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className={`mb-6 p-4 rounded-lg ${product.stock > 0 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            <div className="flex items-center text-gray-900">
                                <Check className="w-5 h-5 mr-2" />
                                <span className="font-medium ">
                                    {product.stock > 0
                                        ? `${product.stock} disponible${product.stock > 1 ? 's' : ''} en stock`
                                        : 'Rupture de stock'}
                                </span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-8 text-gray-900">
                            <label className="block text-gray-700 mb-2">Quantité</label>
                            <div className="flex items-center max-w-xs">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 border border-gray-300 rounded-l-lg flex items-center justify-center hover:bg-gray-50"
                                    disabled={quantity <= 1}
                                >
                                    <span className="text-xl">−</span>
                                </button>
                                <div className="w-16 h-12 border-t border-b border-gray-300 flex items-center justify-center">
                                    <span className="text-lg font-medium">{quantity}</span>
                                </div>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 border border-gray-300 rounded-r-lg flex items-center justify-center hover:bg-gray-50"
                                    disabled={product.stock > 0 && quantity >= product.stock}
                                >
                                    <span className="text-xl">+</span>
                                </button>
                            </div>
                            {product.stock > 0 && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Maximum: {product.stock} unité{product.stock > 1 ? 's' : ''}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                                className="flex-1 group inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingBag className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                                <span>Ajouter au panier</span>
                            </button>

                            <button
                                onClick={handleBuyNow}
                                disabled={product.stock <= 0}
                                className="flex-1 inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Acheter maintenant
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-white text-amber-600 rounded-lg">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                                        <p className="text-sm text-gray-500">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                                Description du produit
                            </h3>
                            <div className="prose max-w-none text-gray-600">
                                <p>
                                    La montre {product.name} incarne l&apos;excellence de la collection {collectionNames[product.collection]}.
                                    Conçue avec des matériaux de première qualité et une attention particulière aux détails,
                                    cette pièce allie esthétique et fonctionnalité.
                                </p>

                                <h4 className="font-medium text-gray-900 mt-6 mb-3">Caractéristiques techniques:</h4>
                                <ul className="space-y-2">
                                    {specs.map((s) => {
                                        return (
                                            <li className="flex items-center" key={s}>
                                                <Check className="w-5 h-5 text-green-500 mr-2" />
                                                <span> {s}</span>
                                            </li>
                                        )
                                    })}


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="font-serif text-3xl text-gray-900 mb-2">
                                Produits similaires
                            </h2>
                            <p className="text-gray-600">
                                Découvrez d&apos;autres modèles de la même collection
                            </p>
                        </div>
                        <Link
                            href={`/collections/${product.collection}`}
                            className="text-amber-600 hover:text-amber-700 font-medium"
                        >
                            Voir toute la collection →
                        </Link>
                    </div>

                    {/* Related products would be fetched here */}
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            Chargement des produits similaires...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;