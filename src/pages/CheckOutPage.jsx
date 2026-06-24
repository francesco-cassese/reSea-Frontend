import { useState } from 'react';
import CheckoutForm from '../Components/CheckOutForm.jsx';
import OrderSummary from '../Components/OrderSummary.jsx';
import PaymentForm from '../Components/PaymentForm.jsx';
import styles from './CheckoutPage.module.css';
import useCheckout from '../hooks/useCeckout.js';
import { priceFormatter } from '../services/reseaServices.js';

function CheckoutPage() {
    const [step, setStep] = useState('shipping');
    const [shippingData, setShippingData] = useState(null);
    const [orderDetails, setOrderDetail] = useState(null);
    const { processOrder } = useCheckout();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleShippingSubmit = (data) => {
        setShippingData(data);
        setStep('payment');
    };

    const handleFinalOrder = async (shippingDataWithPayment, items) => {
        setIsSubmitting(true);

        try {
            const {
                client_name,
                email_client,
                shipping_address,
                billing_address,
                phone_number
            } = shippingDataWithPayment;

            const orderPayload = {
                client_name,
                email_client,
                shipping_address,
                billing_address,
                phone_number,
                items
            };

            const response = await processOrder(orderPayload);

            if (response && response.data) {
                setOrderDetail(response.data);
                setIsOrderPlaced(true);
            } else {
                throw new Error("Risposta non valida dal server");
            }
        } catch (error) {
            console.error("Errore durante l'ordine:", error);
            alert("Si è verificato un errore, riprova.");
            setIsSubmitting(false);
        }
    };

    const mockCart = [
        { id: 1, name: 'Abisso Rigenerato', price: 99.99, quantity: 2 },
        { id: 2, name: 'Poseidon Wave', price: 129.90, quantity: 1 }
    ];

    const cartItems = mockCart;

    if (cartItems.length === 0) {
        return (
            <div className="container py-5">
                <h1>Riepilogo</h1>
                <p>Il tuo carrello è vuoto!</p>
            </div>
        );
    }

    if (isOrderPlaced) {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 text-center border p-5 rounded shadow-sm bg-white">

                        <div className="mb-4">
                            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                        </div>

                        <h1 className="h2 mb-3">Ordine confermato!</h1>
                        <p className="text-muted">
                            Grazie per il tuo acquisto, <strong>{shippingData?.client_name || 'Cliente'}</strong>.
                        </p>
                        <p className="mb-4">
                            Abbiamo inviato una email di conferma a <strong>{shippingData?.email_client}</strong> con tutti i dettagli del tuo ordine.
                        </p>

                        <div className="bg-light p-3 rounded mb-4 text-start">
                            <p className="mb-1 small text-uppercase fw-bold text-secondary">Riferimento ordine</p>

                            <p className="mb-0 font-monospace">
                                #ORD-2026-{orderDetails?.id || 'In elaborazione...'}
                            </p>
                        </div>

                        <div className="bg-light p-3 rounded mb-4 text-start">
                            <p className="mb-1 small text-uppercase fw-bold text-secondary">Riepilogo articoli</p>
                            <ul className="list-unstyled mb-0">
                                {orderDetails?.items?.map((item, index) => (
                                    <li key={index} className="d-flex justify-content-between border-bottom py-1">
                                        <span>{item.name || `Prodotto #${item.id}`} x {item.quantity}</span>
                                        <span>{priceFormatter(item.unitPrice * item.quantity)}</span>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <p className="d-flex justify-content-between fw-bold mb-0">
                                <span>Totale Finale</span>
                                <span>{priceFormatter(orderDetails?.total)}</span>
                            </p>
                        </div>

                        <div className="mt-4 p-4 border border-success rounded bg-light text-center">
                            <i className="bi bi-heart-fill text-success" style={{ fontSize: '2rem' }}></i>
                            <h5 className="text-success mt-2 mb-2">Un acquisto con un impatto reale</h5>
                            <p className="mb-0 text-muted">
                                Grazie per aver scelto di proteggere i nostri oceani. Con questo ordine,
                                hai dato nuova vita
                                a <strong>{orderDetails?.total_plastic} kg di plastica</strong> che
                                non inquineranno più il mare.
                            </p>
                        </div>

                        <button
                            className="btn btn-outline-primary px-4 py-2 mt-4"
                            onClick={() => window.location.href = '/'}
                        >
                            Continua lo shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`container py-5 ${styles.container}`}>
            <h1 className={`text-center mb-5 ${styles.title}`}>Completa il tuo acquisto</h1>

            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <div className={styles.sectionWrapper}>
                        <OrderSummary cartItems={cartItems} />
                    </div>

                    <div className={styles.sectionWrapper}>
                        {step === 'shipping' ? (
                            <CheckoutForm onNext={handleShippingSubmit} />
                        ) : (
                            <PaymentForm
                                onBack={() => setStep('shipping')}
                                shippingData={shippingData}
                                onComplete={(data) => handleFinalOrder(data, cartItems)}
                                isSubmitting={isSubmitting}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
