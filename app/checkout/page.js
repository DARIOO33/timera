'use client';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EmptyCart from './components/EmptyCart';
import { PulseLoader, ScaleLoader, ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import OrderSuccess from './components/OrderSuccess';
import { fbPixel } from '@/app/lib/fpixel';

const API_URL = process.env.NEXT_PUBLIC_API_URL
const CheckoutPage = () => {
    const { items, totalPrice, clearCart, closeCart } = useCart();
    const [orderComplete, setOrderComplete] = useState(false);
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [products, setProducts] = useState({})
    const [cityList, setCityList] = useState([])
    const [city, setCity] = useState(null)
    const [ville, setVille] = useState(null)
    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerStreet, setCustomerStreet] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const wilayatTunisie = [
        "Tunis",
        "Ariana",
        "Ben Arous",
        "Mannouba",
        "Nabeul",
        "Zaghouan",
        "Bizerte",
        "Beja",
        "Jendouba",
        "Kef",
        "Siliana",
        "Sousse",
        "Monastir",
        "Mahdia",
        "Sfax",
        "Kairouan",
        "Kasserine",
        "Sidi Bouzid",
        "Gabes",
        "Medenine",
        "Tataouine",
        "Gafsa",
        "Tozeur",
        "Kebili"
    ];

    useEffect(() => {
        closeCart()
        const localcart = typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("timera_cart")) || []
            : []
        setCart(typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("timera_cart")) || []
            : [])

        setTotal(localcart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }, [])

    // Form state

    const handleChange = async (event, newValue) => {
        setCity(newValue);
        if (!newValue) {
            setCityList([]);
            return;
        }
        const res = await fetch(`/api/municipalities?name=${newValue}`);
        const data = await res.json();
        setCityList(data[0]?.Delegations || []);
    };

    const [errors, setErrors] = useState({});

    // Validate form


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (customerName == "" || customerPhone == "" || city == null || ville == null) {
            toast.error("All Fileds Required")
            return
        }
        setIsLoading(true)
        const customerAddresse = (customerStreet == "" ?
            `${ville.Name} ${ville.PostalCode} ${city} ` :
            `${customerStreet} ${ville.Name} ${ville.PostalCode} ${city}   `
        );
        let cartItems = [];

        items.forEach(element => {
            cartItems.push({
                product: element.id,
                quantity: element.quantity
            });
        });

        try {
            setIsLoading(true); // Start loading

            const res = await fetch(`${API_URL}/api/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerName,
                    customerEmail,
                    customerNumber: customerPhone,
                    customerAddresse,
                    items: cartItems,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Show error from server
                toast.error(data.message || "Une erreur est survenue.");
            } else {
                // Success
                toast.success("Commande créée avec succès !");
                setTotal(data.total);
                setSubtotal(data.subTotal)
                setProducts(data.orderDetails);
                clearCart()
                fbPixel.track('Purchase', {
                    value: Number(data.total),
                    currency: 'TND',
                    content_type: 'product',
                });

                setOrderComplete(true);

            }
        } catch (error) {
            console.error("Order submission failed:", error);
            toast.error("Impossible de passer la commande. Veuillez réessayer plus tard.");
        } finally {
            setIsLoading(false); // Always stop loading
        }










    };
    const handlePhoneChange = (e) => {
        let v = e.target.value.replace(/\D/g, ''); // keep digits only

        // limit to 8 digits
        if (v.length > 8) return;

        // validate first digit
        if (v.length === 1 && !/^[234579]$/.test(v)) return;

        setCustomerPhone(v);
    };
    const handleEmailChange = (e) => {
        let v = e.target.value;

        // remove spaces
        v = v.replace(/\s/g, '');

        // allow only email-safe characters
        if (!/^[a-zA-Z0-9@._+-]*$/.test(v)) return;

        setCustomerEmail(v);
    };


    const uniqueCities = useMemo(() => {
        if (!Array.isArray(cityList)) return [];
        const seen = new Set();

        return cityList.filter((c) => {
            const key = c.Name?.trim().toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [cityList]);
    // Empty cart
    if (items.length === 0 && !orderComplete) {
        return (
            <EmptyCart />
        );
    }
    //loading

    // Order complete
    if (orderComplete) {
        return (
            <OrderSuccess total={total} products={products} subtotal={subtotal} />
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <h1 className='text-[#0E2B1F] text-center font-extrabold font-serif py-3 text-3xl '>
                complétez votre commande
            </h1>
            <div className='px-4'>
                <Grid container spacing={2} >
                    <Grid size={{ xs: 12, md: 8 }}>
                        <form className="relative bg-white rounded-2xl p-6 shadow-lg space-y-5 border border-[#12362A]/10">
                            <p className="font-serif text-lg font-semibold text-[#0E2B1F]">
                                Informations de livraison
                            </p>

                            {/* Full Name */}
                            <div className="py-1">
                                <label className="block text-sm font-medium text-[#12362A] mb-1">
                                    Nom complet <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    type="text"
                                    placeholder="Ex : Mohamed Ben Ali"
                                    className="text-[#0E2B1F] w-full rounded-xl border border-[#12362A]/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="py-1">
                                <label className="block text-sm font-medium text-[#12362A] mb-1">
                                    Numéro de téléphone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={customerPhone}
                                    onChange={handlePhoneChange}
                                    type="tel"
                                    placeholder="Ex : 22 123 456"
                                    className="text-[#0E2B1F] w-full rounded-xl border border-[#12362A]/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="py-1">
                                <label className="block text-sm font-medium text-[#12362A] mb-1">
                                    Email <span className='text-xs text-[#12362A]/70'>( optionnel )</span>
                                </label>
                                <input
                                    value={customerEmail}
                                    onChange={handleEmailChange}
                                    type="email"
                                    placeholder="Ex : exemple@email.com"
                                    className="text-[#0E2B1F] w-full rounded-xl border border-[#12362A]/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors"
                                />
                            </div>

                            {/*  Gouvernorat + City */}
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Gouvernorat */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-[#12362A] mb-1">
                                        Gouvernorat <span className="text-red-500">*</span>
                                    </label>
                                    <Autocomplete
                                        disablePortal
                                        value={city}
                                        options={wilayatTunisie}
                                        onChange={handleChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Selectionner"
                                                size="small"
                                                fullWidth
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#12362A',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#D4AF37',
                                                            borderWidth: '2px',
                                                        },
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                </div>

                                {/* Ville */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-[#12362A] mb-1">
                                        Ville <span className="text-red-500">*</span>
                                    </label>
                                    <Autocomplete
                                        options={uniqueCities}
                                        value={ville}
                                        onChange={(event, newValue) => setVille(newValue)}
                                        getOptionLabel={(option) => option.Name}
                                        isOptionEqualToValue={(option, value) =>
                                            option.Name === value.Name
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Ex : Tunis"
                                                size="small"
                                                fullWidth
                                                required
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#12362A',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#D4AF37',
                                                            borderWidth: '2px',
                                                        },
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="py-2">
                                <label className="block text-sm font-medium text-[#12362A] mb-1">
                                    Adresse détaillée <span className='text-xs text-[#12362A]/70'>( optionnel )</span>
                                </label>
                                <input
                                    value={customerStreet}
                                    onChange={(e) => setCustomerStreet(e.target.value)}
                                    type="text"
                                    placeholder="Rue, immeuble, étage, appartement, bureau…"
                                    className="text-[#0E2B1F] w-full rounded-xl border border-[#12362A]/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors"
                                />
                            </div>
                        </form>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <div className="sticky top-6 bg-white rounded-2xl p-6 shadow-xl border border-[#12362A]/10 space-y-6">
                            {/* Header with enhanced styling */}
                            <div className="pb-4 border-b border-[#12362A]/20">
                                <h3 className="font-serif text-xl font-bold text-[#0E2B1F]">
                                    Récapitulatif de la commande
                                </h3>
                            </div>

                            {/* Products with improved spacing and interaction */}
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 pb-4 border-b border-[#12362A]/10 last:border-b-0 last:pb-0 group hover:bg-[#12362A]/5 p-2 rounded-lg transition-colors"
                                    >
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-lg object-cover border-2 border-[#12362A]/10 shadow-sm"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-[#0E2B1F] text-white text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-[#0E2B1F] truncate">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-[#12362A] mt-1">
                                                Quantité : {item.quantity}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-[#0E2B1F] whitespace-nowrap">
                                                {(item.price * item.quantity).toFixed(2)} DT
                                            </p>
                                            {item.quantity > 1 && (
                                                <p className="text-xs text-[#12362A] mt-1">
                                                    {item.price.toFixed(2)} DT × {item.quantity}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing section with better visual separation */}
                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between items-center py-3 border-t border-[#12362A]/20">
                                    <p className="text-sm font-medium text-[#12362A]">
                                        Livraison
                                    </p>
                                    <p className="text-sm font-semibold text-[#0E2B1F]">
                                        7.00 DT
                                    </p>
                                </div>

                                <div className="flex justify-between items-center py-4 border-t border-[#12362A]/20">
                                    <div>
                                        <p className="text-lg font-bold text-[#0E2B1F]">
                                            Total à payer
                                        </p>
                                    </div>
                                    <p className="text-2xl font-bold text-[#0E2B1F]">
                                        {(total + 7).toFixed(2)} DT
                                    </p>
                                </div>
                            </div>

                            {/* Enhanced CTA button */}
                            <div className="pt-2">
                                <button
                                    onClick={(e) => handleSubmit(e)}
                                    disabled={isLoading}
                                    className="group relative flex items-center justify-center w-full px-4 bg-gradient-to-r from-[#0E2B1F] to-[#12362A] text-white text-center py-3.5 rounded-lg font-medium transition-all duration-300 hover:from-[#12362A] hover:to-[#0E2B1F] disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:from-[#0E2B1F] disabled:hover:to-[#12362A] overflow-hidden"
                                >
                                    {/* Shimmer effect on hover */}
                                    {!isLoading && (
                                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                                    )}

                                    <span className="relative flex items-center justify-center">
                                        {isLoading ? (
                                            <>
                                                <ClipLoader
                                                    color="#ffffff"
                                                    size={20}
                                                    speedMultiplier={0.8}
                                                    className="mr-3"
                                                />
                                                <span className="font-medium tracking-wide">Validation de votre commande...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-medium tracking-wide">Commander maintenant</span>
                                                <svg
                                                    className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default CheckoutPage;
