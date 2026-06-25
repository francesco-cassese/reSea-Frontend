import styles from "./MissionSection.module.css";

function MissionSection() {
    return (
        <section className={styles.sectionWrapper}>
            <div className="container">

                {/* Sezione 01 */}
                <div className={`row ${styles.rowStyle}`}>
                    <div className="col-md-6 order-md-2">
                        <div className={styles.textSide}>
                            <div className={styles.badge}>Sostenibilità</div>
                            <div className={styles.numberMarker}>01</div>
                            <h2 className="mb-3">
                                Rigenerazione <span className={styles.highlight}>Circolare</span>
                            </h2>
                            <p className={styles.lead}>Non creiamo plastica nuova.</p>
                            <p className={styles.textSecondary}>
                                Trasformiamo i polimeri marini recuperati in montature ad alte prestazioni,
                                chiudendo il cerchio tra rifiuto e design tecnologico.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 order-md-1">
                        <div className={styles.imageContainer}>
                            <img src="/images/percorso-materiali.webp" alt="Rigenerazione" />
                        </div>
                    </div>
                </div>

                {/* Sezione 02 */}
                <div className={`row ${styles.rowStyle}`}>
                    <div className="col-md-6">
                        <div className={styles.textSide}>
                            <div className={styles.badge}>Impatto</div>
                            <div className={styles.numberMarker}>02</div>
                            <h2 className="mb-3">
                                Impatto <span className={styles.highlight}>Certificato</span>
                            </h2>
                            <p className={styles.lead}>1kg di mare più pulito per ogni ordine.</p>
                            <p className={styles.textSecondary}>
                                Ogni paio di occhiali finanzia direttamente operazioni di recupero.
                                Garantiamo tracciabilità totale dal rifiuto al prodotto finito.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={styles.imageContainer}>
                            <img src="/images/percorso-impatto.webp" alt="Impatto" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default MissionSection;