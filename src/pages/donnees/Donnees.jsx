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
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import LayersPanel from "../../components/layersPanel/LayersPanel";
import "./donnees.scss";
import { getProvince, getType } from "../../services/type.service";
import { getDonnees } from "../../services/donnees.service";
import config from "../../config";

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
        : "/icons/Géographique"
        ? "/icons/map.png"
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
  const [regions, setRegions] = useState([]);
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;


  const userHasSubscription = false; // à gérer dynamiquement selon utilisateur

  // --- Récupération des données ---
  const fetchData = async () => {
    try {
      const [typeData, donneesData, regionData] = await Promise.all([
        getType(),
        getDonnees(),
        getProvince(),
      ]);

      setType(typeData.data);
      setData(donneesData.data);
      setRegions(regionData.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Filtrage dynamique ---
  const filteredData = data.filter((d) => {
    const dType = type.find((t) => t.id_type === d.id_type)?.nom_type || "Autres";
    return (
      (search === "" || d.titre.toLowerCase().includes(search.toLowerCase())) &&
      (region === "" || d.region.toLowerCase().includes(region.toLowerCase())) &&
      (date === "" || d.date_collecte.split("T")[0] === date) &&
      (selectedTypes.length === 0 || selectedTypes.includes(dType))
    );
  });

  const toggleType = (typeName) => {
    if (selectedTypes.includes(typeName)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== typeName));
    } else {
      setSelectedTypes([...selectedTypes, typeName]);
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
            {type.map((t) => (
              <div className="donnees_check_row" key={t.id_type}>
                <input
                  type="checkbox"
                  id={`type-${t.id_type}`}
                  checked={selectedTypes.includes(t.nom_type)}
                  onChange={() => toggleType(t.nom_type)}
                />
                <label htmlFor={`type-${t.id_type}`} className="donnees_check_desc">
                  {t.nom_type}
                </label>
              </div>
            ))}
          </div>

          <div className="donnees_filtre">
            <label className="donnees_label">Région</label>
            <select
              className="donnees_input"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">Toutes les régions</option>
              {regions.map((r) => (
                <option key={r.id} value={r.name_fr}>
                  {r.name_fr}
                </option>
              ))}
            </select>
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
              {filteredData.map((d) => {
                const dType = type.find((t) => t.id_type === d.id_type)?.nom_type || "Autres";
                const requiresSubscription = d.acces === "abonne";
                return (
                  <div className="donnees__left_card" key={d.id_donnee}>
                    <span className="donnees__title_card">
                      {d.titre} ({dType}, {d.region}, {d.date_collecte.split("T")[0]})
                    </span>
                    <div className="donnees_row">
                      <div className="donnees_card_vignette">
                        <img
                          src={`${DOMAIN}/${d.vignette_url}`}
                          alt="aperçu données"
                        />
                      </div>
                      <div className="donnees_card_info">
                        <p className="donnees_desc">{d.description}</p>
                        <div className="donnees_card_btn">
                          <button className="detail_btn primary">Voir le détail</button>
                          <button
                            className="detail_btn secondary"
                            disabled={requiresSubscription && !userHasSubscription}
                            title={requiresSubscription ? "Abonnement requis" : ""}
                          >
                            Télécharger
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* --- Carte Leaflet pro avec cluster --- */}
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

                <MarkerClusterGroup>
                  {filteredData.map((d) => {
                    const dType = type.find((t) => t.id_type === d.id_type)?.nom_type || "Autres";
                    return (
                      <Marker
                        key={d.id_donnee}
                        position={[d.latitude, d.longitude]}
                        icon={getIconByType(dType)}
                      >
                        <Popup>
                          <b>{d.titre}</b>
                          <br />
                          <i>{d.region} - {d.date_collecte.split("T")[0]}</i>
                          <br />
                          <img
                            src={d.vignette_url || "/previews/default.png"}
                            alt=""
                            style={{ width: "120px", marginTop: "8px" }}
                          />
                        </Popup>
                      </Marker>
                    );
                  })}
                </MarkerClusterGroup>

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
