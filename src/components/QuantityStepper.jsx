function QuantityStepper({
    quantity,
    onIncrement,
    onDecrement,
    onRemove,
    wrapperClassName,
    buttonClassName,
    minusButtonClassName,
    plusButtonClassName,
    renderMinus,
    renderCenter,
    renderPlus,
    stopPropagation = false,
    preventDefault = false
}) {
    const withGuards = (action) => (event) => {
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        action();
    };

    return (
        <div className={wrapperClassName}>
            <button
                type="button"
                className={minusButtonClassName || buttonClassName}
                onClick={withGuards(() => (quantity === 1 ? onRemove() : onDecrement()))}
            >
                {renderMinus}
            </button>
            {renderCenter}
            <button
                type="button"
                className={plusButtonClassName || buttonClassName}
                onClick={withGuards(onIncrement)}
            >
                {renderPlus}
            </button>
        </div>
    );
}

export default QuantityStepper;
