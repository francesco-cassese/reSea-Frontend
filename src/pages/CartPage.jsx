import React from "react";

function CartPage() {
    return (
        <>
            <div className="container">
               <div className="min-vh-100 d-flex align-items-center justify-content-center p-4 cart-bg">
            <div style={{ width: "100%", maxWidth: "860px" }}>

                {/* header */}
                <div className="d-flex justify-content-between align-items-baseline mb-3">
                    <h2 className="fw-bold fs-4 m-0">Il tuo carrello</h2>
                    <span className="fw-semibold fs-5 text-primary">Totale: € 129,00</span>
                </div>

                {/* card */}
                <div className="d-flex align-items-center gap-4 p-3 rounded-4 shadow-sm cart-card">

                    {/* image */}
                    <div className="cart-img flex-shrink-0 rounded-3 bg-light" />

                    {/* info */}
                    <div className="flex-grow-1">
                        <h5 className="fw-bold mb-1">Barbados</h5>
                        <p className="text-muted small mb-2">Occhiali da sole unisex</p>

                        <div className="d-flex flex-column gap-1 mb-3">
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-shield-check text-secondary"></i>
                                <span className="small text-secondary">Protezione UV 100%</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-recycle text-secondary"></i>
                                <span className="small text-secondary">Materiali sostenibili</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-1">
                            <i className="bi bi-heart text-muted"></i>
                            <span className="small text-muted text-decoration-underline" style={{ cursor: "pointer" }}>
                                Sposta ai preferiti
                            </span>
                        </div>
                    </div>

                    {/* divider */}
                    <div className="vr mx-1" />

                    {/* actions */}
                    <div className="d-flex flex-column align-items-center gap-3" style={{ minWidth: "140px" }}>

                        <div className="d-flex align-items-center gap-2">
                            <div className="d-flex align-items-center gap-2 px-2 py-1 rounded-pill bg-light">
                                <button className="btn btn-sm rounded-circle cart-qty-btn">−</button>
                                <span className="fw-semibold small">1</span>
                                <button className="btn btn-sm rounded-circle cart-qty-btn">+</button>
                            </div>
                            <button className="btn btn-light rounded-3 p-2">
                                <i className="bi bi-trash text-secondary"></i>
                            </button>
                        </div>

                        <span className="fw-bold fs-5 text-primary">€ 129,00</span>

                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="checkout" defaultChecked={false} />
                            <label className="form-check-label small fw-medium" htmlFor="checkout">
                                Checkout
                            </label>
                        </div>

                    </div>

                </div>
            </div>
        </div>
            </div>

        </>
    )
}

export default CartPage;