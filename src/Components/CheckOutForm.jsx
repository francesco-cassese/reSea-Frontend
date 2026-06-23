import { useState } from 'react';
import useCheckout from '../hooks/useCeckout.js';

function CheckoutForm({ cartItems }) {

    const [formData, setFormData] = useState({
        client_name: '',
        email_client: '',
        shipping_address: '',
        billing_address: '',
        phone_number: ''
    });


    const { processOrder, loading, error } = useCheckout();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const total = cartItems.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);

        const orderData = {
            ...formData,
            total_amount: total.toFixed(2),
            order_date: new Date().toISOString()
        };

        try {
            await processOrder(orderData, cartItems);
            alert("Ordine completato con successo!");
        } catch (error) {
            console.error("Fallimento:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Dati di Spedizione</h2>
            <input
                name="client_name"
                placeholder="Nome e Cognome"
                onChange={handleChange}
                required />

            <input
                name="email_client"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required />

            <input
                name="shipping_address"
                placeholder="Indirizzo di spedizione"
                onChange={handleChange}
                required />

            <input
                name="billing_address"
                placeholder="Indirizzo di fatturazione"
                onChange={handleChange}
                required
            />

            <input
                name="phone_number"
                placeholder="Telefono"
                onChange={handleChange}
                required />

            <button type="submit" disabled={loading}>
                {loading ? "Invio in corso..." : "Paga ora"}
            </button>

            {error && <p>Errore: {error}</p>}
        </form>
    );
}

export default CheckoutForm;

