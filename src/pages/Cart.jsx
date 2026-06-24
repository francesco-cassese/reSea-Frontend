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

    return (
        <>
            <div className="container">
                <div className="min-vh-100 d-flex align-items-center justify-content-center p-4 cart-bg">
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
                    <Link to="/checkout" className="btn btn-primary btn-md mt-2 mb-3 mx-auto">
                        Procedi al pagamento
                    </Link>
                </div>
            </div>

        </>
    )
}

export default Cart;