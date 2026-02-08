// app/layout.js
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import './globals.css';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

export const metadata = {
  title: {
    default: 'TimEra – Montres & Horlogerie en Tunisie',
    template: '%s | TimEra',
  },
  description:
    'Boutique tunisienne de montres pour homme et femme. Paiement en TND, livraison rapide sur toute la Tunisie.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1677105643270199');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* NoScript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1677105643270199&ev=PageView&noscript=1"
          />
        </noscript>

        <CartProvider>
          <Toaster position="top-right" />
          <Header />
          <CartSidebar />
          <main>{children}</main>
          <Footer />
        </CartProvider>

      </body>
    </html>
  );
}
