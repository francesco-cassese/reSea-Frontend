import { useState } from 'react';
import styles from './CheckoutForm.module.css';
import { validatePhoneNumber } from '../services/validators.js';

function FormField({ label, name, type = 'text', placeholder, onChange }) {
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={name}>{label}</label>
            <input
                className={`${styles.input} form-control`}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                required />
        </div>
    );
}

function CheckoutForm({ onNext }) {
    const [formData, setFormData] = useState({
        client_name: '',
        email_client: '',
        shipping_address: '',
        billing_address: '',
        phone_number: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);

        const validation = validatePhoneNumber(formData.phone_number);

        if (!validation.isValid) {
            setError(validation.message);
            return;
        }

        onNext(formData);
    };

    return (

        <form className={`${styles.form} needs-validation`} onSubmit={handleSubmit}>
            <h2 className="mb-4">Dove dobbiamo spedire?</h2>

            <FormField
                label="Nome e Cognome"
                name="client_name"
                placeholder="Nome e Cognome"
                onChange={handleChange}
            />

            <FormField
                label="Email"
                name="email_client"
                type="email"
                placeholder="Email"
                onChange={handleChange}
            />

            <FormField
                label="Indirizzo di spedizione"
                name="shipping_address"
                placeholder="Indirizzo di spedizione"
                onChange={handleChange}
            />

            <FormField
                label="Indirizzo di fatturazione"
                name="billing_address"
                placeholder="Indirizzo di fatturazione"
                onChange={handleChange}
            />

            <FormField
                label="Telefono"
                name="phone_number"
                placeholder="Telefono"
                onChange={handleChange}
            />

            {error && <div className="alert alert-danger">{error}</div>}

            <button className={`${styles.coralButton} btn btn-lg w-100 fw-bold`} type="submit">
                Continua
            </button>

        </form>
    );
}

export default CheckoutForm;

