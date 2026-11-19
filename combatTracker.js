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
        render();
    }
    function addEntity(data){
        const entity = {
        id:crypto.randomUUID(),
        name:data.name ,
        hpMax:Number(data.hp),
        initiative:Number(data.initiative) ,
        ac:Number(data.ac) ,
        hpCurrent:Number(data.hp) ,
        };
        entities.push(entity);
        entities.sort((a, b) => b.initiative - a.initiative);
        saveState();
        
    }
    function render(){
       const root = document.getElementById("module-combat");
       root.innerHTML = `
       <h2>Combat Tracker</h2>
       <input type="text" id="cf-name" placeholder="Nome" required>
       <input type="number" id="cf-hp" placeholder="HP" required>
       <input type="number" id="cf-init" placeholder="Initiative" required>
       <input type="number" id="cf-ac" placeholder="AC" required>
       <button id="cf-add">Add</button>
       <div id="entities">
       </div>
       `;
    }

    // API pubblica del modulo: oggetto con i metodi accessibili dall'esterno
    return {init, addEntity};

})();