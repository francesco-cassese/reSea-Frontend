import { useState, createContext, useContext, useEffect } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  
    const [search, setSearch] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState(initialCart);

    //btn carrello e wishlist
    const toggleWishlist = (id) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleCart = (id) => {
        setCart(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const cartData = localStorage.getItem('cart');

    let initialCart;
    if (cartData) {
        initialCart = JSON.parse(cartData);
    } else {
        initialCart = [];
    }

    const addHandler = (productToAdd) => {
        const newProduct = {
            ...productToAdd,
            quantity: 1,
            selected: true
        };
        const newCart = [...cart, newProduct];
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

    return (
        <AppContext.Provider value={{
            cart,
            search, 
            setSearch,
            wishlist, 
            toggleWishlist,
            toggleCart,
            addHandler,
            removeHandler,
            updateQuantity,
            toggleSelect,
            removePurchasedProducts
        }}>
            {children}
        </AppContext.Provider>
    );
};


function useAppContext() {
    return useContext(AppContext);
}

export { useAppContext, AppProvider };