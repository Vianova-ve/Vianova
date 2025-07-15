let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".nav-bar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("active");
};


//Rutas y mapa
const map = L.map('map').setView([10.698, -71.675], 14);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }
).addTo(map);

let marcadoresActuales = [];

const rutas = {
  "coromoto": {
    inicio: { nombre: "Zumaque", coord: [10.7053, -71.6878] },
    fin: { nombre: "Noriega", coord: [10.6900, -71.6660] }
  },

  "soler": {
    inicio: { nombre: "Av47K", coord: [10.5318134, -71.6835064] },
    fin: { nombre: "Av libertador", coord: [10.6394520, -71.6131229]}
  },
  "el silencio": {
    inicio: { nombre: "Farmacia Dr Galue", coord:  [10.5628127, -71.6592821]},
    fin: { nombre: "UNIR", coord: [10.6389162, -71.6069475]}
  },
  "sierra maestra": {
    inicio: { nombre: "Noriega", coord: [10.6900, -71.6660] },
    fin: { nombre: "Av libertador", coord: [10.6394520, -71.6131229]}
  },
  "san francisco": {
    inicio: { nombre: "Calle 162", coord: [10.5641050, -71.6219031]},
    fin: { nombre: "Calle 95", coord: [10.6434645, -71.6134994]}
  },
  "san felipe": {
    inicio: { nombre: "Km.4", coord: [10.5834150, -71.6499745]},
    fin: { nombre: "Calle 158", coord: [10.5710067, -71.6359505]}
 },
 "polar": {
    inicio: { nombre: "bilicuin", coord: [10.5311107, -71.6506125]},
    fin: { nombre: "Av libertador", coord: [10.6394520, -71.6131229]}
  },
};

function limpiarMarcadores() {
  marcadoresActuales.forEach(marker => map.removeLayer(marker));
  marcadoresActuales = [];
}

function mostrarRuta() {
  const entrada = document.getElementById("ruta").value.trim().toLowerCase();
  const ruta = rutas[entrada];

  limpiarMarcadores();

  if (ruta) {
    const marcadorInicio = L.marker(ruta.inicio.coord)
      .addTo(map)
      .bindPopup(`<b>Inicio: ${ruta.inicio.nombre}</b>`).openPopup();

    const marcadorFin = L.marker(ruta.fin.coord)
      .addTo(map)
      .bindPopup(`<b>Fin: ${ruta.fin.nombre}</b>`);

    let marcadoresRef = [];
    if (ruta.referencias && ruta.referencias.length > 0) {
      ruta.referencias.forEach(ref => {
        const marcador = L.marker(ref.coord)
          .addTo(map)
          .bindPopup(`<i>${ref.nombre}</i>`);
        marcadoresRef.push(marcador);
      });
    }

    marcadoresActuales = [marcadorInicio, marcadorFin, ...marcadoresRef];

    const grupo = L.featureGroup(marcadoresActuales);
    map.fitBounds(grupo.getBounds(), { padding: [50, 50] });

    document.getElementById("infoRuta").textContent =
      `Ruta cargada: ${ruta.inicio.nombre} → ${ruta.fin.nombre}`;
  } else {
    document.getElementById("infoRuta").textContent = "No se encontró esa ruta.";
  }
};
