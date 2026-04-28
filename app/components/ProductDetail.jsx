'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { fbPixel } from '@/app/lib/fpixel';
import {
    ShoppingBag,
    ChevronLeft,
    Check,
    ArrowLeft,
    Package,
    Clock
} from 'lucide-react';

const ProductDetail = ({ product }) => {
    const { addToCart, openCart } = useCart();
    const router = useRouter();

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [specs, setSpecs] = useState([]);
    const [loading, setLoading] = useState(false);

    const collectionNames = {
        inox: 'Inox',
        classique: 'Classique',
        sport: 'Sport'
    };

    // 🔥 VIEW CONTENT (IMPORTANT FOR META)
    useEffect(() => {
        if (!product) return;

        fbPixel.track("ViewContent", {
            content_ids: [product._id],
            content_type: "product",
            value: product.price,
            currency: "TND",
        });
    }, [product]);

    // specs safe parsing
    useEffect(() => {
        if (product?.specs) {
            setSpecs(product.specs.split("\n"));
        }
    }, [product]);

    // ADD TO CART + PIXEL
    const handleAddToCart = () => {
        fbPixel.track("AddToCart", {
            content_ids: [product._id],
            content_type: "product",
            value: product.price,
            currency: "TND",
        });

        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity,
            sku: product.sku,
        });

        openCart();
    };

    // BUY NOW
    const handleBuyNow = () => {
        setLoading(true);

        setTimeout(() => {
            handleAddToCart();
            router.push("/checkout");
        }, 400);
    };

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

    if (loading) {
        return (
            <div className="h-96 w-full flex items-center justify-center bg-black/70">
                <span className="text-white text-xl font-semibold">
                    Loading...
                </span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">

            {/* Breadcrumb */}
            <div className="bg-[#12362A]/5 py-4">
                <div className="container mx-auto px-4 flex items-center space-x-2 text-sm">
                    <Link href="/" className="text-[#12362A]">Accueil</Link>
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                    <span className="text-[#0E2B1F]">{product.name}</span>
                </div>
            </div>

            {/* BACK */}
            <div className="lg:hidden px-4 pt-4">
                <Link href="/collections" className="flex items-center">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Retour
                </Link>
            </div>

            {/* MAIN */}
            <div className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-10">

                {/* IMAGES */}
                <div>
                    <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex gap-3 mt-4">
                        {product.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={`w-16 h-16 border rounded ${selectedImage === i ? 'border-black' : ''}`}
                            >
                                <Image src={img} width={64} height={64} alt="" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* INFO */}
                <div>

                    <h1 className="text-3xl font-bold mb-2">
                        {product.name}
                    </h1>

                    <p className="mb-4 text-gray-500">
                        Ref: {product.sku}
                    </p>

                    <div className="text-2xl font-bold mb-4">
                        {product.price} TND
                    </div>

                    {/* STOCK */}
                    <div className="mb-4">
                        <span className="text-green-600">
                            {product.stock > 0 ? "In stock" : "Out of stock"}
                        </span>
                    </div>

                    {/* QTY */}
                    <div className="flex items-center gap-3 mb-6">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-3 mb-6">

                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-6 py-3 flex-1"
                        >
                            <ShoppingBag className="inline w-5 h-5 mr-2" />
                            Add to cart
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="border px-6 py-3 flex-1"
                        >
                            Buy now
                        </button>

                    </div>

                    {/* FEATURES */}
                    <div className="space-y-3">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-center gap-3">
                                {f.icon}
                                <div>
                                    <p className="font-medium">{f.title}</p>
                                    <p className="text-sm text-gray-500">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SPECS */}
                    <ul className="mt-6 space-y-2">
                        {specs.map((s, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                {s}
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
