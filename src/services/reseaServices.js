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

export { fetchApi, priceFormatter };