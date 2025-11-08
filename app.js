// ===== STATE MANAGEMENT =====
const state = {
  map: null,
  markers: {
    friends: [],
    bases: [],
    user: null,
  },
  selectedBaseId: null,
  showAllBases: false,
  travelMode: false,
  currentLocation: null,
  tempBaseLocation: null,
};

// ===== DATA =====
const data = {
  profile: {
    totalDistance: '124 km',
    basesVisited: 12,
    activeTime: '18 h',
    missionsCompleted: 9,
    mode: 'Normale',
    battery: 87,
    lastUpdate: new Date(),
  },
  friends: [
    {
      id: 'giulia',
      name: 'Giulia',
      activity: 'In bici – 18 km/h',
      location: { lat: 45.4642, lng: 9.19 },
      avatarColor: '#2563eb',
      status: 'Ultimo ping 1 min fa',
      backpack: [
        { id: 'bike-repair', name: 'Kit riparazione bici', emoji: '🔧', quantity: 1 },
        { id: 'water', name: 'Borraccia', emoji: '💧', quantity: 2 },
      ],
    },
    {
      id: 'mattia',
      name: 'Mattia',
      activity: 'A piedi – 5 km/h',
      location: { lat: 45.4668, lng: 9.1849 },
      avatarColor: '#16a34a',
      status: 'Ultimo ping ora',
      backpack: [
        { id: 'torch', name: 'Torcia LED', emoji: '🔦', quantity: 1 },
        { id: 'map', name: 'Mappa cartacea', emoji: '🗺️', quantity: 1 },
      ],
    },
    {
      id: 'sara',
      name: 'Sara',
      activity: 'In auto – 42 km/h',
      location: { lat: 45.4705, lng: 9.1803 },
      avatarColor: '#f97316',
      status: 'Ultimo ping 3 min fa',
      battery: 18,
      backpack: [
        { id: 'first-aid', name: 'Pronto soccorso', emoji: '⛑️', quantity: 1 },
      ],
    },
  ],
  myBackpack: [
    { id: 'powerbank', name: 'Powerbank 20000mAh', emoji: '🔋', quantity: 1 },
    { id: 'knife', name: 'Coltellino multiuso', emoji: '🔪', quantity: 1 },
    { id: 'flashlight', name: 'Torcia tattica', emoji: '🔦', quantity: 1 },
    { id: 'water', name: 'Bottiglia acqua', emoji: '💧', quantity: 2 },
    { id: 'food', name: 'Barrette energetiche', emoji: '🍫', quantity: 5 },
  ],
  bases: [
    {
      id: 'brera-lab',
      name: 'Base Brera Lab',
      emoji: '🏢',
      description: 'Quartier generale urbano con connessione rapida e rifornimenti smart.',
      location: { lat: 45.4725, lng: 9.189 },
      visibility: 'Team',
      lastVisit: 'Oggi, 14:10',
      tags: ['urbano', 'hub tecnologico'],
      inventory: ['Droni da ricognizione', 'Kit pronto soccorso', 'Batterie portatili'],
      notes: [
        { author: 'Giulia', message: 'Aggiornata la scorta di powerbank.' },
        { author: 'Mattia', message: 'Meeting con il gruppo alle 18:30.' },
      ],
      visitHistory: ['Oggi 14:10', 'Ieri 09:30', '2 giorni fa 16:45'],
    },
    {
      id: 'ticino-camp',
      name: 'Camp Ticino',
      emoji: '⛺',
      description: 'Base natura lungo il fiume, ideale per training e missioni outdoor.',
      location: { lat: 45.3271, lng: 8.8282 },
      visibility: 'Squadra ristretta',
      lastVisit: 'Ieri, 19:45',
      tags: ['foresta', 'allenamento'],
      inventory: ['Tende leggere', 'Filtri acqua', 'Radio UHF'],
      notes: [{ author: 'Sara', message: 'Verificare livello acqua nel serbatoio.' }],
      visitHistory: ['Ieri 19:45', '3 giorni fa 14:20'],
    },
    {
      id: 'lake-spot',
      name: 'Lago Segreto',
      emoji: '🏞️',
      description: 'Punto panoramico con accesso al lago per sessioni mattutine.',
      location: { lat: 45.9846, lng: 8.9698 },
      visibility: 'Solo io',
      lastVisit: '3 giorni fa',
      tags: ['costa', 'relax'],
      inventory: ['SUP gonfiabile', 'Thermos caffè', 'Kit fotografia'],
      notes: [],
      visitHistory: ['3 giorni fa 07:15', '1 settimana fa 06:45'],
    },
  ],
  missions: [
    {
      id: 'mission-01',
      title: 'Ride lungo i Navigli',
      status: 'In corso',
      progress: 'Tappa 2 di 4',
      objectives: [
        { text: 'Partenza da Darsena', completed: true },
        { text: 'Checkpoint Naviglio Grande', completed: true },
        { text: 'Pausa al Ponte delle Sirenette', completed: false },
        { text: 'Arrivo a Gaggiano', completed: false },
      ],
    },
    {
      id: 'mission-02',
      title: 'Ricognizione Brughiera',
      status: 'In partenza',
      progress: 'Briefing previsto alle 21:00',
      objectives: [
        { text: 'Pianificare percorso', completed: false },
        { text: 'Preparare equipaggiamento', completed: false },
      ],
    },
  ],
  alerts: [
    {
      id: 'alert-01',
      title: 'Batteria Sara 18%',
      detail: 'Ultimo aggiornamento 4 min fa, posizione stabile.',
      type: 'warning',
    },
    {
      id: 'alert-02',
      title: 'Mattia inattivo da 50 min',
      detail: 'Suggerita richiesta check-in rapido.',
      type: 'info',
    },
  ],
  chatMessages: [
    { id: 1, author: 'Giulia', message: 'Tutto pronto per stasera!', time: '10:30', own: false },
    { id: 2, author: 'Tu', message: 'Perfetto, ci vediamo alle 18:30 alla base', time: '10:32', own: true },
    { id: 3, author: 'Mattia', message: 'Porto le mappe aggiornate', time: '10:35', own: false },
  ],
  badges: [
    { id: 'explorer', name: 'Esploratore', icon: '🗺️', earned: true },
    { id: 'marathoner', name: '100km', icon: '🏃', earned: true },
    { id: 'social', name: 'Social', icon: '👥', earned: true },
    { id: 'night-owl', name: 'Nottambulo', icon: '🦉', earned: false },
    { id: 'adventurer', name: 'Avventuriero', icon: '⛰️', earned: false },
    { id: 'survivor', name: 'Survivor', icon: '🏕️', earned: false },
  ],
};

