import useAssistantChat from "../hooks/useAssistantChat.js";
import styles from "./AssistantWidget.module.css";

function AssistantWidget() {
    const {
        isOpen,
        toggleOpen,
        prompt,
        setPrompt,
        loading,
        messages,
        error,
        messagesContainerRef,
        handleSend
    } = useAssistantChat();

    return (
        <aside className={styles.assistantWidget}>
            <button
                type="button"
                onClick={toggleOpen}
                className={styles.assistantWidgetToggle + " " + (isOpen ? styles.desktopOpen : styles.desktopClosed) }
                aria-expanded={isOpen}
                aria-controls="assistant-widget-panel"
                aria-label={isOpen ? "Chiudi chat" : "Apri chat"}
            >
                {isOpen ? (
                    <span className={styles.toggleLabel}>Chiudi chat</span>
                ):(
                    <img 
                        src="/images/no-sfondo-avatar.png"
                        alt="Avatar GretAI" 
                        className={styles.assistantAvatar}
                        />
                )}
                
                <i className={`bi bi-chat-left ${styles.toggleIcon}`} aria-hidden="true"></i>
            </button>

            {isOpen && (
                <section id="assistant-widget-panel" className={`${styles.assistantWidgetPanel} card mt-2`}>
                    <header className={styles.assistantWidgetHeader}>
                        <h2 className={styles.assistantWidgetTitle}>GretAI Thun</h2>
                        <p className={styles.assistantWidgetSubtitle}>Risposte rapide sul catalogo</p>
                    </header>

                    <div className={styles.assistantWidgetMessages} ref={messagesContainerRef}>
                        {messages.map((message, index) => (
                            <article key={index} className={`${styles.assistantBubble} ${message.role === "user" ? styles.assistantBubbleUser : styles.assistantBubbleAi}`}>
                                <p className={styles.assistantBubbleLabel}>{message.role === "user" ? "Tu" : "GretAI Thun"}</p>
                                {message.role === "user" ? (
                                    <p className={styles.assistantBubbleText}>{message.text}</p>
                                ) : (
                                    <div className={styles.assistantBubbleText} dangerouslySetInnerHTML={{ __html: message.html }}></div>
                                )}
                            </article>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className={styles.assistantWidgetForm}>
                        <textarea
                            className={styles.assistantWidgetTextarea}
                            rows={3}
                            placeholder="Scrivi qui la tua domanda..."
                            value={prompt}
                            onChange={(event) => setPrompt(event.target.value)}
                            disabled={loading}
                        />
                        <div className={styles.assistantWidgetActions}>
                            <button type="submit" className={styles.assistantWidgetSend} disabled={loading}>
                                {loading ? "Invio..." : "Invia"}
                            </button>
                        </div>
                        {error ? <p className={styles.assistantWidgetError}>{error}</p> : null}
                    </form>
                </section>
            )}
        </aside>
    );
}

export default AssistantWidget;