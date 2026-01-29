// app/layout.js
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import './globals.css';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';

export const metadata = {
  title: {
    default: 'TimEra – Montres & Horlogerie en Tunisie',
    template: '%s | TimEra',
  },
  description:
    'Boutique tunisienne de montres pour homme et femme. Paiement en TND, livraison rapide sur toute la Tunisie.',
  keywords: [
    'montres Tunisie',
    'montre homme',
    'montre femme',
    'horlogerie Tunisie',
    'montres en ligne',
    'TimEra',
  ],
  openGraph: {
    title: 'TimEra – Montres en Tunisie',
    description:
      'Découvrez notre collection de montres élégantes avec livraison partout en Tunisie.',
    url: 'https://timera.tn',
    siteName: 'TimEra',
    locale: 'fr_TN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <Toaster
            position="top-right" />
          <Header />
          <CartSidebar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}