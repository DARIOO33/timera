const CartItem = ({ item }) => (
    <div className="flex items-center gap-4 border-b border-[#12362A]/10 pb-4 group hover:bg-[#12362A]/5 p-3 -mx-3 rounded-lg transition-colors">
        <div className="relative flex-shrink-0">
            <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover border border-[#12362A]/10 shadow-sm"
            />
            <span className="absolute -top-2 -right-2 bg-[#0E2B1F] text-white text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center">
                {item.quantity}
            </span>
        </div>

        <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-[#0E2B1F] truncate group-hover:text-[#12362A] transition-colors">
                {item.name}
            </p>
            <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-[#12362A]">
                    {item.price.toFixed(2)} DT × {item.quantity}
                </p>
                {item.sku && (
                    <span className="text-xs text-[#12362A]/70 bg-[#12362A]/5 px-2 py-0.5 rounded">
                        SKU: {item.sku}
                    </span>
                )}
            </div>
        </div>

        <div className="text-right">
            <p className="font-semibold text-sm text-[#0E2B1F] whitespace-nowrap">
                {(item.price * item.quantity).toFixed(2)} DT
            </p>
            {item.quantity > 1 && (
                <p className="text-xs text-[#12362A]/60 mt-1">
                    {item.price.toFixed(2)} DT l&apos;unité
                </p>
            )}
        </div>
    </div>
);

export default CartItem;
