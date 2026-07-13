import { useState } from 'react';
import { Link } from "react-router-dom";
import CheckoutForm from '../components/CheckoutForm.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import PaymentForm from '../components/PaymentForm.jsx';
import OrderConfirmation from '../components/OrderConfirmation.jsx';
import EmptyCartNotice from '../components/EmptyCartNotice.jsx';
import styles from './CheckOutPage.module.css';
import useCheckout from '../hooks/useCheckout.js';
import { calculateOrderTotals } from '../services/orders.js';
import { useAppContext } from '../context/AppContext.jsx';



function CheckoutPage() {

    const [step, setStep] = useState('shipping');
    const [shippingData, setShippingData] = useState(null);
    const [orderDetails, setOrderDetail] = useState(null);
    const { processOrder } = useCheckout();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { cart, removePurchasedProducts } = useAppContext();

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
                removePurchasedProducts();
            } else {
                throw new Error("Risposta non valida dal server");
            }
        } catch (error) {
            console.error("Errore durante l'ordine:", error);
            alert("Si è verificato un errore, riprova.");
            setIsSubmitting(false);
        }
    };

    const cartItems = cart;

    const totals = calculateOrderTotals(cartItems);

    if (isOrderPlaced) {
        return <OrderConfirmation shippingData={shippingData} orderDetails={orderDetails} />;
    }

    if (cartItems.length === 0) {
        return <EmptyCartNotice />;
    }


    return (
        <div className="container py-5">
            <h1 className={`text-center mb-5 ${styles.title}`}>Completa il tuo acquisto</h1>

            <section className='container'>
                <div className={`row ${styles.checkoutRow}`}>

                    {/* Colonna 1: Riepilogo */}
                    <div className={`col-12 col-lg-6 ${styles.checkoutSide}`}>
                        <div className={styles.sectionWrapper}>
                            <div className="mb-3">
                                <Link to="/cart" className="text-decoration-none d-flex align-items-center fw-bold">
                                    <i className="bi bi-arrow-left me-2"></i> Torna al carrello
                                </Link>
                            </div>
                            <OrderSummary cartItems={cartItems} />
                        </div>
                    </div>

                    {/* Colonna 2: Form */}
                    <div className={`col-12 col-lg-6 ${styles.checkoutMain}`}>
                        <div className={styles.sectionWrapper}>
                            {step === 'shipping' ? (
                                <CheckoutForm onNext={handleShippingSubmit} />
                            ) : (
                                <PaymentForm
                                    onBack={() => setStep('shipping')}
                                    shippingData={shippingData}
                                    onComplete={(data) => handleFinalOrder(data, cartItems)}
                                    isSubmitting={isSubmitting}
                                    setIsSubmitting={setIsSubmitting}
                                />
                            )}
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default CheckoutPage;
