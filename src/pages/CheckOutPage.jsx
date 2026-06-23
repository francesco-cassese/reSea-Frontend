import CheckoutForm from '../Components/CheckOutForm';
// [QUI]: Importate il vostro Context del carrello, ad esempio: 
// import { useCart } from '../context/CartContext'; 

function CheckoutPage() {
    // [QUI]: Recuperate i dati dal vostro Context.
    // Esempio: const { cart } = useCart();

    // --- DATI DI TEST (MOCK) ---
    // Questi dati simulano esattamente quello che riceverai dal Context.
    // Una volta pronti, i colleghi sostituiranno questa variabile.
    const mockCart = [
        { id: 1, name: 'Prodotto A', price: 10.00, quantity: 2 },
        { id: 2, name: 'Prodotto B', price: 25.50, quantity: 1 }
    ];

    // [ISTRUZIONE PER IL TEAM]: 
    // Sostituite 'mockCart' con la variabile reale del vostro Context.
    // Esempio: const { cart } = useCart(); const cartItems = cart;
    const cartItems = mockCart;

    if (cartItems.length === 0) {
        return (
            <div>
                <h1>Completa l'ordine</h1>
                <p>Il tuo carrello è vuoto! Torna allo shop per aggiungere qualche prodotto.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Completa l'ordine</h1>
            {/* Passate i dati del carrello al componente CheckoutForm. 
               Il form si aspetta che 'cartItems' sia un array di oggetti, 
               quindi assicuratevi che i dati passati abbiano la struttura corretta.
            */}
            <CheckoutForm cartItems={cartItems} />
        </div>
    );
}

export default CheckoutPage;
