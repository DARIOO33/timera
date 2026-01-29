// app/montres-acier-inoxydable-tunisie/page.js
export const metadata = {
    title: "Montres en Acier Inoxydable en Tunisie | Timera",
    description:
        "Découvrez les montres en acier inoxydable de haute qualité en Tunisie. Design élégant, matériaux durables et livraison rapide partout en Tunisie.",
};

export default function MontresPage() {
    return (
        <>
            {/* Structured Data for AI & Google */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Store",
                        "name": "Timera",
                        "url": "https://timera.tn",
                        "logo": "https://timera.tn/logo.png",
                        "description": "Boutique en ligne spécialisée dans les montres en acier inoxydable de haute qualité en Tunisie.",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Tunis",
                            "addressCountry": "TN"
                        },
                        "areaServed": "TN",
                        "makesOffer": {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Product",
                                "name": "Montres en acier inoxydable",
                                "brand": "Timera"
                            }
                        }
                    })
                }}
            />

            {/* Page content */}
            <main className=" mx-auto px-4 py-12 bg-amber-50">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-[#0E2B1F]">
                        Montres en Acier Inoxydable en Tunisie
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg text-[#12362A] mb-6">
                            Vous cherchez où acheter des montres en acier inoxydable de haute qualité en Tunisie ?
                            <span className="font-semibold text-[#0E2B1F]"> Timera</span> propose une sélection de montres élégantes et durables, parfaites pour tous les styles et occasions.
                            Livraison rapide disponible partout en Tunisie.
                        </p>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Our Watches Section */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#12362A]/10">
                        <h2 className="font-serif text-2xl font-semibold mb-4 text-[#0E2B1F] pb-3 border-b border-[#D4AF37]/20">
                            Nos Montres
                        </h2>
                        <p className="text-[#12362A] leading-relaxed">
                            Chaque montre est fabriquée avec de l'acier inoxydable de qualité supérieure, résistante aux rayures et à l&apos;usure quotidienne.
                            Nos designs combinent style moderne et précision.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#12362A]/10">
                        <h2 className="font-serif text-2xl font-semibold mb-4 text-[#0E2B1F] pb-3 border-b border-[#D4AF37]/20">
                            Contact
                        </h2>
                        <p className="text-[#12362A] leading-relaxed">
                            Pour toute question, contactez-nous via WhatsApp ou email. Nous sommes là pour vous aider à choisir la montre parfaite.
                        </p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#12362A]/10 mb-12">
                    <h2 className="font-serif text-2xl font-semibold mb-6 text-[#0E2B1F] pb-3 border-b border-[#D4AF37]/20">
                        Questions Fréquentes
                    </h2>
                    <div className="space-y-6">
                        <div className="pb-4 border-b border-[#12362A]/10">
                            <h3 className="font-semibold text-lg mb-2 text-[#0E2B1F]">
                                Où puis-je acheter des montres en acier inoxydable en Tunisie ?
                            </h3>
                            <p className="text-[#12362A]">
                                Vous pouvez commander directement sur{" "}
                                <a
                                    href="https://timera.tn"
                                    className="text-[#D4AF37] hover:text-[#C8A24A] font-medium transition-colors"
                                >
                                    Timera.tn
                                </a>
                                , avec livraison dans tout le pays.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2 text-[#0E2B1F]">
                                Les montres sont-elles garanties ?
                            </h3>
                            <p className="text-[#12362A]">
                                Oui, toutes nos montres bénéficient d&apos;une garantie qualité contre les défauts de fabrication.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-[#0E2B1F]/5 to-[#12362A]/5 rounded-2xl p-8 border border-[#12362A]/10">
                    <h3 className="font-serif text-2xl font-semibold mb-4 text-[#0E2B1F]">
                        Prêt à découvrir notre collection ?
                    </h3>
                    <p className="text-[#12362A] mb-6 max-w-2xl mx-auto">
                        Explorez notre sélection exclusive de montres en acier inoxydable,
                        choisies pour leur qualité, leur durabilité et leur design élégant.
                    </p>
                    <a
                        href="/collections/inox"
                        className="inline-block bg-[#0E2B1F] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#12362A] transition-colors shadow-lg hover:shadow-xl"
                    >
                        Voir la collection Inox
                    </a>
                </div>
            </main>
        </>
    );
}