"use client"
import { ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-react';

const features = [
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: 'Produits authentiques',
        desc: 'Montres originales soigneusement sélectionnées',
    },
    {
        icon: <Truck className="w-6 h-6" />,
        title: 'Livraison rapide',
        desc: 'Expédition partout en Tunisie sous 24–48h',
    },
    {
        icon: <CreditCard className="w-6 h-6" />,
        title: 'Paiement à la livraison',
        desc: 'Payez uniquement à la réception',
    },
    {
        icon: <Headphones className="w-6 h-6" />,
        title: 'Support client',
        desc: 'Disponible avant et après votre commande',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-serif text-center mb-12 text-[#0E2B1F]">
                    Pourquoi choisir <span className="text-[#D4AF37]">TimEra</span> ?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center border border-[#12362A]/10 hover:border-[#D4AF37]/30 hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-[#0E2B1F]">{item.title}</h3>
                            <p className="text-[#12362A] text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}