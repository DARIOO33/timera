'use client';

import Link from 'next/link';
import { Clock, Facebook, Instagram, Twitter, Mail, MapPin, Phone, Shield, Truck, CreditCard } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const handleSubmit = () => {
        alert("Soon")
    }
    return (
        <footer className="bg-[#0E2B1F] text-white">
            <div className="container mx-auto px-4 py-16">
                {/* Brand Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 pb-12 border-b border-[#12362A]">
                    <div className="space-y-4 max-w-lg">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Clock className="w-10 h-10 text-[#D4AF37]" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#C8A24A] rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-3xl font-semibold text-white">TimEra</span>
                                <span className="text-sm text-[#D4AF37] tracking-widest uppercase">
                                    Horlogerie d'exception
                                </span>
                            </div>
                        </div>
                        <p className="text-white/80 text-base leading-relaxed">
                            L&apos;excellence horlogère réinventée. Montres de luxe sélectionnées avec exigence
                            pour ceux qui apprécient la précision et l&apos;élégance intemporelle.
                        </p>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-[#12362A]/30">
                            <Shield className="w-8 h-8 text-[#D4AF37]" />
                            <span className="text-sm font-medium text-white">Garantie 5 ans</span>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-[#12362A]/30">
                            <Truck className="w-8 h-8 text-[#D4AF37]" />
                            <span className="text-sm font-medium text-white">Livraison 24h</span>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-[#12362A]/30">
                            <CreditCard className="w-8 h-8 text-[#D4AF37]" />
                            <span className="text-sm font-medium text-white">Paiement sécurisé</span>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content - Now 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                    {/* Navigation */}
                    <div>
                        <h3 className="font-serif text-xl font-semibold mb-6 pb-2 border-b border-[#D4AF37]/20 text-white">
                            Collections
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Collection Inox', href: '/collections/inox' },
                                { label: 'Collection Classique', href: '/collections/classique' },
                                { label: 'Collection Sport', href: '/collections/sport' },
                                { label: 'Pour Hommes', href: '/collections/hommes' },
                                { label: 'Pour Femmes', href: '/collections/femmes' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300 text-sm block py-1"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-serif text-xl font-semibold mb-6 pb-2 border-b border-[#D4AF37]/20 text-white">
                            L&apos;entreprise
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'À propos', href: '/about' },
                                { label: 'Notre histoire', href: '/story' },
                                { label: 'Service client', href: '/support' },
                                { label: 'FAQ', href: '/faq' },
                                { label: 'Retours & Échanges', href: '/returns' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300 text-sm block py-1"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="font-serif text-xl font-semibold mb-6 pb-2 border-b border-[#D4AF37]/20 text-white">
                            Contactez-nous
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                <span className="text-white/80 text-sm">Djerba , Mednine , Tunisie</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                                <span className="text-white/80 text-sm">+216 </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                                <a href="mailto:contact@timera.tn" className="text-white/80 hover:text-[#D4AF37] transition-colors text-sm">

                                </a>
                            </div>

                            <div className="pt-4">
                                <h4 className="font-medium mb-4 text-white">Suivez-nous</h4>
                                <div className="flex space-x-3">
                                    {[
                                        { Icon: Facebook, label: 'Facebook', href: "https://www.instagram.com/timera.tn/" },
                                        { Icon: Instagram, label: 'Instagram', href: "https://www.instagram.com/timera.tn/" },
                                    ].map(({ Icon, label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            className="w-10 h-10 bg-[#12362A] hover:bg-[#D4AF37] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                                            aria-label={label}
                                        >
                                            <Icon className="w-5 h-5 text-white group-hover:text-[#0E2B1F]" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-r from-[#12362A] to-[#0E2B1F] rounded-2xl p-8 mb-12 border border-[#12362A]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-serif text-xl font-semibold mb-2 text-white">Restez informé</h3>
                            <p className="text-white/80 text-sm">
                                Inscrivez-vous pour recevoir nos nouvelles collections et offres exclusives.
                            </p>
                        </div>
                        <div className="flex w-full md:w-auto gap-3">
                            <input
                                type="email"
                                placeholder="Votre adresse email"
                                className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                            />
                            <button
                                className="px-6 py-3 bg-[#D4AF37] text-[#0E2B1F] font-medium rounded-lg hover:bg-[#C8A24A] transition-colors"
                                onClick={handleSubmit}
                            >
                                S&apos;inscrire
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-[#12362A]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
                        <div>
                            © {currentYear} TimEra.tn. Tous droits réservés.
                        </div>
                        <div className="flex items-center gap-6">
                            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
                                Conditions générales
                            </Link>
                            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
                                Confidentialité
                            </Link>
                            <Link href="/sitemap" className="hover:text-[#D4AF37] transition-colors">
                                Plan du site
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;