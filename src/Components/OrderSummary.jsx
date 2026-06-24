import { priceFormatter } from '../services/reseaServices';
import styles from './OrderSummary.module.css';

function OrderSummary({ cartItems }) {
    const subTotal = cartItems.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);

    const vatValue = 0.22;

    const vatAmount = subTotal * vatValue;

    const total = subTotal + vatAmount;

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
                <span>{priceFormatter(subTotal)}</span>
            </div>

            <div className="d-flex justify-content-between fw-bold fs-5 mt-3">
                <span>Totale Complessivo</span>
                <span>{priceFormatter(total)}</span>
            </div>

            <div className="text-end">
                <span className="text-muted">
                    di cui IVA:{priceFormatter(vatAmount)}
                </span>
            </div>
        </div>
    );
}

export default OrderSummary;