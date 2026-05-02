import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQty: (productId: number, qty: number) => void;
    clearCart: () => void;
    total: number;
    count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setItems(prev => {
            const existing = prev.find(i => i.product.id === product.id);

            if (existing) {
                return prev.map(i =>
                    i.product.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) =>
        setItems(prev => prev.filter(i => i.product.id !== productId));

    const updateQty = (productId: number, qty: number) => {
        if (qty <= 0) return removeFromCart(productId);

        setItems(prev =>
            prev.map(i =>
                i.product.id === productId ? { ...i, quantity: qty } : i
            )
        );
    };

    const clearCart = () => setItems([]);

    const total = items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
    );

    const count = items.reduce(
        (sum, i) => sum + i.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQty,
                clearCart,
                total,
                count,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used inside CartProvider');
    }

    return context;
};