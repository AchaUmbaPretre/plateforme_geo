import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Button,
  Tag,
  Spin,
  Alert,
  Dropdown,
  Menu,
  message,
  Tooltip,
} from "antd";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import * as docx from "docx";
import shpwrite from "shp-write";
import config from "../../../config";
import "./donneesOne.scss";
import { getDonneesOne } from "../../../services/donnees.service";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix pour l'icône par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const DonneesOne = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailRef = useRef(null);
  const imgRef = useRef(null);
  const searchParams = new URLSearchParams(location.search);
  const idDonnee = searchParams.get("id_donnee");
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [donnee, setDonnee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!idDonnee) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getDonneesOne(idDonnee);
      setDonnee(res?.data);
    } catch (err) {
      console.error(err);
      setError("Erreur de chargement du détail");
    } finally {
      setLoading(false);
    }
  }, [idDonnee]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ---------------- EXPORT HELPERS ---------------- */

  // PDF (capture DOM)
  const exportPDF = async () => {
    if (!donnee) return;
    setExporting(true);
    message.loading({ content: "Génération du PDF...", key: "export" });
    try {
      // aumenter scale pour meilleure résolution
      const element = detailRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      // calculer ratio pour garder les marges
      const imgProps = pdf.getImageProperties(imgData);
      const imgRatio = imgProps.width / imgProps.height;
      const pdfWidth = pageWidth - 20; // marges 10mm
      const pdfHeight = pdfWidth / imgRatio;

      let cursor = 10;
      pdf.addImage(imgData, "PNG", 10, cursor, pdfWidth, pdfHeight);
      // si le contenu dépasse une page, ajouter logique page multiples (simple découpage)
      // (amélioration possible : découpage vertical du canvas)
      pdf.save(`${sanitizeFilename(donnee.titre)}.pdf`);
      message.success({ content: "PDF prêt", key: "export", duration: 2 });
    } catch (err) {
      console.error(err);
      message.error({ content: "Erreur lors de la génération du PDF", key: "export" });
    } finally {
      setExporting(false);
    }
  };

  // Word (.docx)
  const exportWord = async () => {
    if (!donnee) return;
    setExporting(true);
    message.loading({ content: "Génération du document Word...", key: "export" });
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = docx;
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [new TextRun({ text: donnee.titre, bold: true })],
                heading: HeadingLevel.HEADING_1,
              }),
              new Paragraph({
                children: [
                  new TextRun(`${donnee.nom_type} • ${donnee.nom_pays} • ${donnee.name_fr}`),
                ],
              }),
              new Paragraph({ children: [new TextRun("")] }),
              // description : supprimer les tags HTML pour Word simple
              new Paragraph({
                children: [
                  new TextRun({
                    text: stripHtml(donnee.description).slice(0, 100000),
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${sanitizeFilename(donnee.titre)}.docx`);
      message.success({ content: "Document Word prêt", key: "export", duration: 2 });
    } catch (err) {
      console.error(err);
      message.error({ content: "Erreur lors de la génération Word", key: "export" });
    } finally {
      setExporting(false);
    }
  };

  // Excel (.xlsx)
  const exportExcel = () => {
    if (!donnee) return;
    setExporting(true);
    message.loading({ content: "Génération du fichier Excel...", key: "export" });
    try {
      // préparer objet plat pour excel (éviter nested)
      const excelObj = {
        id_donnee: donnee.id_donnee,
        titre: donnee.titre,
        type: donnee.nom_type,
        pays: donnee.nom_pays,
        localite: donnee.name_fr,
        date_collecte: donnee?.date_collecte,
        date_publication: donnee?.date_publication,
        acces: donnee?.acces,
        latitude: donnee?.latitude,
        longitude: donnee?.longitude,
        description: stripHtml(donnee?.description).slice(0, 32767), // excel cell limit safeguard
      };

      const ws = XLSX.utils.json_to_sheet([excelObj]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Donnée");
      XLSX.writeFile(wb, `${sanitizeFilename(donnee.titre)}.xlsx`);
      message.success({ content: "Excel prêt", key: "export", duration: 2 });
    } catch (err) {
      console.error(err);
      message.error({ content: "Erreur lors de la génération Excel", key: "export" });
    } finally {
      setExporting(false);
    }
  };

  // Shapefile (zip)
  const exportShapefile = () => {
    if (!donnee) return;
    setExporting(true);
    message.loading({ content: "Génération du Shapefile (zip)...", key: "export" });
    try {
      const features = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [parseFloat(donnee?.longitude), parseFloat(donnee?.latitude)],
            },
            properties: {
              id_donnee: donnee.id_donnee,
              titre: donnee.titre,
              type: donnee.nom_type,
              pays: donnee.nom_pays,
              localite: donnee.name_fr,
            },
          },
        ],
      };

      // shpwrite.zip retourne un Blob via callback ou direct (selon version) — on utilise la version sync qui renvoie un Blob-like (Uint8Array)
      // Ici on utilise shpwrite.zip(features) qui produit un object (dep selon version), on fait saveAs si c'est un Blob
      const options = { folder: "shapefile", types: { point: "points" } };
      const zipBuf = shpwrite.zip(features, options); // normalement Uint8Array / Blob
      // si zipBuf est Uint8Array -> convertir en Blob
      let blob;
      if (zipBuf instanceof Blob) {
        blob = zipBuf;
      } else {
        blob = new Blob([zipBuf], { type: "application/zip" });
      }
      saveAs(blob, `${sanitizeFilename(donnee.titre)}_shapefile.zip`);
      message.success({ content: "Shapefile prêt", key: "export", duration: 2 });
    } catch (err) {
      console.error(err);
      message.error({ content: "Erreur lors de la génération Shapefile", key: "export" });
    } finally {
      setExporting(false);
    }
  };

  /* ---------------- HELPERS ---------------- */
  const sanitizeFilename = (name = "export") =>
    name.replace(/[^a-z0-9_\-\.]/gi, "_").slice(0, 120);

  const stripHtml = (html = "") =>
    html.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ").trim();

  /* ---------------- MENU D'EXPORT ---------------- */
  const exportMenu = (
    <Menu>
      <Menu.Item
        key="pdf"
        icon={<FilePdfOutlined />}
        onClick={() => exportPDF()}
        disabled={exporting}
      >
        Télécharger en PDF
      </Menu.Item>
      <Menu.Item
        key="word"
        icon={<FileWordOutlined />}
        onClick={() => exportWord()}
        disabled={exporting}
      >
        Télécharger en Word (.docx)
      </Menu.Item>
      <Menu.Item
        key="excel"
        icon={<FileExcelOutlined />}
        onClick={() => exportExcel()}
        disabled={exporting}
      >
        Télécharger en Excel (.xlsx)
      </Menu.Item>
      <Menu.Item
        key="shp"
        icon={<GlobalOutlined />}
        onClick={() => exportShapefile()}
        disabled={exporting || !donnee?.latitude || !donnee?.longitude}
      >
        Télécharger Shapefile (ZIP)
      </Menu.Item>
    </Menu>
  );

  /* ---------------- RENDER ---------------- */
  if (loading) {
    return (
      <div className="donneesOne-loading">
        <Spin size="large" />
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="donneesOne-error">
        <Alert type="error" message={error} showIcon />
      </div>
    );
  }

  if (!donnee) return null;

  return (
    <motion.div
      className="donneesOne"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* header actions */}
      <div className="donneesOne-header">
        <div className="donneesOne-actions-left">
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            aria-label="Retour"
          >
            Retour
          </Button>
        </div>

        <div className="donneesOne-actions-right">
          <Tooltip title="Exporter / Télécharger">
            <Dropdown overlay={exportMenu} trigger={["click"]} placement="bottomRight">
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                loading={exporting}
                aria-haspopup="true"
                aria-expanded="false"
              >
                Exporter
              </Button>
            </Dropdown>
          </Tooltip>
        </div>
      </div>

      {/* detail content (zone exportable) */}
      <div ref={detailRef} className="donneesOne-body" aria-live="polite">
        {/* Hero */}
        {donnee.vignette_url && (
          <div className="donneesOne-cover" role="img" aria-label={donnee.titre}>
            <img
              ref={imgRef}
              src={`${DOMAIN}${donnee.vignette_url}`}
              alt={donnee.titre}
              className="donneesOne-img"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
              }}
              crossOrigin="anonymous"
            />
            <div className="donneesOne-overlay">
              <h1 className="donneesOne-title">{donnee.titre}</h1>
              <p className="donneesOne-sub">
                {donnee.nom_type} — {donnee.nom_pays} — {donnee.name_fr}
              </p>
            </div>
          </div>
        )}

        {/* meta tags */}
        <div className="donneesOne-meta">
          <Tag color="blue">{donnee.nom_type}</Tag>
          <Tag color="green">{donnee.nom_pays}</Tag>
          <Tag color="purple">{donnee.name_fr}</Tag>
          {donnee.date_collecte && (
            <Tag color="orange">
              Collecte : {new Date(donnee.date_collecte).toLocaleDateString()}
            </Tag>
          )}
          {donnee.date_publication && (
            <Tag color="magenta">
              Publié : {new Date(donnee.date_publication).toLocaleDateString()}
            </Tag>
          )}
          <Tag color={donnee.acces === "abonne" ? "red" : "geekblue"}>
            Accès : {donnee.acces}
          </Tag>
        </div>

        {/* layout : two columns on wide screens */}
        <div className="donneesOne-grid">
          <article className="donneesOne-article">
            <div
              className="donneesOne-description"
              dangerouslySetInnerHTML={{ __html: donnee?.description }}
            />
          </article>

          <aside className="donneesOne-side">
            <div className="donneesOne-side-card">
              <h4>Informations</h4>
              <dl>
                <dt>Latitude</dt>
                <dd>{donnee?.latitude || "—"}</dd>
                <dt>Longitude</dt>
                <dd>{donnee?.longitude || "—"}</dd>
              </dl>
            </div>

            {donnee && donnee.latitude && donnee.longitude && (
  <div className="donneesOne-map" style={{ marginTop: "2rem", borderRadius: "12px", overflow: "hidden" }}>
    <MapContainer
      center={[parseFloat(donnee.latitude), parseFloat(donnee.longitude)]}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[parseFloat(donnee.latitude), parseFloat(donnee.longitude)]}>
        <Popup>
          <strong>{donnee.titre}</strong><br/>
          {donnee.nom_type} – {donnee.nom_pays} – {donnee.name_fr}
        </Popup>
      </Marker>
    </MapContainer>
  </div>
)}

          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default DonneesOne;
