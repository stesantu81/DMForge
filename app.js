/**
 * App - Modulo principale dell'applicazione
 * Punto di ingresso: inizializza tutti gli altri moduli
 * ed è chiamato subito dopo che tutti gli script sono caricati.
 */
const App = (() => {

    function showModule(name){
        const sections = document.querySelectorAll(".module");
        sections.forEach(section =>{
            section.classList.remove("active");
        });
        const target = document.getElementById("module-" + name);
        target.classList.add("active");                   

    }

    /**
     * Inizializza l'applicazione:
     * avvia i moduli necessari e imposta lo stato iniziale.
     */
    function init() {
        console.log("App started");
        CombatTracker.init(); // Carica lo stato del combat tracker dal localStorage

        const buttons = document.querySelectorAll("nav button");
        buttons.forEach(button =>{
            button.addEventListener('click',() =>{
               showModule(button.dataset.module);
               
            });
        });
    }

    // Espone solo init() all'esterno
    return { init };

})();

// Avvia l'applicazione non appena lo script viene caricato
App.init();