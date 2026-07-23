const validatePhoneNumber = (phone) => {

    const cleanPhone = phone.replace(/[\s()-]+/g, '');

    if (!/^\+?\d+$/.test(cleanPhone)) {
        return { isValid: false, message: "Il numero di telefono può contenere solo cifre." };
    }

    if (cleanPhone.length < 9) {
        return { isValid: false, message: "Per favore, inserisci un numero di telefono valido." };
    }

    return { isValid: true, message: null };
};

export {
    validatePhoneNumber
};
