import { useState } from 'react';

function Cart() {
    // .getItem() Recupera i dati dal localStorage come stringa
    const cartData = localStorage.getItem('cart');

    // Se ci sono dati, li trasforma nuovamente in oggetti JS (non piu stringhe) con .parse, 
    // altrimenti iniziamo con un array vuoto 
    let initialCart;
    if (cartData) {
        initialCart = JSON.parse(cartData);
    } else {
        initialCart = [];
    }

    // Creiamo uno stato per i dati del carrello iniziale
    const [cart, setCart] = useState(initialCart);

    // Funzione per rimuovere un prodotto
    const removeHandler = (removeById) => {

        // Per eliminare un product creiamo un nuovo carrello filtrando quello vecchio 
        const newCart = cart.filter((product) => {
            return product.id !== removeById;
        });

        // Aggiornare lo stato del carreloo
        setCart(newCart);

        // Se non si aggiorna anche il local storage, al prossimo riinvio, il prodotto rimosso 
        // tornerebbe nel carrello perchè era ancora presente nel localStorage del browser:

        // trasformiamo di nuovo in stringa
        const newCartAsString = JSON.stringify(newCart);
        // salviamo nel localStorage il carrello aggiornato
        localStorage.setItem('cart', newCartAsString);
    }

    let cartToShow;

    if (cart.length === 0) {
        // Se il carrello è vuoto
        cartToShow = <p>Attualmente il tuo carrello è vuoto.</p>;
    } else {
        // Se il carrello è pieno:
        cartToShow = cart.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <p>Prodotto: {item.name}</p>
                <p>Prezzo: €{item.price}</p>
                <button onClick={() => removeHandler(item.id)}>Rimuovi</button>
            </div>
        ));
    }

    return (
        <div>
            <h2>Il tuo Carrello:</h2>
            {cartToShow}
        </div>
    );
}

export default Cart;