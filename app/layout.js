// app/layout.js
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import './globals.css';
import Footer from './components/Footer';

export const metadata = {
  title: 'TimEra - Horlogerie d\'exception',
  description: 'Montres de luxe et accessoires horlogers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <Header />
          <CartSidebar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}