// ===== INITIALIZATION =====
function init() {
  injectGoogleMaps();
  hydrateProfile();
  hydrateLists();
  hydrateBackpack();
  hydrateBadges();
  setupEventListeners();
  simulateBatteryDrain();
  simulateNotifications();
}

function injectGoogleMaps() {
  const fallback = document.getElementById('map-fallback');
  const apiKey =
    window.GOOGLE_MAPS_API_KEY || new URLSearchParams(window.location.search).get('gmaps-key');

  if (!apiKey) {
    fallback.hidden = false;
    return;
  }

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=geometry`;
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    fallback.hidden = false;
    fallback.querySelector('h2').textContent = 'Impossibile caricare Google Maps';
    fallback.querySelector('p').textContent =
      'Controlla la tua chiave API o la connessione di rete e ricarica la pagina.';
  };
  document.head.appendChild(script);
}

// ===== PROFILE & LISTS =====
function hydrateProfile() {
  const { profile } = data;
  const formatter = new Intl.DateTimeFormat('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });

  document.getElementById('total-distance').textContent = profile.totalDistance;
  document.getElementById('bases-visited').textContent = profile.basesVisited;
  document.getElementById('active-time').textContent = profile.activeTime;
  document.getElementById('missions-completed').textContent = profile.missionsCompleted;
  document.getElementById('mode-status').textContent = profile.mode;
  document.getElementById('battery-status').textContent = `${profile.battery}%`;
  document.getElementById('last-update').textContent = formatter.format(profile.lastUpdate);
}

function hydrateLists() {
  const friendList = document.getElementById('friend-list');
  const basesList = document.getElementById('bases-list');
  const missionsList = document.getElementById('missions-list');
  const alertsList = document.getElementById('alerts-list');
  const basesSummary = document.getElementById('bases-summary');

  friendList.innerHTML = data.friends
    .map(
      (friend) => `
        <li class="list-item" data-type="friend" data-id="${friend.id}">
          <div class="list-item__title">${friend.name}</div>
          <div class="list-item__meta">${friend.activity}</div>
          <div class="list-item__meta">${friend.status}</div>
        </li>
      `,
    )
    .join('');

  basesList.innerHTML = data.bases
    .map(
      (base) => `
        <li class="list-item" data-type="base" data-id="${base.id}">
          <div class="list-item__title">${base.emoji} ${base.name}</div>
          <div class="list-item__meta">${base.description}</div>
          <div class="list-item__meta">Visibilità: ${base.visibility}</div>
        </li>
      `,
    )
    .join('');

  missionsList.innerHTML = data.missions
    .map(
      (mission) => `
        <li class="list-item" data-type="mission" data-id="${mission.id}">
          <div class="list-item__title">${mission.title}</div>
          <div class="list-item__meta">${mission.status}</div>
          <div class="list-item__meta">${mission.progress}</div>
        </li>
      `,
    )
    .join('');

  alertsList.innerHTML = data.alerts
    .map(
      (alert) => `
        <li class="list-item" data-type="alert" data-id="${alert.id}">
          <div class="list-item__title">${alert.title}</div>
          <div class="list-item__meta">${alert.detail}</div>
        </li>
      `,
    )
    .join('');

  basesSummary.textContent = `${data.bases.length} basi salvate`;

  friendList.addEventListener('click', onListItemClick);
  basesList.addEventListener('click', onListItemClick);
}

function hydrateBackpack() {
  const backpackList = document.getElementById('backpack-list');
  const backpackCount = document.getElementById('backpack-count');

  const totalItems = data.myBackpack.reduce((sum, item) => sum + item.quantity, 0);
  backpackCount.textContent = `${totalItems} oggetti`;

  backpackList.innerHTML = data.myBackpack
    .map(
      (item) => `
        <li class="list-item">
          <div class="list-item__title">${item.emoji} ${item.name}</div>
          <div class="list-item__meta">Quantità: ${item.quantity}</div>
        </li>
      `,
    )
    .join('');
}

function hydrateBadges() {
  const badgesGrid = document.getElementById('badges-grid');

  badgesGrid.innerHTML = data.badges
    .map(
      (badge) => `
        <div class="badge-item ${badge.earned ? 'earned' : ''}">
          <span class="badge-item__icon">${badge.icon}</span>
          <div class="badge-item__name">${badge.name}</div>
        </div>
      `,
    )
    .join('');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Toggle travel mode
  document.getElementById('toggle-travel-mode').addEventListener('click', toggleTravelMode);

  // Open modals
  document.getElementById('open-backpack').addEventListener('click', () => openModal('backpack-modal'));
  document.getElementById('open-chat').addEventListener('click', () => openModal('chat-modal'));
  document.getElementById('add-friend').addEventListener('click', () => openModal('add-friend-modal'));
  document.getElementById('create-base').addEventListener('click', () => openModal('create-base-modal'));
  document.getElementById('add-item').addEventListener('click', () => openModal('add-item-modal'));
  document.getElementById('add-item-modal').addEventListener('click', () => openModal('add-item-modal'));

  // Close modals
  document.querySelectorAll('.close-button, .modal').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target === el || e.target.classList.contains('close-button')) {
        const modalId = e.target.closest('.modal')?.id || e.target.dataset.modal;
        if (modalId) closeModal(modalId);
      }
    });
  });

  // Close modal on ghost button click
  document.querySelectorAll('.ghost-button[data-modal]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(btn.dataset.modal);
    });
  });

  // Chat
  document.getElementById('send-message').addEventListener('click', sendChatMessage);
  document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

  // Add friend
  document.getElementById('add-friend-submit').addEventListener('click', addFriend);
  document.getElementById('copy-invite').addEventListener('click', copyInviteCode);

  // Create base
  document.getElementById('base-form').addEventListener('submit', createBase);
  document.getElementById('use-current-location').addEventListener('click', useCurrentLocation);

  // Add item
  document.getElementById('item-form').addEventListener('submit', addItemToBackpack);

  // Base toggle
  document.getElementById('toggle-bases').addEventListener('click', () => {
    state.showAllBases = !state.showAllBases;
    document.getElementById('toggle-bases').textContent = state.showAllBases
      ? 'Mostra vicino a me'
      : 'Mostra tutte';
    if (state.map) {
      fitBaseMarkers();
    }
  });

  // Tag selection in create base form
  document.querySelectorAll('.tag-selectable').forEach((tag) => {
    tag.addEventListener('click', () => {
      tag.classList.toggle('selected');
    });
  });
}

// ===== TRAVEL MODE =====
function toggleTravelMode() {
  state.travelMode = !state.travelMode;
  const btn = document.getElementById('toggle-travel-mode');
  const modeStatus = document.getElementById('mode-status');

  if (state.travelMode) {
    btn.classList.add('active');
    modeStatus.textContent = 'In giro';
    data.profile.mode = 'In giro';
    showToast('Modalità "In giro" attivata', 'I tuoi amici vedono che sei in movimento', 'info');
  } else {
    btn.classList.remove('active');
    modeStatus.textContent = 'Normale';
    data.profile.mode = 'Normale';
    showToast('Modalità normale', 'Tracking standard riattivato', 'info');
  }
}

// ===== MODALS =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add('is-open');

  // Load specific content
  if (modalId === 'chat-modal') {
    loadChatMessages();
  } else if (modalId === 'backpack-modal') {
    loadBackpackModal();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('is-open');
}

// ===== CHAT =====
function loadChatMessages() {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = data.chatMessages
    .map(
      (msg) => `
        <div class="chat-message ${msg.own ? 'own' : ''}">
          <div class="chat-message__author">${msg.author}</div>
          <div class="chat-message__bubble">${msg.message}</div>
          <div class="chat-message__time">${msg.time}</div>
        </div>
      `,
    )
    .join('');

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Clear badge
  document.getElementById('chat-badge').textContent = '0';
  document.getElementById('chat-badge').style.display = 'none';
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (!message) return;

  const now = new Date();
  const time = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

  data.chatMessages.push({
    id: Date.now(),
    author: 'Tu',
    message: message,
    time: time,
    own: true,
  });

  input.value = '';
  loadChatMessages();

  // Simulate response
  setTimeout(() => {
    const responses = [
      'Ricevuto!',
      'Perfetto 👍',
      'Va bene, ci vediamo lì',
      'Ok, aggiorno la mia posizione',
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    data.chatMessages.push({
      id: Date.now(),
      author: data.friends[0].name,
      message: randomResponse,
      time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      own: false,
    });

    loadChatMessages();
  }, 1500);
}

// ===== BACKPACK =====
function loadBackpackModal() {
  const backpackGrid = document.getElementById('backpack-modal-grid');

  backpackGrid.innerHTML = data.myBackpack
    .map(
      (item) => `
        <div class="backpack-item">
          <button class="backpack-item__remove" onclick="removeItem('${item.id}')">&times;</button>
          <span class="backpack-item__emoji">${item.emoji}</span>
          <div class="backpack-item__name">${item.name}</div>
          <div class="backpack-item__quantity">x${item.quantity}</div>
        </div>
      `,
    )
    .join('');
}

function removeItem(itemId) {
  const index = data.myBackpack.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    const item = data.myBackpack[index];
    data.myBackpack.splice(index, 1);
    loadBackpackModal();
    hydrateBackpack();
    showToast('Oggetto rimosso', `${item.name} rimosso dallo zaino`, 'info');
  }
}

function addItemToBackpack(e) {
  e.preventDefault();

  const name = document.getElementById('item-name').value.trim();
  const quantity = parseInt(document.getElementById('item-quantity').value);
  const emoji = document.getElementById('item-emoji').value.trim() || '📦';

  if (!name) return;

  const newItem = {
    id: Date.now().toString(),
    name,
    emoji,
    quantity,
  };

  data.myBackpack.push(newItem);
  hydrateBackpack();
  loadBackpackModal();
  closeModal('add-item-modal');

  // Reset form
  document.getElementById('item-form').reset();

  showToast('Oggetto aggiunto', `${emoji} ${name} aggiunto allo zaino`, 'success');
}

// ===== FRIENDS =====
function addFriend() {
  const code = document.getElementById('friend-code').value.trim().toUpperCase();

  if (!code) {
    showToast('Errore', 'Inserisci un codice amico valido', 'error');
    return;
  }

  if (code === 'TERRA-5678-EFGH') {
    showToast('Errore', 'Non puoi aggiungere te stesso!', 'error');
    return;
  }

  // Simulate adding friend
  const newFriend = {
    id: Date.now().toString(),
    name: 'Nuovo Amico',
    activity: 'Offline',
    location: { lat: 45.464, lng: 9.188 },
    avatarColor: '#9333ea',
    status: 'Aggiunto ora',
    backpack: [],
  };

  data.friends.push(newFriend);
  hydrateLists();
  closeModal('add-friend-modal');

  document.getElementById('friend-code').value = '';

  showToast('Amico aggiunto!', `${newFriend.name} è stato aggiunto alla tua squadra`, 'success');

  // Redraw markers if map is loaded
  if (state.map) {
    drawFriendMarkers();
  }
}

function copyInviteCode() {
  const code = document.getElementById('my-invite-code').textContent;

  navigator.clipboard
    .writeText(code)
    .then(() => {
      showToast('Codice copiato!', 'Condividilo con i tuoi amici', 'success');
    })
    .catch(() => {
      showToast('Errore', 'Impossibile copiare il codice', 'error');
    });
}

// ===== BASES =====
function createBase(e) {
  e.preventDefault();

  const name = document.getElementById('base-name').value.trim();
  const description = document.getElementById('base-description').value.trim();
  const emoji = document.getElementById('base-emoji').value.trim() || '📍';
  const visibility = document.getElementById('base-visibility').value;

  const selectedTags = Array.from(document.querySelectorAll('.tag-selectable.selected')).map(
    (tag) => tag.dataset.category,
  );

  if (!name) {
    showToast('Errore', 'Inserisci un nome per la base', 'error');
    return;
  }

  const location = state.tempBaseLocation || state.currentLocation || { lat: 45.464, lng: 9.19 };

  const newBase = {
    id: Date.now().toString(),
    name,
    emoji,
    description: description || 'Nessuna descrizione',
    location,
    visibility,
    lastVisit: 'Mai',
    tags: selectedTags,
    inventory: [],
    notes: [],
    visitHistory: [],
  };

  data.bases.push(newBase);
  hydrateLists();
  closeModal('create-base-modal');

  // Reset form
  document.getElementById('base-form').reset();
  document.querySelectorAll('.tag-selectable').forEach((tag) => tag.classList.remove('selected'));
  state.tempBaseLocation = null;

  showToast('Base creata!', `${emoji} ${name} aggiunta alle tue basi`, 'success');

  // Redraw markers if map is loaded
  if (state.map) {
    drawBaseMarkers();
  }
}

function useCurrentLocation() {
  if (state.currentLocation) {
    state.tempBaseLocation = state.currentLocation;
    showToast('Posizione impostata', 'Utilizzo la tua posizione corrente', 'success');
  } else {
    showToast('Posizione non disponibile', 'Attendi la geolocalizzazione', 'warning');
  }
}

// ===== MAP =====
function initializeMap() {
  const milan = { lat: 45.4642, lng: 9.19 };
  state.map = new google.maps.Map(document.getElementById('map'), {
    center: milan,
    zoom: 12,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
  });

  addCurrentLocation();
  drawFriendMarkers();
  drawBaseMarkers();
  updateLastUpdateTime();

  // Click to add base location
  state.map.addListener('click', (e) => {
    if (document.getElementById('create-base-modal').classList.contains('is-open')) {
      state.tempBaseLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      showToast('Posizione selezionata', 'Punto sulla mappa salvato', 'info');
    }
  });
}

function addCurrentLocation() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      state.currentLocation = location;

      const marker = new google.maps.Marker({
        position: location,
        map: state.map,
        title: 'La mia posizione',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#2563eb',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        },
        zIndex: 1000,
      });

      state.markers.user = marker;

      const infoWindow = new google.maps.InfoWindow({
        content: '<strong>Sei qui</strong><br />Tracciamento attivo',
      });

      marker.addListener('click', () => infoWindow.open({ map: state.map, anchor: marker }));

      // Center on user location
      state.map.panTo(location);
      state.map.setZoom(13);
    },
    () => {
      console.warn('Geolocalizzazione non disponibile.');
    },
  );
}

function drawFriendMarkers() {
  const infoWindow = new google.maps.InfoWindow();
  state.markers.friends.forEach((marker) => marker.setMap(null));
  state.markers.friends = data.friends.map((friend) => {
    const marker = new google.maps.Marker({
      position: friend.location,
      map: state.map,
      title: friend.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: friend.avatarColor,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
    });

    marker.addListener('click', () => {
      const backpackInfo = friend.backpack
        .map((item) => `${item.emoji} ${item.name}`)
        .join(', ');
      const content = `
        <div style="padding: 8px;">
          <strong style="font-size: 1.1em;">${friend.name}</strong><br />
          <span style="color: #666;">${friend.activity}</span><br />
          <small style="color: #999;">${friend.status}</small>
          ${backpackInfo ? `<br /><br /><strong>Equipaggiamento:</strong><br />${backpackInfo}` : ''}
        </div>
      `;
      infoWindow.setContent(content);
      infoWindow.open({ map: state.map, anchor: marker });
    });

    return marker;
  });
}

function drawBaseMarkers() {
  const infoWindow = new google.maps.InfoWindow();
  state.markers.bases.forEach((marker) => marker.setMap(null));
  state.markers.bases = data.bases.map((base) => {
    const marker = new google.maps.Marker({
      position: base.location,
      map: state.map,
      title: base.name,
      label: {
        text: base.emoji,
        fontSize: '20px',
      },
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="white" stroke="#2563eb" stroke-width="3"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20),
      },
    });

    marker.addListener('click', () => {
      infoWindow.setContent(`
        <div style="padding: 8px;">
          <strong style="font-size: 1.1em;">${base.emoji} ${base.name}</strong><br />
          <span style="color: #666;">${base.description}</span><br />
          <small style="color: #999;">Ultima visita: ${base.lastVisit}</small>
        </div>
      `);
      infoWindow.open({ map: state.map, anchor: marker });
      selectBase(base.id);
    });

    return marker;
  });

  fitBaseMarkers();
}

function fitBaseMarkers() {
  if (!state.markers.bases.length) return;

  const bounds = new google.maps.LatLngBounds();
  const canMeasure = Boolean(google.maps?.geometry?.spherical?.computeDistanceBetween);

  state.markers.bases.forEach((marker, index) => {
    const base = data.bases[index];
    if (!state.showAllBases && base.id !== state.selectedBaseId && canMeasure) {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        marker.getPosition(),
        state.map.getCenter(),
      );
      if (distance > 40000) return;
    }
    bounds.extend(marker.getPosition());
  });

  if (bounds.isEmpty()) {
    state.markers.bases.forEach((marker) => bounds.extend(marker.getPosition()));
  }
}

function updateLastUpdateTime() {
  document.getElementById('last-update').textContent = new Intl.DateTimeFormat('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}

// ===== LIST INTERACTIONS =====
function onListItemClick(event) {
  const item = event.target.closest('.list-item');
  if (!item) return;

  const { type, id } = item.dataset;

  if (type === 'base') {
    selectBase(id);
  } else if (type === 'friend') {
    focusFriend(id);
  }
}

function focusFriend(friendId) {
  const friend = data.friends.find((entry) => entry.id === friendId);
  if (!friend || !state.map) return;

  state.map.panTo(friend.location);
  state.map.setZoom(15);
}

function selectBase(baseId) {
  state.selectedBaseId = baseId;
  highlightBaseListItem(baseId);
  const base = data.bases.find((entry) => entry.id === baseId);
  if (!base) return;

  renderBaseDetail(base);
  if (state.map) {
    state.map.panTo(base.location);
    state.map.setZoom(14);
  }
}

function highlightBaseListItem(baseId) {
  document.querySelectorAll('#bases-list .list-item').forEach((item) => {
    item.classList.toggle('is-active', item.dataset.id === baseId);
  });
}

function renderBaseDetail(base) {
  const container = document.getElementById('base-detail');
  container.innerHTML = `
    <div class="base-detail__header">
      <div>
        <h3>${base.emoji} ${base.name}</h3>
        <p class="list-item__meta">${base.description}</p>
      </div>
      <span class="badge">${base.visibility}</span>
    </div>
    <div class="base-detail__meta">
      <div>
        <p class="label">Coordinate</p>
        <p class="value">${base.location.lat.toFixed(4)}, ${base.location.lng.toFixed(4)}</p>
      </div>
      <div>
        <p class="label">Ultima visita</p>
        <p class="value">${base.lastVisit}</p>
      </div>
    </div>
    ${
      base.tags.length > 0
        ? `
      <div class="base-detail__inventory">
        <p class="label">Categorie</p>
        <div class="tag-group">
          ${base.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `
        : ''
    }
    <div class="base-detail__inventory">
      <p class="label">Inventario</p>
      ${
        base.inventory.length > 0
          ? `<div class="tag-group">
          ${base.inventory.map((item) => `<span class="tag">${item}</span>`).join('')}
        </div>`
          : '<p class="list-item__meta">Inventario vuoto</p>'
      }
    </div>
    ${
      base.visitHistory && base.visitHistory.length > 0
        ? `
      <div class="base-detail__notes">
        <p class="label">Cronologia visite</p>
        ${base.visitHistory.map((visit) => `<p class="list-item__meta">• ${visit}</p>`).join('')}
      </div>
    `
        : ''
    }
    <div class="base-detail__notes">
      <p class="label">Note</p>
      ${
        base.notes.length
          ? base.notes
              .map(
                (note) => `
                  <div class="note">
                    <strong>${note.author}</strong>
                    <span>${note.message}</span>
                  </div>
                `,
              )
              .join('')
          : '<p class="list-item__meta">Nessuna nota registrata.</p>'
      }
    </div>
  `;
}

// ===== NOTIFICATIONS =====
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toast-container');

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <div class="toast__icon">${icons[type]}</div>
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      <div class="toast__message">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function simulateBatteryDrain() {
  setInterval(() => {
    if (data.profile.battery > 15) {
      data.profile.battery -= 1;
      document.getElementById('battery-status').textContent = `${data.profile.battery}%`;
    }

    if (data.profile.battery === 20) {
      showToast('Batteria bassa', 'La tua batteria è al 20%, considera di ricaricare', 'warning');
    }

    if (data.profile.battery === 15) {
      showToast('Batteria critica', 'Batteria al 15%! Gli amici sono stati notificati', 'error');
    }
  }, 30000); // Every 30 seconds
}

function simulateNotifications() {
  // Simulate random notifications
  setInterval(() => {
    const notifications = [
      {
        title: 'Nuovo messaggio',
        message: 'Giulia ha inviato un messaggio',
        type: 'info',
      },
      {
        title: 'Checkpoint raggiunto',
        message: 'Mattia ha raggiunto il checkpoint "Naviglio Grande"',
        type: 'success',
      },
      {
        title: 'Base vicina',
        message: 'Sei a meno di 1km da "Camp Ticino"',
        type: 'info',
      },
    ];

    if (Math.random() > 0.7) {
      const notif = notifications[Math.floor(Math.random() * notifications.length)];
      showToast(notif.title, notif.message, notif.type);

      // Update chat badge
      if (notif.title === 'Nuovo messaggio') {
        const badge = document.getElementById('chat-badge');
        badge.style.display = 'block';
        const count = parseInt(badge.textContent) || 0;
        badge.textContent = count + 1;
      }
    }
  }, 45000); // Every 45 seconds
}

// ===== EXPORT =====
window.initMap = initializeMap;
window.removeItem = removeItem;
window.addEventListener('DOMContentLoaded', init);
