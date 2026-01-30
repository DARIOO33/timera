import Link from 'next/link';
import { ShieldCheck, Check } from 'lucide-react';

const OrderSuccess = ({ orderNumber, total, products, subtotal }) => (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
            {/* ✅ Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37]/20 to-[#C8A24A]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#D4AF37]/20">
                <Check className="w-10 h-10 text-[#D4AF37]" />
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl font-semibold text-[#0E2B1F] mb-3">
                Commande confirmée
            </h1>
            <div className="text-lg text-[#D4AF37] font-medium mb-8">
                {orderNumber}
            </div>

            {/* Products List */}
            <div className="bg-[#12362A]/5 rounded-2xl p-6 mb-8 text-left space-y-6 border border-[#12362A]/10">
                <h2 className="font-serif text-lg font-semibold text-[#0E2B1F] border-b border-[#12362A]/20 pb-3">
                    Détails de votre commande
                </h2>

                {products.map((product, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b border-[#12362A]/10 last:border-b-0 last:pb-0">
                        <div className="relative">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-16 h-16 object-cover rounded-lg border border-[#12362A]/10"
                            />
                            <span className="absolute -top-2 -right-2 bg-[#0E2B1F] text-white text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center">
                                {product.productQuantity}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-[#0E2B1F] font-medium text-sm">{product.productName}</h2>
                            <div className="text-[#12362A] text-xs mt-1">SKU: {product.productSku}</div>
                            <div className="text-[#0E2B1F] font-medium mt-1">
                                {product.productQuantity} × {product.productPrice.toFixed(2)} TND
                            </div>
                        </div>
                        <div className="font-semibold text-[#0E2B1F]">
                            {(product.totalPrice).toFixed(2)} TND
                        </div>
                    </div>
                ))}

                {/* Total */}
                <div className="pt-4 mt-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-[#12362A]">Sous-total</span>
                        <span className="font-medium text-[#0E2B1F]">{subtotal.toFixed(2)} TND</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#12362A]">Livraison</span>
                        <span className="text-[#0E2B1F] font-medium">7.00 TND</span>
                    </div>
                    <div className="flex justify-between mt-4 pt-4 border-t border-[#12362A]/20 font-semibold text-[#0E2B1F] text-lg">
                        <span>Total</span>
                        <span>{(subtotal + 7).toFixed(2)} TND</span>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            <div className="mb-8">
                <div className="flex items-center justify-center gap-2 text-[#12362A] mb-2">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-medium">Commande sécurisée</span>
                </div>
                <p className="text-[#12362A] text-sm">
                    Notre équipe vous contactera sous 24h pour confirmer votre livraison.
                </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/collections"
                    className="px-8 py-3 bg-[#0E2B1F] text-white rounded-lg hover:bg-[#12362A] transition-all duration-300 transform hover:-translate-y-0.5 shadow hover:shadow-lg text-center font-medium"
                >
                    Continuer vos achats
                </Link>
                <Link
                    href="/"
                    className="px-8 py-3 border border-[#12362A] text-[#12362A] rounded-lg hover:bg-[#12362A]/5 transition-all duration-300 transform hover:-translate-y-0.5 text-center font-medium"
                >
                    Retour à l&apos;accueil
                </Link>
            </div>

            {/* Order Note */}
            <div className="mt-8 pt-6 border-t border-[#12362A]/10">
                <p className="text-xs text-[#12362A]/70">
                    Une confirmation de commande vous a été envoyée par Mail.

                </p>
            </div>
        </div>
    </div>
);

export default OrderSuccess;
