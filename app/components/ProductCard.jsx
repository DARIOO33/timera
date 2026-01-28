'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            sku: product.sku,
        });
    };

    return (
        <Link href={`/products/${product._id}`} className="group block">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#12362A]/10">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Image
                        src={product.images[0] || 'https://via.placeholder.com/400x400'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Collection Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-[#0E2B1F]/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                            {product.collection}
                        </span>
                    </div>

                    {/* Stock Status */}
                    {product.stock <= 5 && product.stock > 0 && (
                        <div className="absolute top-4 right-4">
                            <span className="bg-[#D4AF37] text-[#0E2B1F] text-xs font-medium px-3 py-1 rounded-full shadow">
                                Plus que {product.stock} en stock
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-[#0E2B1F] line-clamp-2 group-hover:text-[#12362A] transition-colors">
                            {product.name}
                        </h3>
                    </div>

                    <p className="text-sm text-[#12362A] mb-3">
                        Réf: {product.sku}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <span className="text-lg font-semibold text-[#0E2B1F]">
                                {product.price} TND
                            </span>
                            {product.stock <= 0 && (
                                <p className="text-sm text-red-500 mt-1">Rupture de stock</p>
                            )}
                        </div>

                        <div className="text-sm text-[#12362A]">
                            {product.stock} disponible{product.stock !== 1 ? 's' : ''}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className="w-full group inline-flex items-center justify-center bg-[#0E2B1F] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#12362A] transition-all duration-300 shadow hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0E2B1F]"
                    >
                        <ShoppingBag className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                        <span>Ajouter au panier</span>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;