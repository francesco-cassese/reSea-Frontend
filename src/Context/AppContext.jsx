import { useState, createContext, useContext, useEffect } from "react";

const AppContext = createContext();

function AppProvider({ children }) {

    const cartData = localStorage.getItem('cart');

    let initialCart;
    if (cartData) {
        initialCart = JSON.parse(cartData);
    } else {
        initialCart = [];
    }

    const [search, setSearch] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState(initialCart);

    //btn carrello e wishlist
    const toggleWishlist = (id) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const addToWishlist = (product) => {
        setWishlist(prev =>
            prev.some(p => p.id === product.id)
                ? prev.filter(p => p.id !== product.id)
                : [...prev, product]
        );
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
                selected: true
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

    const toggleSelect = (id) => {
        const newCart = cart.map((product) => {
            if (product.id === id) {
                return { ...product, selected: !product.selected };
            } else {
                return product;
            }
        });
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const removePurchasedProducts = () => {
        const newCart = cart.filter((product) => product.selected === false);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <AppContext.Provider value={{
            cart,
            search,
            setSearch,
            wishlist,
            addToWishlist,
            toggleWishlist,
            toggleCart,
            addHandler,
            removeHandler,
            updateQuantity,
            toggleSelect,
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