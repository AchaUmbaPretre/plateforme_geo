import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDonneesType } from '../../../services/donnees.service';
import { motion } from 'framer-motion';
import { Spin, Alert, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './donneesType.scss';
import config from '../../../config';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: 'spring',
      stiffness: 120,
    },
  }),
};

const DonneesType = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const idType = searchParams.get('id_type');
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!idType) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getDonneesType(idType);
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les données. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  }, [idType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="donneesType-loading">
        <Spin size="large" />
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="donneesType-error">
        <Alert type="error" message="Erreur" description={error} showIcon />
      </div>
    );
  }

  return (
    <div className="donneesType">
      <h2 className="donneesType-title">Données pour le type : {idType}</h2>
      <div className="donneesType-grid">
        {data.map((item, index) => (
          <motion.div
            className="donneesType-card"
            key={item.id_donnee}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.03,
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
            }}
          >
            <div className="donneesType-image">
              <img src={`${DOMAIN}${item.vignette_url}`} alt={item.titre} />
            </div>
            <div className="donneesType-content">
              <h3>{item.titre}</h3>
              <p><strong>Type :</strong> {item.nom_type}</p>
              <p><strong>Pays :</strong> {item.nom_pays}</p>
              <p><strong>Localité :</strong> {item.name_fr}</p>
              <p><strong>Date collecte :</strong> {new Date(item.date_collecte).toLocaleDateString()}</p>
              <p><strong>Accès :</strong> {item.acces}</p>

              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                className="donneesType-btn"
                onClick={() => navigate(`/donnees_one?id_donnee=${item.id_donnee}`)}
              >
                Voir Détails
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DonneesType;
