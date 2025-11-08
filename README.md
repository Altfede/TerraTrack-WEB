# TerraTrack Web

**TerraTrack** è una piattaforma sociale basata su mappe reali che combina il tracciamento preciso degli amici in tempo reale con un sistema di equipaggiamento virtuale e basi personalizzate. Perfetta per esploratori, gruppi di amici e avventurieri.

## ✨ Funzionalità Principali

### 🗺️ Mappa Interattiva in Tempo Reale
- Visualizza la tua posizione e quella dei tuoi amici su una mappa Google Maps
- Marker personalizzati con colori distintivi per ogni persona
- Visualizzazione dettagli amici con equipaggiamento e stato
- Click sulla mappa per aggiungere nuove basi

### 👥 Sistema Amici
- Aggiungi amici tramite codice invito univoco
- Condividi il tuo codice personalizzato
- Visualizza posizione, velocità e mezzo di trasporto degli amici
- Vedi l'equipaggiamento che ogni amico porta con sé

### 🎒 Zaino Virtuale
- Gestisci il tuo equipaggiamento personale
- Aggiungi oggetti con emoji personalizzate
- Visualizza quantità e tipologia
- Rimuovi oggetti facilmente
- Gli amici possono vedere cosa porti con te

### 📍 Sistema Basi
- Crea basi personalizzate con nome, emoji e descrizione
- Categorie: urbano, foresta, costa, montagna
- Imposta visibilità (solo io, team, squadra ristretta)
- Inventario dedicato per ogni base
- Cronologia visite con timestamp
- Note collaborative condivise
- Coordinate GPS precise

### 💬 Chat di Squadra
- Chat in tempo reale con il team
- Messaggi istantanei con timestamp
- Badge di notifica per nuovi messaggi
- Risposte simulate interattive

### 🧭 Modalità "In Giro"
- Attiva la modalità viaggio per segnalare che sei in movimento
- Notifica automatica agli amici
- Tracking avanzato quando sei in viaggio

### 🏆 Badge e Traguardi
- Colleziona badge completando obiettivi
- Esploratore, Maratoneta (100km), Social
- Nottambulo, Avventuriero, Survivor
- Visualizzazione guadagni con effetti grafici

### 📊 Statistiche Personali
- Distanza totale percorsa
- Basi visitate
- Tempo di attività
- Missioni completate
- Livello batteria in tempo reale

### 🎯 Missioni Collaborative
- Crea e partecipa a missioni di gruppo
- Obiettivi a tappe
- Tracciamento progresso
- Sistema di checkpoint

### 🔔 Sistema Notifiche
- Notifiche toast per eventi importanti
- Avvisi batteria bassa per te e i tuoi amici
- Notifiche inattività prolungata
- Alert quando sei vicino a una base
- Messaggi in tempo reale

### 📱 Design Moderno
- Interfaccia pulita e professionale
- Stile bianco/chiaro moderno (no dark hacker)
- Completamente responsive
- Animazioni fluide e intuitive
- Glassmorphism e blur effects

## 🚀 Avvio Rapido

### Prerequisiti
Per utilizzare Google Maps è necessaria una chiave API:

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto
3. Abilita **Maps JavaScript API** e **Geocoding API**
4. Genera una chiave API

### Configurazione

**Opzione 1:** Crea un file `config.js` nella root del progetto:
```javascript
window.GOOGLE_MAPS_API_KEY = 'LA_TUA_API_KEY';
```

**Opzione 2:** Passa la chiave come parametro URL:
```
http://localhost:8000?gmaps-key=LA_TUA_API_KEY
```

### Avvio Locale

**Con Python:**
```bash
python -m http.server 8000
```

**Con Node.js:**
```bash
npx http-server -p 8000
```

**Con PHP:**
```bash
php -S localhost:8000
```

Poi apri il browser su: `http://localhost:8000`

## 📁 Struttura Progetto

```
TerraTrack-WEB/
├── index.html          # Struttura principale dell'app
├── styles.css          # Stili moderni e responsive
├── app.js              # Logica completa dell'applicazione
├── config.js           # (opzionale) Configurazione API key
└── README.md           # Documentazione
```

