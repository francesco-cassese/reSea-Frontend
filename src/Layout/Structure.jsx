import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import logo from '../assets/logoneutro.png'

function Structure() {
  const { cart, totalQuantity, removeHandler, wishlist } = useAppContext();


  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-white px-4">

          <Link className="navbar-brand" to="/homepage">
            <img className="logo-nav" src={logo} alt="Logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <div className="menu-links mx-auto">
              <ul className="navbar-nav  mb-2 mb-lg-0 d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
                <li className="nav-item">
                  <Link to="/homepage" className="nav-btn btn-sm btn-light text-dark">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-btn btn-sm btn-light text-dark">Prodotti</Link>
                </li>
                <li className="nav-item">
                  <Link to="/aboutUs" className="nav-btn btn-sm btn-light text-dark">La Nostra Realtà</Link>
                </li>
              </ul>
            </div>


            {/* WISHLIST - agganciare wishlistItems dal context quando pronto */}
            <div className="nav-item d-flex gap-3">
              <Link
                to="/wishlist"
                className="nav-btn btn-sm btn-light text-dark position-relative"
                style={{ overflow: 'visible' }}
              >
                <i className="bi bi-heart-fill"></i>
                {wishlist.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 10 }}>
                    {wishlist.length}
                  </span>
                )}
              </Link>


              <div className="dropdown position-relative d-inline-block">

                <button
                  className="nav-btn btn-sm dropdown-toggle position-relative"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ overflow: 'visible' }}
                >
                  <i className="bi bi-cart-fill ms-1"></i>
                  {totalQuantity > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 10 }}>
                      {totalQuantity}
                    </span>
                  )}
                </button>

                <ul className="dropdown-menu dropdown-menu-end p-3 mt-3" style={{ minWidth: "280px" }}>

                  {/* lista prodotti */}
                  <li className="dropdown-item-text text-muted small mb-2">Il tuo carrello</li>

                  {/* placeholder per i prodotti */}
                  {cart.length > 0 ? (
                    cart.map((product) => (
                      <li key={product.id} className="dropdown-item-text">
                        <div className="d-flex align-items-center gap-2 py-1">
                          <img src={product.image} alt={product.name} style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                          <div style={{ flexGrow: 1 }}>
                            <p className="mb-0 small fw-bold">
                              {product.name}
                              {product.quantity > 1 && <span className="text-muted ms-1">x{product.quantity}</span>}
                            </p>
                            <p className="mb-0 small text-muted">€ {Number(product.price).toFixed(2)}</p>
                          </div>

                          <button
                            className="btn btn-light rounded-3 p-2"
                            onClick={(event) => {
                              event.stopPropagation();
                              removeHandler(product.id);
                            }}>

                            <i className="bi bi-trash text-secondary"></i>
                          </button>

                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item-text text-muted small">Carrello vuoto</li>
                  )}

                  <li><hr className="dropdown-divider" /></li>

                  {/* btn pagina carrello */}
                  <li>
                    <Link to="/cart" className="btn btn-cartnav w-100 btn-sm">
                      Vai al carrello
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header >

      <main className="appbg">
        <Outlet />
      </main>

      <footer className="custom-footer px-4 py-4 mt-auto border-top">
        <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <a className="navbar-brand d-flex align-items-center gap-3 text-decoration-none text-dark" href="/">
            <div className="brand-text">
              <img style={{ width: '200px', borderRadius: '50px' }} src={logo} alt="Logo BB" />
            </div>
          </a>
          <ul className="nav align-items-center gap-3 flex-wrap justify-content-center">
            <li className="nav-item">
              <Link to="/privacy" className="text-decoration-none text-dark fw-medium small px-2">
                Privacy Policy
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/AboutUs" className="text-decoration-none text-dark fw-medium small px-2">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/terms" className="text-decoration-none text-dark fw-medium small px-2">
                Terms of Service
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center gap-1 text-dark fw-medium small px-2">
              <i className="bi bi-globe2 text-dark"></i>
              <span>Florence, Italy</span>
            </li>
          </ul>

          <div className="text-dark small">
            <span>© {new Date().getFullYear()} reSea.</span>
          </div>

        </div>

        <div className="d-flex flex-column align-items-center mt-3">
          <span className="text-dark fw-bold mb-2">Follow us</span>
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


      </footer>
    </>
  )
}

export default Structure;