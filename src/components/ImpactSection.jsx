import styles from "./ImpactSection.module.css";


function ImpactSection() {
    return (
        <section className={`${styles.impactSection} py-5`}>
            <div className="container text-center">

                <h2 className={`display-5 fw-bold mb-5 ${styles.textTitle}`}>
                    Insieme stiamo facendo la differenza
                </h2>

                <div className="row">

                    <div className={`col-md-4 ${styles.impactCard}`}>
                        <h3 className={`display-4 ${styles.impactNumber}`}>
                            1.250+
                        </h3>
                        <p className={styles.impactLabel}>
                            Kg di plastica recuperata
                        </p>
                    </div>

                    <div className={`col-md-4 ${styles.impactCard}`}>
                        <h3 className={`display-4 ${styles.impactNumber}`}>
                            900+
                        </h3>
                        <p className={styles.impactLabel}>
                            Clienti coinvolti
                        </p>
                    </div>

                    <div className={`col-md-4 ${styles.impactCard}`}>
                        <h3 className={`display-4 ${styles.impactNumber}`}>
                            100%
                        </h3>
                        <p className={styles.impactLabel}>
                            Materiali riciclati
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default ImpactSection;