import styles from "./CTASection.module.css";
import { Link } from "react-router-dom";

function CTASection() {
    return (
        <section className="py-5 text-center bg-light">
            <div className="container">

                <h2 className={`${styles.title} mb-3`}>
                    Ogni scelta conta.
                </h2>

                <p className={`${styles.lead} mb-4`}>
                    Scegli occhiali che fanno bene ai tuoi occhi
                    e al pianeta.
                </p>

                <Link to='/products' className="btn btn-pay btn-lg fw-bold">
                    Acquista ora
                </Link>

            </div>
        </section>
    );
}

export default CTASection;