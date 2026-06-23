import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import logo from '../assets/logoneutro.png'

function Structure() {


  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-4">

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
                  <Link to="/about" className="nav-btn btn-sm btn-light text-dark">About</Link>
                </li>
              </ul>
            </div>


            {/* WISHLIST - agganciare wishlistItems dal context quando pronto */}
            <div className="nav-item">
              <Link to="/wishlist" className="nav-btn btn-sm btn-light text-dark position-relative">
                <i className="bi bi-heart-fill"></i>
                {/* {wishlistItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlistItems.length}
                      </span>)} */}
              </Link>
              <Link to="/cartpage" className="nav-btn btn-sm btn-light text-dark fw-bold">
                <i className="bi bi-cart-fill"></i>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="appbg">
        <Outlet />
      </main>

      <footer className="bg-secondary custom-footer px-4 py-4 mt-auto border-top">
        <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <a className="navbar-brand d-flex align-items-center gap-3 text-decoration-none text-dark" href="/">
            <div className="brand-text">
              <img style={{ width: '200px', borderRadius: '50px' }} src={logo} alt="Logo BB" />
            </div>
          </a>
          <ul className="nav align-items-center gap-3 flex-wrap justify-content-center">
            <li className="nav-item">
              <Link to="/privacy" className="text-decoration-none text-white fw-medium small px-2">
                Privacy Policy
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/AboutUs" className="text-decoration-none text-white fw-medium small px-2">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/terms" className="text-decoration-none text-white fw-medium small px-2">
                Terms of Service
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center gap-1 text-white fw-medium small px-2">
              <i className="bi bi-globe2 text-white"></i>
              <span>Florence, Italy</span>
            </li>
          </ul>

          <div className="text-white small">
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