import { useState } from 'react';
import styles from './CheckoutForm.module.css';

function CheckoutForm({ onNext }) {
    const [formData, setFormData] = useState({
        client_name: '',
        email_client: '',
        shipping_address: '',
        billing_address: '',
        phone_number: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.phone_number.length < 9) {
            alert("Per favore, inserisci un numero di telefono valido.");
            return;
        }

        onNext(formData);
    };

    return (

        <form className={`${styles.form} needs-validation`} onSubmit={handleSubmit}>
            <h2 className="mb-4">Dove dobbiamo spedire?</h2>

            <div className="mb-3">
                <input
                    className={`${styles.input} form-control`}
                    name="client_name"
                    placeholder="Nome e Cognome"
                    onChange={handleChange}
                    required />
            </div>

            <div className="mb-3">
                <input
                    className={`${styles.input} form-control`}
                    name="email_client"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required />
            </div>

            <div className="mb-3">
                <input className={`${styles.input} form-control`}
                    name="shipping_address"
                    placeholder="Indirizzo di spedizione"
                    onChange={handleChange}
                    required />
            </div>

            <div className="mb-3">
                <input
                    className={`${styles.input} form-control`}
                    name="billing_address"
                    placeholder="Indirizzo di fatturazione"
                    onChange={handleChange}
                    required />
            </div>

            <div className="mb-3">
                <input
                    className={`${styles.input} form-control`}
                    name="phone_number"
                    placeholder="Telefono"
                    onChange={handleChange}
                    required />
            </div>

            <button className={`${styles.coralButton} btn btn-lg w-100 fw-bold`} type="submit">
                Continua
            </button>

        </form>
    );
}

export default CheckoutForm;

