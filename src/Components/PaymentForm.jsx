import { useState } from 'react';
import styles from './CheckoutForm.module.css';

function PaymentForm({ onBack, shippingData, onComplete, isSubmitting }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState(null);

    const handlePayment = () => {

        if (cardNumber === "0000") {
            setError("Pagamento rifiutato: carta non valida.");
        } else if (cardNumber.length < 16 || cvv.length < 3) {
            setError("Per favore, inserisci dati carta validi.");
        } else {
            setError(null);
            onComplete({
                ...shippingData,
                paymentDetails: { cardNumber, expiry, cvv }
            });
        }
    };

    return (
        <div className={`p-4 border rounded ${styles.formContainer}`}>
            <h2 className="mb-4">Metodo di pagamento</h2>

            <div className="mb-3">
                <input
                    className={`form-control ${styles.input}`}
                    placeholder="Numero carta (16 cifre)"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                />
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <input
                        className={`form-control ${styles.input}`}
                        placeholder="MM/AA"
                        value={expiry}
                        onChange={(event) => setExpiry(event.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <input
                        className={`form-control ${styles.input}`}
                        placeholder="CVV"
                        value={cvv}
                        onChange={(event) => setCvv(event.target.value)}
                    />
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex gap-2">
                <button className="btn btn-secondary" onClick={onBack}>Indietro</button>
                <button className={`btn w-100 ${styles.coralButton}`} onClick={handlePayment} disabled={isSubmitting}>
                    Paga ora
                </button>
            </div>
        </div>
    );
}

export default PaymentForm;