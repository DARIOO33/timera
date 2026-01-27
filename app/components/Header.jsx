// app/components/Header.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import {
    ShoppingBag,
    Menu,
    X,
    Search,
    User,
    ChevronDown,
    Clock
} from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { totalItems, openCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Collections', href: '/collections' },
        { label: 'Hommes', href: '/collections/hommes' },
        { label: 'Femmes', href: '/collections/femmes' },
        { label: 'Marques', href: '/marques' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
                    : 'bg-white border-b border-gray-100'
                    }`}
            >


                {/* Main Header */}
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="relative">
                                <Clock className="w-8 h-8 text-amber-600" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-500 rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl font-semibold text-gray-900 tracking-tight">
                                    TimEra
                                </span>
                                <span className="text-xs text-gray-500 tracking-widest uppercase">
                                    Horlogerie d'exception
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-700 hover:text-amber-600 font-medium text-sm tracking-wide transition-colors group relative py-2"
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <button className="hidden md:flex items-center justify-center w-10 h-10 hover:bg-gray-50 rounded-full transition-colors">
                                <Search className="w-5 h-5 text-gray-600" />
                            </button>



                            {/* Cart */}
                            <button
                                onClick={openCart}
                                className="relative flex items-center justify-center w-10 h-10 hover:bg-gray-50 rounded-full transition-colors group"
                            >
                                <ShoppingBag className="w-5 h-5 text-gray-600" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center px-1">
                                        {totalItems}
                                    </span>
                                )}
                                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Panier
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
                        <div className="container mx-auto px-4 py-6">
                            <div className="flex flex-col space-y-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-gray-700 hover:text-amber-600 py-3 text-lg font-medium transition-colors border-b border-gray-50 last:border-b-0"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t border-gray-100 space-y-4">

                                    <button className="flex items-center space-x-3 text-gray-700 hover:text-amber-600 py-2 w-full text-left">
                                        <Search className="w-5 h-5" />
                                        <span>Rechercher</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Add padding to prevent content from being hidden under fixed header */}
            <div className=" bg-white h-20 lg:h-16"></div>
        </>
    );
};

export default Header;