## 🎮 Come Usare TerraTrack

### 1. Aggiungi Amici
- Clicca su "Aggiungi amico" nel pannello Squadra
- Inserisci il codice amico oppure condividi il tuo codice
- Codice esempio: `TERRA-5678-EFGH`

### 2. Gestisci lo Zaino
- Clicca sull'icona zaino nell'header
- Aggiungi oggetti con nome, emoji e quantità
- Rimuovi oggetti passando il mouse e cliccando la X

### 3. Crea una Base
- Clicca "Nuova base" nel pannello Basi
- Inserisci nome, descrizione ed emoji
- Scegli categoria e visibilità
- Usa posizione corrente o clicca sulla mappa

### 4. Attiva Modalità "In Giro"
- Clicca l'icona navigazione nell'header
- La modalità si attiva (icona blu)
- I tuoi amici vedono che sei in movimento

### 5. Chatta con il Team
- Clicca l'icona chat (badge rosso mostra messaggi non letti)
- Scrivi e invia messaggi
- Ricevi risposte simulate in tempo reale

### 6. Esplora la Mappa
- Click su marker amici: vedi dettagli ed equipaggiamento
- Click su basi: visualizza info e inventario
- Click sulla lista amici/basi: centra la mappa su quel punto

## 🎨 Personalizzazione

### Modificare Colori
Modifica le variabili CSS in `styles.css`:
```css
:root {
  --accent: #2563eb;        /* Colore principale */
  --background: #f5f7fb;    /* Sfondo */
  --surface: #ffffff;       /* Superfici */
}
```

### Aggiungere Dati Demo
Modifica l'oggetto `data` in `app.js` per cambiare:
- Amici di esempio
- Basi predefinite
- Badge disponibili
- Messaggi chat

## 🔧 Tecnologie Utilizzate

- **HTML5** - Struttura semantica
- **CSS3** - Animazioni, Grid, Flexbox, Glassmorphism
- **JavaScript ES6+** - Logica applicazione
- **Google Maps JavaScript API** - Mappa interattiva
- **Font: Inter** - Typography moderna

## 🌐 Browser Supportati

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📝 Note Implementazione

### Dati Demo
Tutti i dati mostrati (amici, basi, missioni, chat) sono **esempi statici** per dimostrare il flusso dell'interfaccia.

Per una versione production:
- Integra un backend (Node.js, Python, PHP)
- Usa WebSocket per aggiornamenti real-time
- Implementa autenticazione utenti
- Database per persistenza dati (MongoDB, PostgreSQL)
- Tracking GPS reale con geolocalizzazione

### Limitazioni Browser
- **Geolocalizzazione**: richiede HTTPS in produzione
- **Notifiche Push**: non implementate (solo toast UI)
- **Tracking GPS continuo**: simulato per demo

## 🔐 Sicurezza

⚠️ **Importante**:
- Non committare la tua API key nel codice
- Usa variabili d'ambiente in produzione
- Imposta restrizioni API nella Google Console
- Abilita solo i domini autorizzati

## 🐛 Troubleshooting

**Mappa non si carica:**
- Verifica la chiave API
- Controlla che Maps JavaScript API sia abilitata
- Verifica la console browser per errori

**Geolocalizzazione non funziona:**
- Assicurati di usare HTTPS
- Dai il permesso al browser
- Alcuni browser bloccano la geolocalizzazione su HTTP locale

**Notifiche non appaiono:**
- Le notifiche sono simulate (toast UI)
- Per notifiche browser reali serve Service Worker

## 🚧 Sviluppi Futuri

- [ ] Backend real-time con WebSocket
- [ ] Autenticazione utenti
- [ ] Upload foto per basi
- [ ] Percorsi tracciati storici
- [ ] Export GPX dei viaggi
- [ ] Notifiche push reali
- [ ] App mobile nativa (React Native)
- [ ] Condivisione social media
- [ ] Modalità offline con Service Worker

## 📄 Licenza

Progetto demo per scopi educativi e di portfolio.

## 👨‍💻 Contatti

Creato con ❤️ per esploratori e avventurieri digitali.

---

**TerraTrack** - *Il tuo mondo, tracciato e condiviso.*
