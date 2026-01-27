// app/components/CartSidebar.js
'use client';

import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

const CartSidebar = () => {
    const { items, totalItems, totalPrice, isOpen, closeCart, removeFromCart, updateQuantity } = useCart();

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={closeCart}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <ShoppingBag className="w-6 h-6 text-gray-700" />
                        <h2 className="text-xl font-serif font-semibold text-gray-900">
                            Votre Panier
                        </h2>
                        {totalItems > 0 && (
                            <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                                {totalItems} article{totalItems > 1 ? 's' : ''}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 overscroll-contain">

                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Votre panier est vide
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Ajoutez des pièces d'exception à votre collection
                            </p>
                            <button
                                onClick={closeCart}
                                className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                Découvrir les collections
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-start space-x-4 pb-6 border-b border-gray-100">
                                    {/* Product Image */}
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={80}
                                                height={80}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                <ShoppingBag className="w-8 h-8 text-gray-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                {item.sku && (
                                                    <p className="text-sm text-gray-500 mt-1">Ref: {item.sku}</p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-4 py-2 text-gray-900 font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {(item.price * item.quantity).toFixed(2)} TND
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {item.price.toFixed(2)} TND par unité
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-gray-100 p-6">
                        {/* Order Summary */}
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Sous-total</span>
                                <span>{totalPrice.toFixed(2)} TND</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Livraison</span>
                                <span className="text-amber-600 font-medium">
                                    {totalPrice >= 500 ? 'OFFERTE' : '7.00 TND'}
                                </span>
                            </div>
                            <div className="pt-3 border-t border-gray-100">
                                <div className="flex justify-between text-lg font-semibold text-gray-900">
                                    <span>Total</span>
                                    <span>
                                        {totalPrice >= 500
                                            ? totalPrice.toFixed(2)
                                            : (totalPrice + 7).toFixed(2)}{' '}
                                        TND
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="space-y-3">
                            <Link
                                href="/checkout"
                                onClick={closeCart}
                                className="block bg-black text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                Commander maintenant
                            </Link>
                            <Link
                                href="/cart"
                                onClick={closeCart}
                                className="block border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                Voir le panier détaillé
                            </Link>
                            <button
                                onClick={closeCart}
                                className="text-gray-500 hover:text-gray-700 text-center py-3 w-full"
                            >
                                Continuer vos achats
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;