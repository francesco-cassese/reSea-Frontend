const validatePayment = (cardNumber, expiry, cvv) => {

    const cleanCard = cardNumber.replace(/\s+/g, '');


    if (!/^\d+$/.test(cleanCard) || !/^\d+$/.test(cvv)) {
        return { isValid: false, message: "I campi devono contenere solo numeri." };
    }

    if (cleanCard.length !== 16) return { isValid: false, message: "Numero carta non valido (16 cifre)." };

    if (cvv.length !== 3) return { isValid: false, message: "Il CVV deve avere 3 cifre." };

    const [month, year] = expiry.split('/').map(Number);

    if (!month || !year || month < 1 || month > 12) {
        return { isValid: false, message: "Data di scadenza non valida (MM/AA)." };
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return { isValid: false, message: "Carta scaduta." };
    }

    return { isValid: true, message: null };
};

const simulatePaymentGateway = (cvv) => {

    return new Promise((resolve) => {
        setTimeout(() => {
            switch (cvv) {
                case '000':
                    resolve({ success: false, message: "Pagamento rifiutato: Fondi insufficienti." });
                    break;
                case '444':
                    resolve({ success: false, message: "Errore critico: Il gateway di pagamento non risponde." });
                    break;
                case '999':
                    resolve({ success: false, message: "Pagamento rifiutato: Carta scaduta." });
                    break;
                case '777':
                    resolve({ success: false, message: "Pagamento bloccato per motivi di sicurezza (Frodi)." });
                    break;
                case '555':
                    resolve({ success: false, message: "Errore di connessione al server. Riprova." });
                    break;
                default:

                    resolve({ success: true, message: null });
            }
        }, 1200);
    });
};

export {
    validatePayment,
    simulatePaymentGateway
};
