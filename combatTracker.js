/**
 * CombatTracker - Modulo per la gestione del combattimento
 * Utilizza il pattern IIFE (Immediately Invoked Function Expression)
 * per incapsulare lo stato e i metodi, esponendo solo un'API pubblica.
 */
const CombatTracker = (() => {

    // Chiave usata per salvare/caricare i dati dal localStorage
    const STORAGE_KEY = 'combat.entities';

    // Array che contiene tutte le entità (personaggi, mostri, ecc.) nel combattimento
    let entities = [];

    /**
     * Carica lo stato del combattimento dal localStorage.
     * Viene chiamata all'avvio per ripristinare una sessione precedente.
     */
    function loadState() {
        entities = Storage.get(STORAGE_KEY,[]);
    }

    /**
     * Salva lo stato attuale del combattimento nel localStorage.
     * Viene chiamata ogni volta che lo stato cambia, per persistere i dati.
     */
    function saveState() {
        Storage.set(STORAGE_KEY,entities);

    }
    function init(){
        loadState();
    }

    // API pubblica del modulo: oggetto con i metodi accessibili dall'esterno
    return {init};

})();