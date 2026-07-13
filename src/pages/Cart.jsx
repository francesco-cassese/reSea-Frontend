import { Link } from "react-router-dom";
import CartList from "../components/CartList.jsx"
import { useAppContext } from "../context/AppContext.jsx";
import { priceFormatter } from "../services/formatters.js";
import { calculateOrderTotals } from "../services/orders.js";
import styles from "./Cart.module.css";


function Cart() {
    const { cart } = useAppContext();
    const { subtotal: totale } = calculateOrderTotals(cart);

    return (
        <>
            {cart.length === 0 ? (

                <div className="d-flex flex-column align-items-center justify-content-center py-5">
                    <i className="bi bi-cart text-warning icon-xl"></i>
                    <h4 className="mt-3 text-dark">Il tuo carrello è attualmente vuoto</h4>
                </div>
            ) : (

                <div className="container">
                    <div className="d-flex align-items-center justify-content-center p-4 cart-bg">
                        <div className={styles.cartWrapper}>

                            {/* header */}
                            <div className="d-flex justify-content-between align-items-baseline">
                                <h2 className="fw-bold fs-4 m-0 mb-3 ms-2">Il tuo carrello:</h2>
                            </div>
                            {/* Lista prodotti nel carrello */}
                            <CartList />
                            <div className="d-flex justify-content-end me-2">

                                <span className="fw-semibold fs-5 text-muted me-2">
                                    Totale:
                                </span>

                                <span className="fw-bold fs-5 text-dark">
                                    {priceFormatter(totale)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 d-flex align-items-center">

                        <Link to="/checkout" className="btn btn-pay fw-bold btn-md mt-2 mb-3 mx-auto">
                            Procedi al pagamento
                        </Link>

                    </div>
                </div>

            )}</>
    )
}

export default Cart;