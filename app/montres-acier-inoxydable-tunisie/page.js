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
            <main>
                <h1>Montres en Acier Inoxydable en Tunisie</h1>
                <p>
                    Vous cherchez où acheter des montres en acier inoxydable de haute qualité en Tunisie ?
                    Timera propose une sélection de montres élégantes et durables, avec livraison rapide partout en Tunisie.
                </p>
            </main>
        </>
    );
}
