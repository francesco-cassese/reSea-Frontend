import { priceFormatter, weightFormatter } from '../services/formatters.js';
import styles from './OrderConfirmation.module.css';

function OrderConfirmation({ shippingData, orderDetails }) {
    return (
        <div className={`container py-5 ${styles.compactWrapper}`}>
            <div className="row justify-content-center">
                <div className={`col-md-8 col-lg-6 text-center border p-3 p-md-5 rounded shadow-sm bg-white ${styles.compactCard}`}>

                    <div className={`mb-4 ${styles.compactIcon}`}>
                        <i className="bi bi-check-circle-fill text-success icon-xl"></i>
                    </div>

                    <h1 className={`h2 mb-3 ${styles.compactHeading}`}>Ordine confermato!</h1>
                    <p className="text-muted">
                        Grazie per il tuo acquisto, <strong>{shippingData?.client_name || 'Cliente'}</strong>.
                    </p>
                    <p className={`mb-4 ${styles.compactText}`}>
                        Abbiamo inviato una email di conferma a <strong>{shippingData?.email_client}</strong> con tutti i dettagli del tuo ordine.
                    </p>

                    <div className={`bg-light p-3 rounded mb-4 text-start ${styles.compactBox}`}>
                        <p className="mb-1 small text-uppercase fw-bold text-secondary">Riferimento ordine</p>

                        <p className="mb-0 font-monospace">
                            #ORD-2026-{orderDetails?.id || 'In elaborazione...'}
                        </p>
                    </div>

                    <div className={`bg-light p-3 rounded mb-4 text-start ${styles.compactBox}`}>
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
                        <p className='d-flex justify-content-between fw-bold mb-0'>
                            <span> Iva (22%) </span>
                            <span>{priceFormatter(orderDetails?.iva)}</span>
                        </p>
                        <p className="d-flex justify-content-between fw-bold mb-0">
                            <span>Totale Finale</span>
                            <span>{priceFormatter(orderDetails?.total)}</span>
                        </p>
                    </div>

                    <div className={`mt-4 p-4 border border-success rounded bg-light text-center ${styles.compactImpact}`}>
                        <i className="bi bi-heart-fill text-success icon-lg"></i>
                        <h5 className="text-success mt-2 mb-2">Un acquisto con un impatto reale</h5>
                        <p className="mb-0 text-muted">
                            Grazie per aver scelto di proteggere i nostri oceani. Con questo ordine,
                            hai dato nuova vita
                            a <strong>{weightFormatter(orderDetails?.total_plastic)} kg di plastica</strong> che
                            non inquineranno più il mare.
                        </p>
                    </div>

                    <button
                        className={`btn btn-pay fw-bold px-4 py-2 mt-4 ${styles.continueButton}`}
                        onClick={() => window.location.href = '/'}
                    >
                        Continua lo shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmation;
