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

function weightFormatter(number, languageTag = 'it-IT') {

    const numericValue = parseFloat(number);

    if (isNaN(numericValue)) {
        console.error("Il valore passato non è un numero valido:", number);
        return "Peso non disponibile";
    }

    const formatter = new Intl.NumberFormat(languageTag, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
    });

    return formatter.format(numericValue);
}

const getFilterLabel = (category, search) => {
    let label = "prodotti";
    if (category !== "All") label += ` in "${category}"`;
    if (search) label += ` per "${search}"`;
    return label;
};

const formatCategoryName = (category) => {
    if (!category) return "";
    return category
        .replace(/-/g, ' ')// Sostituisco i trattini con spazi
        .replace(/^\w/, (c) => c.toUpperCase()); //Trasforma la prima lettera in maiuscola
};

export {
    priceFormatter,
    weightFormatter,
    getFilterLabel,
    formatCategoryName
};
