import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import logo from '../assets/logoneutro.png';
import { priceFormatter } from "../services/reseaServices.js";
import { useRef, useEffect } from "react";
import styles from "./Structure.module.css";

function Structure() {
  const { cart, totalQuantity, removeHandler, wishlist, addHandler, updateQuantity } = useAppContext();

  let totale = 0;

  for (let i = 0; i < cart.length; i++) {
    let prezzoProdotto = Number(cart[i].price);
    let quantitaProdotto = cart[i].quantity;
    totale += prezzoProdotto * quantitaProdotto;
  }

  const endOfListRef = useRef(null);
  const navMenuRef = useRef(null);

  const prevCartLength = useRef(cart.length);

  useEffect(() => {

    if (cart.length > prevCartLength.current) {
      endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    prevCartLength.current = cart.length;
  }, [cart]);

  useEffect(() => {
    // Recuperiamo il riferimento al menu dal DOM tramite la ref
    const el = navMenuRef.current;

    // Controllo di sicurezza: se l'elemento non esiste, usciamo subito
    if (!el) return;

    // Questa è la nostra "mossa": quando Bootstrap sta per chiudere il menu,
    // aggiungiamo la classe 'is-closing'. Questa classe avvia l'animazione lenta.
    const handleHide = () => el.classList.add('is-closing');

    // Questa è la "pulizia": una volta che il menu è sparito del tutto,
    // togliamo la classe 'is-closing' così è pronto per quando lo riaprirai.
    const handleHidden = () => el.classList.remove('is-closing');

    // Qui diciamo al menu: "Ascolta cosa dice Bootstrap!"
    // "Quando senti che Bootstrap sta iniziando a chiudere il menu ('hide'),
    // esegui la funzione handleHide (che aggiunge la classe per l'animazione lenta)"
    el.addEventListener('hide.bs.collapse', handleHide);

    // "Quando senti che Bootstrap ha finito di chiudere il menu ('hidden'),
    // esegui la funzione handleHidden (che pulisce la classe per il prossimo uso)"
    el.addEventListener('hidden.bs.collapse', handleHidden);


    // Se il componente scompare dalla pagina, smettiamo di ascoltare 
    // (per evitare di consumare memoria inutilmente)
    return () => {
      el.removeEventListener('hide.bs.collapse', handleHide);
      el.removeEventListener('hidden.bs.collapse', handleHidden);
    };
  }, []);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-white px-4">

          <Link className="navbar-brand" to="/homepage">
            <img className={styles.logoNav} src={logo} alt="Logo" />
          </Link>

          <button
            className={`navbar-toggler ${styles.toggleBtn}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
            {totalQuantity > 0 && <span className={styles.mobileMenuDot} aria-hidden="true"></span>}
          </button>

          <div className="collapse navbar-collapse" id="navMenu" ref={navMenuRef}>
            <div className={`${styles.menuLinks} mx-auto w-100 d-flex justify-content-center`}>
              <ul className="navbar-nav d-flex flex-column flex-sm-row gap-3">
                <li className="nav-item">
                  <Link to="/homepage" className={`${styles.navBtn} ${styles.navBtnText} text-center`}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className={`${styles.navBtn} ${styles.navBtnText} text-center`}>Prodotti</Link>
                </li>
                <li className="nav-item">
                  <Link to="/aboutUs" className={`${styles.navBtn} ${styles.navBtnText} text-center`}>La Nostra Realtà</Link>
                </li>
              </ul>
            </div>


            {/* WISHLIST - agganciare wishlistItems dal context quando pronto */}

            <div className="d-flex justify-content-end gap-2 mt-3 mt-lg-0">
              <div className="position-relative">
                <Link to="/wishlist" className={styles.navBtn}>
                  <i className="bi bi-heart-fill"></i>
                </Link>
                {wishlist.length > 0 && (
                  <span className={`position-absolute badge rounded-pill bg-danger ${styles.badgeWishlist}`}>
                    {wishlist.length}
                  </span>
                )}
              </div>

              <div className="dropdown d-inline-block">
                <div className="position-relative">
                  <button
                    className={`${styles.navBtn} dropdown-toggle`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-cart-fill"></i>
                  </button>

                  {totalQuantity > 0 && (
                    <span className={`position-absolute badge rounded-pill bg-danger ${styles.badgeCart}`}>
                      {totalQuantity}
                    </span>
                  )}


                  <ul
                    className={`dropdown-menu dropdown-menu-end ${styles.cartMenuContainer} p-3 mt-3`}>

                    {/* lista prodotti */}
                    <li className="dropdown-item-text text-muted small mb-2">Il tuo carrello</li>

                    {/* placeholder per i prodotti */}
                    <li className={styles.cartProductsScroll}>
                      {cart.length > 0 ? (
                        cart.map((product) => (
                          <div key={product.id} className="dropdown-item-text">
                            <div className="d-flex align-items-center gap-2 py-1">
                              <img src={product.image} alt={product.name} className={styles.cartThumb} />
                              <div className={styles.cartInfo}>
                                <p className="mb-0 small fw-bold">
                                  {product.name}
                                </p>
                                <p className="mb-0 small text-muted">{priceFormatter(product.price)}</p>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <button
                                  className={`btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center ${styles.cartQtyBtnSize}`}
                                  onClick={(e) => { e.stopPropagation(); product.quantity === 1 ? removeHandler(product.id) : updateQuantity(product.id, -1); }}
                                >
                                  {product.quantity === 1 ? <i className="bi bi-trash3-fill"></i> : "-"}
                                </button>

                                <span className="fw-bold text-center mx-1">
                                  {product.quantity}
                                </span>

                                <button
                                  className={`btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center ${styles.cartQtyBtnSize}`}
                                  onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, +1); }}
                                >
                                  +
                                </button>
                              </div>

                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-item-text text-muted small">è vuoto</div>
                      )}

                      <div ref={endOfListRef} />
                    </li>

                    {cart.length > 0 && (
                      <>
                        <li><hr className="dropdown-divider" /></li>
                        <li className="px-3 py-2 d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Totale:</span>
                          <span className="fw-bold text-primary">{priceFormatter(totale)}</span>
                        </li>
                        <li>
                          <Link to="/cart" className={`btn ${styles.btnCartnav} w-100 btn-sm fw-bold`}>
                            Vai al carrello
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header >

      <main className={styles.appBg}>
        <Outlet />
      </main>

      <footer className="custom-footer px-4 py-4 mt-auto border-top">

        {/* Brand + Social: colonna su mobile/tablet, riga da desktop */}
        <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <a className="navbar-brand d-flex align-items-center gap-2 text-decoration-none text-dark" href="/">
            <img className={styles.footerLogo} src={logo} alt="Logo BB" />
            <span className="d-flex align-items-center gap-1 text-dark fw-medium small">
              <i className="bi bi-globe2 text-dark"></i>
              Florence, Italy
            </span>
          </a>

          <div className="d-flex flex-column align-items-center gap-2">
            <span className="text-dark fw-bold small">Follow us</span>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                <i className="bi bi-tiktok"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Link legali: riga centrata a tutta larghezza su ogni breakpoint */}
        <ul className="nav align-items-center gap-3 flex-wrap justify-content-center mt-3">
          <li>
            <Link to="/privacy" className="text-decoration-none text-dark fw-medium small px-2">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/AboutUs" className="text-decoration-none text-dark fw-medium small px-2">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/terms" className="text-decoration-none text-dark fw-medium small px-2">
              Terms of Service
            </Link>
          </li>
        </ul>

        <hr className="my-3" />

        <div className="text-center text-dark small">
          <span>© {new Date().getFullYear()} reSea.</span>
        </div>

      </footer>
    </>
  )
}

export default Structure;