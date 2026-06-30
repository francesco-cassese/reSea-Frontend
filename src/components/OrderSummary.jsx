import { priceFormatter, } from '../services/reseaServices';
import styles from './OrderSummary.module.css';
import { calculateOrderTotals } from '../services/reseaServices.js';

function OrderSummary({ cartItems }) {
    const totals = calculateOrderTotals(cartItems);

    return (

        <div className={`${styles.container} p-4 rounded shadow-sm`}>
            <h2 className="mb-4">Riepilogo Ordine</h2>

            <ul className={`${styles.list} list-unstyled`}>
                {cartItems.map((item) => (
                    <li key={item.id} className={`${styles.item} d-flex justify-content-between mb-2`}>
                        <span>{item.name} x {item.quantity}</span>
                        <span>{priceFormatter(item.price * item.quantity)}</span>
                    </li>
                ))}
            </ul>

            <hr />

            <div className="d-flex justify-content-between text-secondary mb-1">
                <span>Subtotale (IVA esclusa)</span>
                <span>{priceFormatter(totals.subtotal)}</span>
            </div>

            <div className="d-flex justify-content-between fw-bold fs-5 mt-3">
                <span>Totale Complessivo</span>
                <span>{priceFormatter(totals.total)}</span>
            </div>

            <div className="text-end">
                <span className="text-muted">
                    di cui IVA: {priceFormatter(totals.iva)}
                </span>
            </div>
        </div>
    );
}

export default OrderSummary;