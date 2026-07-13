import { priceFormatter } from '../services/formatters.js';
import styles from './OrderSummary.module.css';
import { calculateOrderTotals } from '../services/orders.js';

function OrderSummary({ cartItems }) {
    const totals = calculateOrderTotals(cartItems);
    return (
        <div className={`${styles.container} rounded shadow-sm`}>
            <h2 className={`${styles.title} mb-4`}>Riepilogo Ordine</h2>
            <ul className={`${styles.list} list-unstyled`}>
                {cartItems.map((item) => (
                    <li key={item.id} className={`${styles.item} d-flex justify-content-between mb-2 fw-semibold`}>
                        <span>{item.name} x {item.quantity}</span>
                        <span>{priceFormatter(item.price * item.quantity)}</span>
                    </li>
                ))}
            </ul>
            <hr />
            <div className={`${styles.subtotalRow} d-flex justify-content-between text-secondary mb-1`}>
                <span>Subtotale (IVA esclusa)</span>
                <span>{priceFormatter(totals.subtotal)}</span>
            </div>
            <div className={`${styles.totalRow} d-flex justify-content-between mt-3 fw-bold`}>
                <span>Totale Complessivo:</span>
                <span>{priceFormatter(totals.total)}</span>
            </div>
            <div className="text-end">
                <span className={`${styles.ivaNote} text-muted`}>
                    di cui IVA: {priceFormatter(totals.iva)}
                </span>
            </div>
        </div>
    );
}

export default OrderSummary;