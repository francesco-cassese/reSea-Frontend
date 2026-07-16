import { useState } from 'react';
import styles from './PaymentForm.module.css';
import { validatePayment, simulatePaymentGateway } from '../services/payment.js';

function PaymentForm({ onBack, shippingData, onComplete, isSubmitting, setIsSubmitting }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState(null);

    const handlePayment = async () => {

        setError(null);
        setIsSubmitting(true);

        const validation = validatePayment(cardNumber, expiry, cvv)

        if (!validation.isValid) {
            setError(validation.message);
            setIsSubmitting(false);
            return;
        }

        const paymentResponse = await simulatePaymentGateway(cvv);

        if (!paymentResponse.success) {
            setError(paymentResponse.message);
            setIsSubmitting(false);
            return;
        }

        try {
            await onComplete({
                ...shippingData,
                paymentDetails: { cardNumber, expiry, cvv }
            });

        } catch (err) {
            setError("Errore critico di comunicazione. Riprova.");
            setIsSubmitting(false);
        }
    };
    return (
        <div className={`p-4 border rounded ${styles.formContainer}`}>
            <h2 className="mb-4">Metodo di pagamento</h2>

            <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">Numero carta</label>
                <input
                    id="cardNumber"
                    className={`form-control ${styles.input}`}
                    placeholder="Numero carta (16 cifre)"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                />
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="expiry" className="form-label">Scadenza</label>
                    <input
                        id="expiry"
                        className={`form-control ${styles.input}`}
                        placeholder="MM/AA"
                        value={expiry}
                        onChange={(event) => setExpiry(event.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input
                        id="cvv"
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

                <button
                    className={`btn w-100 ${styles.coralButton}`}
                    onClick={handlePayment}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Elaborazione...
                        </>
                    ) : (
                        "Paga ora"
                    )}
                </button>
            </div>
        </div>
    );
}

export default PaymentForm;