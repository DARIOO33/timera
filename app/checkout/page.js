// app/checkout/page.js
'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { ArrowLeft, Lock, Check, Truck, Shield } from 'lucide-react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const CheckoutPage = () => {
    const { items, totalPrice, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const localcart = typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("timera_cart")) || []
            : []
        setCart(typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("timera_cart")) || []
            : [])

        setTotal(localcart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }, [])

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        postal: '',
        email: '',
        notes: ''
    });

    const [errors, setErrors] = useState({});

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Nom requis';
        if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
        if (!formData.address.trim()) newErrors.address = 'Adresse requise';
        if (!formData.city.trim()) newErrors.city = 'Ville requise';
        if (!formData.postal.trim()) newErrors.postal = 'Code postal requis';

        // Phone validation (Tunisian)
        const phoneRegex = /^(\+216|00216)?[2-9][0-9]{7}$/;
        if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Numéro invalide';
        }

        // Email validation (optional)
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Generate order number
            const newOrderNumber = 'CMD-' + Date.now().toString().slice(-8);
            setOrderNumber(newOrderNumber);

            // Clear cart and show success
            clearCart();
            setOrderComplete(true);

        } catch (error) {
            console.error('Error:', error);
            alert('Une erreur est survenue');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Empty cart
    if (items.length === 0 && !orderComplete) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-medium text-gray-900 mb-4">
                        Votre panier est vide
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Ajoutez des produits pour continuer.
                    </p>
                    <Link
                        href="/collections"
                        className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Voir les collections
                    </Link>
                </div>
            </div>
        );
    }

    // Order complete
    if (orderComplete) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-medium text-gray-900 mb-3">
                            Commande confirmée
                        </h1>
                        <div className="text-lg text-amber-600 font-medium mb-8">
                            {orderNumber}
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total</span>
                                    <span className="font-medium text-gray-900">
                                        {(totalPrice + 7).toFixed(2)} TND
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Livraison: 7.00 TND
                                </div>
                            </div>
                        </div>

                        <div className="text-gray-600 text-sm mb-8">
                            Notre équipe vous contactera sous 24h.
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/collections"
                                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-center"
                            >
                                Continuer
                            </Link>
                            <Link
                                href="/"
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
                            >
                                Accueil
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <h1 className='text-gray-900 text-center font-extrabold font-serif py-3 text-3xl '>complétez votre commande</h1>
            <div className='px-4'>
                <Grid container spacing={2} >
                    <Grid size={{ xs: 12, md: 8 }}>
                        <form className="relative bg-white rounded-2xl p-6 shadow-lg space-y-5 ">
                            <p className="font-serif text-lg font-semibold text-gray-900">
                                Informations de livraison
                            </p>

                            {/* Full Name */}
                            <div className="py-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom complet <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex : Mohamed Ben Ali"
                                    className="text-gray-800 w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="py-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Numéro de téléphone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Ex : 22 123 456"
                                    className="text-gray-800 w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="py-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Ex : exemple@email.com"
                                    className="text-gray-800 w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Address */}
                            <div className="py-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Adresse <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Rue, immeuble, appartement…"
                                    className="text-gray-800 w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>

                            {/* City */}
                            <div className="py-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ville <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex : Tunis"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-800"
                                    required
                                />
                            </div>
                        </form>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <div className="sticky top-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-6">

                            {/* Header with enhanced styling */}
                            <div className="pb-4 border-b border-gray-200">
                                <h3 className="font-serif text-xl font-bold text-gray-900">
                                    Récapitulatif de la commande
                                </h3>
                            </div>

                            {/* Products with improved spacing and interaction */}
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                    >
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-lg object-cover border-2 border-gray-100 shadow-sm"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Quantité : {item.quantity}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                {(item.price * item.quantity).toFixed(2)} DT
                                            </p>
                                            {item.quantity > 1 && (
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {item.price.toFixed(2)} DT × {item.quantity}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing section with better visual separation */}
                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between items-center py-3 border-t border-gray-200">
                                    <p className="text-sm font-medium text-gray-700">
                                        Livraison
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        7.00 DT
                                    </p>
                                </div>

                                <div className="flex justify-between items-center py-4 border-t border-gray-200">
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">
                                            Total à payer
                                        </p>

                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {(total + 7).toFixed(2)} DT
                                    </p>
                                </div>
                            </div>

                            {/* Enhanced CTA button */}
                            <div className="pt-2">
                                <Link
                                    href="/checkout"
                                    className="block bg-black text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Commander maintenant
                                </Link>
                            </div>

                        </div>
                    </Grid>


                </Grid>
            </div>
        </div >
    );
};

export default CheckoutPage;