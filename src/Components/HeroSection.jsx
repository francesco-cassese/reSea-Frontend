import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section className={`${styles.hero} py-5`}>
            <div className="container">
                <div className="row align-items-center min-vh-75">

                    <div className="col-lg-6">
                        <span className="badge bg-success mb-3">
                            Sustainable Eyewear
                        </span>

                        <h1 className="display-3 fw-bold mb-4">
                            Vedi il mondo chiaramente,
                            <span className={styles.highlight}>
                                {" "}lascialo pulito.
                            </span>
                        </h1>

                        <p className={`${styles.lead} mb-4`}>
                            Trasformiamo plastica recuperata in occhiali premium
                            progettati per accompagnarti ogni giorno.
                        </p>

                        <Link to="/products" className="btn btn-dark btn-lg mb-3">
                            Scopri la collezione
                        </Link>
                    </div>

                    <div className="col-lg-6 text-center">
                        <img
                            src="/images/about-hero.webp"
                            alt="ReSea Eyewear"
                            className={`img-fluid ${styles.heroImage}`}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default HeroSection;