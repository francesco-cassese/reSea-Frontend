import { useState, createContext, useContext, useEffect } from "react";

const AppContext = createContext();

function persistCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function persistWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function AppProvider({ children }) {

    const cartData = localStorage.getItem('cart');
    const wishlistData = localStorage.getItem('wishlist');

    let initialCart;
    if (cartData) {
        initialCart = JSON.parse(cartData);
    } else {
        initialCart = [];
    }

    let initialWishList;
    if (wishlistData) {
        initialWishList = JSON.parse(wishlistData);
    } else {
        initialWishList = [];
    }

    const [search, setSearch] = useState("");
    const [wishlist, setWishlist] = useState(initialWishList);
    const [cart, setCart] = useState(initialCart);

    const addToWishlist = (product) => {
        const existsInWishlist = wishlist.some((item) => item.id === product.id);
        let newWishlist;
        if (existsInWishlist) {
            newWishlist = wishlist.filter((item) => item.id !== product.id);
        } else {
            newWishlist = [...wishlist, product];
        }
        setWishlist(newWishlist);
        persistWishlist(newWishlist);
    };

    const addHandler = (productToAdd) => {

        const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);

        let newCart;

        if (existingProductIndex !== -1) {
            newCart = [...cart];
            newCart[existingProductIndex] = {
                ...newCart[existingProductIndex],
                quantity: newCart[existingProductIndex].quantity + 1
            };
        } else {
            const newProduct = {
                ...productToAdd,
                quantity: 1,
            };
            newCart = [...cart, newProduct];
        }

        setCart(newCart);
        persistCart(newCart);
    };

    const removeHandler = (idProductToRemove) => {
        const newCart = cart.filter((product) => {
            return product.id !== idProductToRemove;
        });
        setCart(newCart);
        persistCart(newCart);
    };

    const updateQuantity = (id, amount) => {
        const newCart = cart.map((product) => {
            if (product.id === id) {
                let newQty = (product.quantity || 1) + amount;
                if (newQty < 1) {
                    newQty = 1;
                }
                return { ...product, quantity: newQty };
            } else {
                return product;
            }
        });
        setCart(newCart);
        persistCart(newCart);
    };

    const removePurchasedProducts = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const inWishlist = (id) => {
        return wishlist.some((item) => item.id === id);
    };

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <AppContext.Provider value={{
            cart,
            search,
            setSearch,
            wishlist,
            addToWishlist,
            addHandler,
            removeHandler,
            updateQuantity,
            removePurchasedProducts,
            totalQuantity,
            inWishlist
        }}>
            {children}
        </AppContext.Provider>
    );
};


function useAppContext() {
    return useContext(AppContext);
}

export { useAppContext, AppProvider };