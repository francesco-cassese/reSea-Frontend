const BASE_URL = "http://localhost:3000";

async function fetchApi(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
}

function priceFormatter(number, languageTag = 'it-IT', currency = 'EUR') {

    const numericValue = parseFloat(number);

    if (isNaN(numericValue)) {
        console.error("Il valore passato non è un numero valido:", number);
        return "Prezzo non disponibile";
    }

    const formatter = new Intl.NumberFormat(languageTag, {
        style: 'currency',
        currency: currency,
    });

    return formatter.format(numericValue);
}

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

const getFilterLabel = (category, search, min, max) => {
    let label = "prodotti";
    if (category !== "All") label += ` in "${category}"`;
    if (search) label += ` per "${search}"`;
    if (min || max) {
        label += " con prezzo";
        if (min) label += ` da ${min}€`;
        if (max) label += ` a ${max}€`;
    }
    return label;
};

const formatCategoryName = (category) => {
    if (!category) return "";
    return category
        .replace(/-/g, ' ')// Sostituisco i trattini con spazi
        .replace(/^\w/, (c) => c.toUpperCase()); //Trasforma la prima lettera in maiuscola
};

async function postAgentPrompt(prompt) {
    const response = await fetch(`${BASE_URL}/agent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({prompt})
    });

    let result = null;
    try {
        result = await response.json();
    }catch{
        result = null;
    }

    if(!response.ok){
        const serverMessage = result?.message || `HTTP Error: ${response.status}`;
        throw new Error(serverMessage);
    }

    return result;
}

export { fetchApi, priceFormatter, validatePayment, simulatePaymentGateway, postAgentPrompt, getFilterLabel, formatCategoryName };

