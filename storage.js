/**
 * Storage - Modulo per la gestione del localStorage
 * Fornisce un'astrazione semplice e sicura attorno al localStorage,
 * usando un prefisso per isolare i dati dell'app dagli altri dati nel browser.
 */
const Storage = (() => {

    // Prefisso aggiunto a ogni chiave per evitare conflitti con altre app
    const PREFIX = 'dm-forge:';

    /**
     * Legge e deserializza un valore dal localStorage.
     * @param {string} key - La chiave da cercare (senza prefisso)
     * @param {*} fallback - Valore da restituire se la chiave non esiste o si verifica un errore
     * @returns {*} Il valore deserializzato, oppure il fallback
     */
    function get(key, fallback) {
        try {
            const raw = localStorage.getItem(PREFIX + key);
            // Se la chiave non esiste, localStorage restituisce null
            if (raw === null) {
                return fallback;
            }
            return JSON.parse(raw); // Deserializza il JSON salvato
        } catch (error) {
            console.error(error);
            return fallback; // In caso di JSON malformato, restituisce il fallback
        }
    }

    /**
     * Serializza e salva un valore nel localStorage.
     * @param {string} key - La chiave con cui salvare il valore (senza prefisso)
     * @param {*} value - Il valore da serializzare e salvare
     * @returns {boolean} true se l'operazione è riuscita, false altrimenti
     */
    function set(key, value) {
        try {
            localStorage.setItem(PREFIX + key, JSON.stringify(value)); // Serializza in JSON prima di salvare
            return true;
        } catch (error) {
            // Può fallire ad es. se il localStorage è pieno (QuotaExceededError)
            console.error(error);
            return false;
        }
    }

    /**
     * Rimuove una singola voce dal localStorage.
     * @param {string} key - La chiave da eliminare (senza prefisso)
     * @returns {boolean} true se l'operazione è riuscita, false altrimenti
     */
    function remove(key) {
        try {
            localStorage.removeItem(PREFIX + key);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Elimina tutte le voci nel localStorage che appartengono a questa app.
     * Filtra per prefisso per non toccare dati di altre applicazioni.
     */
    function clearAll() {
        Object.keys(localStorage)
            .filter(k => k.startsWith(PREFIX))   // Considera solo le chiavi dell'app
            .forEach(k => localStorage.removeItem(k)); // Le rimuove una per una
    }

    // Espone solo le funzioni pubbliche del modulo
    return { get, set, remove, clearAll };

})();

