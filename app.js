const state = {
  map: null,
  markers: {
    friends: [],
    bases: [],
  },
  selectedBaseId: null,
  showAllBases: false,
};

const data = {
  profile: {
    totalDistance: '124 km',
    basesVisited: 12,
    activeTime: '18 h',
    missionsCompleted: 9,
    mode: 'In giro',
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
    },
    {
      id: 'mattia',
      name: 'Mattia',
      activity: 'A piedi – 5 km/h',
      location: { lat: 45.4668, lng: 9.1849 },
      avatarColor: '#16a34a',
      status: 'Ultimo ping ora',
    },
    {
      id: 'sara',
      name: 'Sara',
      activity: 'In auto – 42 km/h',
      location: { lat: 45.4705, lng: 9.1803 },
      avatarColor: '#f97316',
      status: 'Ultimo ping 3 min fa',
    },
  ],
  bases: [
    {
      id: 'brera-lab',
      name: 'Base Brera Lab',
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
    },
    {
      id: 'ticino-camp',
      name: 'Camp Ticino',
      description: 'Base natura lungo il fiume, ideale per training e missioni outdoor.',
      location: { lat: 45.3271, lng: 8.8282 },
      visibility: 'Squadra ristretta',
      lastVisit: 'Ieri, 19:45',
      tags: ['foresta', 'allenamento'],
      inventory: ['Tende leggere', 'Filtri acqua', 'Radio UHF'],
      notes: [{ author: 'Sara', message: 'Verificare livello acqua nel serbatoio.' }],
    },
    {
      id: 'lake-spot',
      name: 'Lago Segreto',
      description: 'Punto panoramico con accesso al lago per sessioni mattutine.',
      location: { lat: 45.9846, lng: 8.9698 },
      visibility: 'Solo io',
      lastVisit: '3 giorni fa',
      tags: ['costa', 'relax'],
      inventory: ['SUP gonfiabile', 'Thermos caffè', 'Kit fotografia'],
      notes: [],
    },
  ],
  missions: [
    {
      id: 'mission-01',
      title: 'Ride lungo i Navigli',
      status: 'In corso',
      progress: 'Tappa 2 di 4',
    },
    {
      id: 'mission-02',
      title: 'Ricognizione Brughiera',
      status: 'In partenza',
      progress: 'Briefing previsto alle 21:00',
    },
  ],
  alerts: [
    {
      id: 'alert-01',
      title: 'Batteria Sara 18%',
      detail: 'Ultimo aggiornamento 4 min fa, posizione stabile.',
    },
    {
      id: 'alert-02',
      title: 'Mattia inattivo da 50 min',
      detail: 'Suggerita richiesta check-in rapido.',
    },
  ],
};

function init() {
  injectGoogleMaps();
  hydrateProfile();
  hydrateLists();
  setupBaseToggle();
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
          <div class="list-item__title">${base.name}</div>
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

function setupBaseToggle() {
  const toggleButton = document.getElementById('toggle-bases');
  toggleButton.addEventListener('click', () => {
    state.showAllBases = !state.showAllBases;
    toggleButton.textContent = state.showAllBases ? 'Mostra vicino a me' : 'Mostra tutte';
    if (state.map) {
      fitBaseMarkers();
    }
  });
}

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
    state.map.setZoom(13);
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
        <h3>${base.name}</h3>
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
    <div class="base-detail__inventory">
      <p class="label">Inventario</p>
      <div class="tag-group">
        ${base.inventory.map((item) => `<span class="tag">${item}</span>`).join('')}
      </div>
    </div>
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
}

function addCurrentLocation() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const marker = new google.maps.Marker({
        position: location,
        map: state.map,
        title: 'La mia posizione',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#2563eb',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: '<strong>Sei qui</strong><br />Tracciamento attivo',
      });

      marker.addListener('click', () => infoWindow.open({ map: state.map, anchor: marker }));
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
        scale: 6,
        fillColor: friend.avatarColor,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
    });

    marker.addListener('click', () => {
      infoWindow.setContent(
        `<strong>${friend.name}</strong><br />${friend.activity}<br /><small>${friend.status}</small>`,
      );
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
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png',
        scaledSize: new google.maps.Size(27, 43),
      },
    });

    marker.addListener('click', () => {
      infoWindow.setContent(`<strong>${base.name}</strong><br />${base.description}`);
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
      if (distance > 40000) return; // 40 km
    }
    bounds.extend(marker.getPosition());
  });

  if (bounds.isEmpty()) {
    state.markers.bases.forEach((marker) => bounds.extend(marker.getPosition()));
  }

  if (!bounds.isEmpty()) {
    state.map.fitBounds(bounds, { top: 24, right: 24, bottom: 24, left: 24 });
  }
}

function updateLastUpdateTime() {
  document.getElementById('last-update').textContent = new Intl.DateTimeFormat('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}

window.initMap = initializeMap;

window.addEventListener('DOMContentLoaded', init);
