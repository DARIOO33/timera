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
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-serif text-center mb-12 text-gray-900">
                    Pourquoi choisir <span className="text-amber-600">TimEra</span> ?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}