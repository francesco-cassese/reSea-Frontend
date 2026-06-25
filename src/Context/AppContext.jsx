import { useState, createContext, useContext, useEffect } from "react";

const AppContext = createContext();

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
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };


    const toggleCart = (id) => {
        setCart(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
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
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const removeHandler = (idProductToRemove) => {
        const newCart = cart.filter((product) => {
            return product.id !== idProductToRemove;
        });
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
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
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const removePurchasedProducts = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <AppContext.Provider value={{
            cart,
            search,
            setSearch,
            wishlist,
            addToWishlist,
            toggleCart,
            addHandler,
            removeHandler,
            updateQuantity,
            removePurchasedProducts,
            totalQuantity
        }}>
            {children}
        </AppContext.Provider>
    );
};


function useAppContext() {
    return useContext(AppContext);
}

export { useAppContext, AppProvider };