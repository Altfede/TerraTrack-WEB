# TerraTrack Web Demo

Demo web moderna di TerraTrack: una piattaforma sociale basata su mappe reali per seguire amici, basi e missioni direttamente dal browser desktop o mobile.

## Cosa include
- **Mappa Google Maps completa** con controlli standard, Street View e visualizzazione fullscreen.
- **Pannello laterale moderno** con statistiche personali, lista squadra, basi, missioni e avvisi in tempo reale (dati demo).
- **Dettagli base contestuali** con inventari, note e visibilità.
- **Supporto geolocalizzazione browser** per mostrare la tua posizione se concedi il permesso.

## Requisiti
Per utilizzare Google Maps è necessaria una chiave API JavaScript.

1. Crea un file facoltativo `config.js` accanto a `index.html` con:
   ```js
   window.GOOGLE_MAPS_API_KEY = 'LA_TUA_API_KEY';
   ```
   In alternativa avvia l'app con l'URL `?gmaps-key=LA_TUA_API_KEY`.
2. Abilita le API "Maps JavaScript" nella Google Cloud Console per la chiave scelta.

## Avvio locale
Avvia un semplice server statico e visita la pagina nel browser.

```bash
python -m http.server
```

Poi apri [http://localhost:8000](http://localhost:8000) e assicurati di aver configurato la chiave API.

## Struttura file
- `index.html` – layout della pagina e caricamento script.
- `styles.css` – tema moderno responsive per desktop e mobile.
- `app.js` – logica demo per popolare mappa, pannelli e interazioni.
- `config.js` – (opzionale, non incluso) definisce `window.GOOGLE_MAPS_API_KEY`.

## Note
I dati mostrati (amici, basi, missioni e avvisi) sono esempi statici per illustrare il flusso dell'interfaccia. Integra un backend o WebSocket per sostituirli con dati reali in tempo reale.
