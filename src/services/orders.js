const calculateOrderTotals = (items, ivaRate = 0.22) => {

    if (!items || !Array.isArray(items)) {
        return { subtotal: 0, iva: 0, total: 0 };
    }

    const subtotal = items.reduce((acc, item) => {
        const price = parseFloat(item.price) || 0;
        const qty = parseInt(item.quantity) || 0;

        return acc + (price * qty);
    }, 0);

    const iva = subtotal * ivaRate;
    const total = subtotal + iva;

    return { subtotal, iva, total };
};

export {
    calculateOrderTotals
};
