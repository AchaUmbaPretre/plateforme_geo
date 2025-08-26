import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  ScaleControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";

import LayersPanel from "../../components/layersPanel/LayersPanel";
import "./donnees.scss";
import { getType } from "../../services/type.service";
import { getDonnees } from "../../services/donnees.service";

// --- Fix icônes par défaut Leaflet ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// --- Icônes par type de données ---
const getIconByType = (type) => {
  return new L.Icon({
    iconUrl:
      type === "Géologique"
        ? "/icons/geology.png"
        : type === "Hydrologique"
        ? "/icons/water.png"
        : type === "Forage"
        ? "/icons/drill.png"
        : type === "Pétrolier"
        ? "/icons/oil.png"
        : "/icons/default.png",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],
    shadowAnchor: [14, 41],
  });
};

const { BaseLayer } = LayersControl;

const Donnees = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [type, setType] = useState([]);
  const [data, setData] = useState([]);

  const userHasSubscription = false;

  const fetchData = async() => {
    try {
      const [ typeData, donneesData ] = await Promise.all([
        getType(),
        getDonnees()
      ])

      setType(typeData.data)
      setData(donneesData.data)

    } catch (error) {
      console.log(error)
    }
  }



  // --- Données simulées ---
  const dataCards = [
    {
      id: 1,
      title: "Carte géologique Katanga",
      type: "Géologique",
      region: "Katanga",
      date: "2025-08-20",
      description: "Carte détaillée des formations géologiques du Katanga.",
      img: "/previews/geologie.png",
      coords: [-11.68, 27.48],
      requiresSubscription: true,
    },
    {
      id: 2,
      title: "Carte hydrologique Kivu",
      type: "Hydrologique",
      region: "Kivu",
      date: "2025-07-15",
      description: "Cours d'eau et lacs de la région du Kivu.",
      img: "/previews/cours_eau.png",
      coords: [-1.68, 29.22],
      requiresSubscription: false,
    },
    {
      id: 3,
      title: "Forages Haut-Uele",
      type: "Forage",
      region: "Haut-Uele",
      date: "2025-05-10",
      description: "Données des forages hydrogéologiques.",
      img: "/previews/forage.png",
      coords: [3.5, 28.4],
      requiresSubscription: true,
    },
  ];

  // --- Filtrage dynamique ---
  const filteredData = dataCards.filter(
    (card) =>
      (search === "" || card.title.toLowerCase().includes(search.toLowerCase())) &&
      (region === "" || card.region.toLowerCase().includes(region.toLowerCase())) &&
      (date === "" || card.date === date) &&
      (selectedTypes.length === 0 || selectedTypes.includes(card.type))
  );

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="donnees">
      <div className="donnees_wrapper">
        {/* --- FILTRES --- */}
        <div className="donnees_left">
          <h3 className="donnees_title">Filtres avancés</h3>

          <div className="donnees_filtre">
            <label className="donnees_label">Recherche</label>
            <input
              type="search"
              placeholder="Rechercher..."
              className="donnees_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="donnees_type_card">
            <span className="donnees_span">Type des données</span>
            {["Géographique", "Géologique", "Hydrologique", "Forage", "Pétrolier", "Autres"].map(
              (type, index) => (
                <div className="donnees_check_row" key={index}>
                  <input
                    type="checkbox"
                    id={`type-${index}`}
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                  <label htmlFor={`type-${index}`} className="donnees_check_desc">
                    {type}
                  </label>
                </div>
              )
            )}
          </div>

          <div className="donnees_filtre">
            <label className="donnees_label">Région</label>
            <input
              type="text"
              placeholder="Ex: Kivu, Katanga..."
              className="donnees_input"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>

          <div className="donnees_filtre">
            <label className="donnees_label">Date</label>
            <input
              type="date"
              className="donnees_input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button className="donnees_btn">Appliquer les filtres</button>
        </div>

        {/* --- RESULTATS + MAP --- */}
        <div className="donnees_right">
          <div className="donnees_top">
            <span className="donnees_results">
              Résultats : {filteredData.length} | Abonnement requis pour télécharger
            </span>
          </div>

          <div className="donnees__bottom">
            {/* --- Liste des cartes --- */}
            <div className="donnees__bottom_left">
              {filteredData.map((card) => (
                <div className="donnees__left_card" key={card.id}>
                  <span className="donnees__title_card">
                    {card.title} ({card.type}, {card.region}, {card.date})
                  </span>
                  <div className="donnees_row">
                    <div className="donnees_card_vignette">
                      <img src={card.img} alt="aperçu données" />
                    </div>
                    <div className="donnees_card_info">
                      <p className="donnees_desc">{card.description}</p>
                      <div className="donnees_card_btn">
                        <button className="detail_btn primary">Voir le détail</button>
                        <button
                          className="detail_btn secondary"
                          disabled={card.requiresSubscription && !userHasSubscription}
                          title={card.requiresSubscription ? "Abonnement requis" : ""}
                        >
                          Télécharger
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- Carte Leaflet pro --- */}
            <div className="donnees__bottom_right">
              <MapContainer
                center={[-2.88, 23.65]}
                zoom={5}
                style={{ height: "500px", width: "100%", borderRadius: "12px" }}
                fullscreenControl={true}
              >
                <LayersControl position="topright">
                  <BaseLayer checked name="OpenStreetMap">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  </BaseLayer>
                  <BaseLayer name="Satellite ESRI">
                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                  </BaseLayer>
                  <BaseLayer name="Carto Light">
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                  </BaseLayer>
                  <BaseLayer name="Carto Dark">
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                  </BaseLayer>
                </LayersControl>

                {filteredData.map((card) => (
                  <Marker key={card.id} position={card.coords} icon={getIconByType(card.type)}>
                    <Popup>
                      <b>{card.title}</b>
                      <br />
                      <i>{card.region} - {card.date}</i>
                      <br />
                      <img src={card.img} alt="" style={{ width: "120px", marginTop: "8px" }} />
                    </Popup>
                  </Marker>
                ))}

                <ScaleControl position="bottomleft" />
              </MapContainer>

              {/* Panneau de couches personnalisé */}
              <LayersPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donnees;
