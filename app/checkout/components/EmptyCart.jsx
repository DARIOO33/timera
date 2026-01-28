import Link from 'next/link';
import { Lock, ShoppingBag } from 'lucide-react';

const EmptyCart = () => (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
            {/* Lock Icon with premium styling */}
            <div className="w-20 h-20 bg-gradient-to-br from-[#12362A]/10 to-[#0E2B1F]/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#12362A]/20">
                <Lock className="w-10 h-10 text-[#12362A]/50" />
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl font-semibold text-[#0E2B1F] mb-4">
                Votre panier est vide
            </h1>

            {/* Description */}
            <p className="text-[#12362A] mb-8 text-lg">
                Explorez nos collections exclusives pour découvrir des pièces d&apos;exception
            </p>

            {/* CTA Button */}
            <Link
                href="/collections"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-[#0E2B1F] to-[#12362A] text-white px-8 py-4 rounded-lg font-medium hover:from-[#12362A] hover:to-[#0E2B1F] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                <ShoppingBag className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Explorer les collections
            </Link>

            {/* Additional Option */}
            <div className="mt-6">
                <p className="text-[#12362A]/70 text-sm mb-3">Ou</p>
                <Link
                    href="/"
                    className="text-[#12362A] hover:text-[#D4AF37] transition-colors font-medium"
                >
                    Retour à l&apos;accueil
                </Link>
            </div>
        </div>
    </div>
);

export default EmptyCart;
