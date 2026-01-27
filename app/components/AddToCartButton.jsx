// app/components/AddToCartButton.js
'use client';

import { useCart } from '@/app/context/CartContext';
import { ShoppingBag } from 'lucide-react';

const AddToCartButton = ({ product }) => {
    const { addToCart, openCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            sku: product.sku,
        });
        openCart(); // Optionally open cart after adding
    };

    return (
        <button
            onClick={handleAddToCart}
            className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto"
        >
            <ShoppingBag className="w-5 h-5" />
            <span>Ajouter au panier</span>
        </button>
    );
};

export default AddToCartButton;