import { useState, useEffect, useRef } from "react";
import { postAgentPrompt } from "../services/api.js";

function useAssistantChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            html: "<p>Ciao! Sono Nino Bell-IA. Posso supportarti sui prodotti.</p>"
        }
    ]);
    const [error, setError] = useState("");
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        const el = messagesContainerRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    };


    useEffect(() => {
        if (!isOpen) return;
        const rafID = requestAnimationFrame(scrollToBottom);
        const t = setTimeout(scrollToBottom, 120);
        return () => {
            cancelAnimationFrame(rafID);
            clearTimeout(t);
        }
    }, [messages, isOpen, loading]);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    async function handleSend(event) {
        event.preventDefault();
        const cleanPrompt = prompt.trim();

        if (!cleanPrompt) {
            setError("Scrivi un messaggio da inviare prima");
            return;
        }

        setError("");
        setLoading(true);
        setPrompt("");

        setMessages((prev) => [...prev, { role: "user", text: cleanPrompt }]);

        try {
            const result = await postAgentPrompt(cleanPrompt);
            const answerHtml =
                result?.data?.answerHtml || "<p>Non ho trovato una risposta utile.</p>";

            setMessages((prev) => [...prev, { role: "assistant", html: answerHtml }]);
        } catch (error) {
            setError(error?.message || "Errore durante la richiesta all'assistente.");
        } finally {
            setLoading(false);
        }
    }

    return {
        isOpen,
        toggleOpen,
        prompt,
        setPrompt,
        loading,
        messages,
        error,
        messagesContainerRef,
        handleSend
    };
}

export default useAssistantChat;
