import { IProduct } from "@/models/Product";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export interface CartContextInteface {
    cartProducts: string[],
    setCartProducts: Dispatch<SetStateAction<string[]>>;
    addProduct: (productId: string) => void;
    removeProduct: (productId: string) => void;
    clearCart: () => void;
}

const defaultValue = {
    cartProducts: [],
    setCartProducts: () => { },
    addProduct: () => { },
    removeProduct: () => { },
    clearCart: () => { },
} as CartContextInteface;

// export const CartContext = createContext<Partial<CartContextInteface>>({}); use <Partial<CartContextInteface>> if you don't know the inital value
export const CartContext = createContext<CartContextInteface>(defaultValue);

export function CartContextProvider({ children }: { children: ReactNode; }) {
    const ls = typeof window !== "undefined" ? localStorage : null;
    const [cartProducts, setCartProducts] = useState<string[]>([]);

    useEffect(() => {
        if (cartProducts.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts, ls]);

    function addProduct(productId: string) {
        setCartProducts((prev: string[]) => [...prev, productId]);
    }
    function removeProduct(productId: string) {
        setCartProducts((prev: string[]) => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
    }
    function clearCart() {
        ls?.removeItem("cart");
        setCartProducts([]);
    }

    useEffect(() => {
        if (ls && ls.getItem("cart")) {
            setCartProducts(JSON.parse(ls.cart));
        }
    }, []);

    return <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
        {children}
    </CartContext.Provider>;
}
