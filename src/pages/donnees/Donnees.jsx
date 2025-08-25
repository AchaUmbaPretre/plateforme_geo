import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  ScaleControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen"; // si tu installes leaflet.fullscreen
import "leaflet.fullscreen/Control.FullScreen.css";
import L from "leaflet";

import LayersPanel from "../../components/layersPanel/LayersPanel";
import "./donnees.scss";

const { BaseLayer } = LayersControl;

const Donnees = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [date, setDate] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Simule un utilisateur abonné
  const userHasSubscription = false;

  // Données simulées
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

  // Filtres
  const filteredData = dataCards.filter((card) => {
    return (
      (search === "" || card.title.toLowerCase().includes(search.toLowerCase())) &&
      (region === "" || card.region.toLowerCase().includes(region.toLowerCase())) &&
      (date === "" || card.date === date) &&
      (selectedTypes.length === 0 || selectedTypes.includes(card.type))
    );
  });

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
        {/* FILTRES */}
        <div className="donnees_left">
          <h3 className="donnees_title">Filtres avancés</h3>
          {/* Barre de recherche */}
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
          {/* Types */}
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
          {/* Région */}
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
          {/* Date */}
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

        {/* RESULTATS + MAP */}
        <div className="donnees_right">
          <div className="donnees_top">
            <span className="donnees_results">
              Résultats : {filteredData.length} | Abonnement requis pour télécharger
            </span>
          </div>

          <div className="donnees__bottom">
            {/* Liste des cartes */}
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

            {/* Carte Leaflet PRO */}
            <div className="donnees__bottom_right">
              <MapContainer
                center={[-2.88, 23.65]} // RDC centre
                zoom={5}
                style={{ height: "500px", width: "100%", borderRadius: "12px" }}
                fullscreenControl={true}
              >
                {/* Contrôle Layers (basemaps) */}
                <LayersControl position="topright">
                  <BaseLayer checked name="Carte OpenStreetMap">
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

                {/* Markers dynamiques */}
                {filteredData.map((card) => (
                  <Marker key={card.id} position={card.coords}>
                    <Popup>
                      <b>{card.title}</b>
                      <br />
                      <i>{card.region} - {card.date}</i>
                      <br />
                      <img src={card.img} alt="" style={{ width: "120px", marginTop: "8px" }} />
                    </Popup>
                  </Marker>
                ))}

                {/* Echelle en bas à gauche */}
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
