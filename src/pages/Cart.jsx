import { Link } from "react-router-dom";
import CartList from "../Components/CartList.jsx"
import { useAppContext } from "../Context/AppContext";


function Cart() {
    const { cart } = useAppContext();
    let totale = 0;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].selected === true) {
            totale = totale + (Number(cart[i].price) * cart[i].quantity);
        }
    }

    const canProceed = cart.some((item) => item.selected === true);

    return (
        <>
            {cart.length === 0 ? (

                <div className="d-flex flex-column align-items-center justify-content-center py-5">
                    <i className="bi bi-cart text-warning" style={{ fontSize: '4rem' }}></i>
                    <h4 className="mt-3 text-dark">Il tuo carrello è attualmente vuoto</h4>
                </div>
            ) : (

                <div className="container">
                    <div className="d-flex align-items-center justify-content-center p-4 cart-bg">
                        <div style={{ width: "100%", maxWidth: "860px" }}>

                            {/* header */}
                            <div className="d-flex justify-content-between align-items-baseline mb-3">
                                <h2 className="fw-bold fs-4 m-0">Il tuo carrello:</h2>
                                <span className="fw-semibold fs-5 text-primary">
                                    Totale: € {totale.toFixed(2)}
                                </span>
                            </div>
                            {/* Lista prodotti nel carrello */}
                            <CartList />

                        </div>
                    </div>
                    <div className="w-100 d-flex align-items-center">
                        {canProceed ? (
                            <Link to="/checkout" className="btn btn-pay btn-md mt-2 mb-3 mx-auto">
                                Procedi al pagamento
                            </Link>
                        ) : (
                            <button className="btn btn-pay btn-md mt-2 mb-3 mx-auto" disabled>
                                Procedi al pagamento
                            </button>
                        )}
                    </div>
                </div>

            )}</>
    )
}

export default Cart;