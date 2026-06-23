import { useState } from 'react';
import { fetchApi } from '../services/reseaServices';

function useCheckout() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function processOrder(orderData, cartItems) {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchApi('/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...orderData, items: cartItems })
            });

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { processOrder, loading, error };
}

export default useCheckout;
