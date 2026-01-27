'use client';

import Link from 'next/link';
import { Clock, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Clock className="w-8 h-8 text-amber-500" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-500 rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl font-semibold">TimEra</span>
                                <span className="text-xs text-gray-400 tracking-widest uppercase">
                                    Horlogerie d'exception
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                            L&apos;excellence horlogère réinventée. Montres de luxe pour ceux qui apprécient la précision et l&apos;élégance intemporelle.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            {['Accueil', 'Collections', 'Hommes', 'Femmes', 'Notre Histoire'].map((item, i) => (
                                <li key={i}>
                                    <Link
                                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Service Client */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-4">Service Client</h3>
                        <ul className="space-y-2">
                            {['Contact', 'Livraison', 'Retours & Échanges', 'FAQ', 'Garantie'].map((item, i) => (
                                <li key={i}>
                                    <Link
                                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact + Social */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-4">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-amber-500" />
                                <span className="text-gray-400 text-sm">Tunis, Tunisie</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-amber-500" />
                                <span className="text-gray-400 text-sm">+216 12 345 678</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-amber-500" />
                                <span className="text-gray-400 text-sm">contact@timera.tn</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-medium mb-3">Suivez-nous</h4>
                            <div className="flex space-x-4">
                                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8"></div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
                    <div>
                        © {currentYear} TimEra.tn. Tous droits réservés.
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
