import './services.scss';
import { motion } from 'framer-motion';
import geographique from './../../assets/geologiques.png';
import geologique from './../../assets/geologiques.png';
import hydrologique from './../../assets/hydrologiques.png';
import hydrogeologique from './../../assets/hydrogeologiques.png';
import forage from './../../assets/forage.png';
import petrolier from './../../assets/petrolier.png';
import geochimie from './../../assets/geochimie.png';
import geophysique from './../../assets/geophysique.png';
import petrochimie from './../../assets/petrochimie.png';
import environnement from './../../assets/environnement.png';
import petrophysique from './../../assets/petrophysiqu.png';
import petrole from './../../assets/etudePetrole.png';
import { useNavigate } from 'react-router-dom';



const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: 'spring',
      stiffness: 120,
    },
  }),
};

const Services = () => {
  const navigate = useNavigate();

const dataItems = [
  { 
    id: 1,
    img: geographique, 
    label: 'Géographique', 
    desc: 'Cartographie et localisation des territoires, facilitant la gestion et l’analyse spatiale.',
        url: `/donnees_type?id_type=${1}`

  },
  { 
    id: 2,
    img: geologique, 
    label: 'Géologiques', 
    desc: 'Informations sur la structure du sous-sol, les roches et formations géologiques.',
        url: `/donnees_type?id_type=${2}`

  },
  { 
    id: 3,
    img: hydrologique, 
    label: 'Hydrologiques', 
    desc: 'Données sur les rivières, lacs et nappes, utiles pour la gestion des ressources en eau.',
       url: `/donnees_type?id_type=${3}`


  },
  { 
    id:4,
    img: hydrogeologique, 
    label: 'Hydrogéologiques', 
    desc: 'Analyse des eaux souterraines et des aquifères pour une exploitation durable.',
        url: `/donnees_type?id_type=${4}`

  },
  { 
    id:5,
    img: forage, 
    label: 'Forage', 
    desc: 'Suivi et documentation des activités de forage pour l’eau ou l’exploration minière et énergétique.',
        url: `/donnees_type?id_type=${5}`


  },
  { 
    id:6,
    img: petrolier, 
    label: 'Pétrolier', 
    desc: 'Informations relatives à l’exploration, l’exploitation et la production des ressources pétrolières.',
        url: `/donnees_type?id_type=${6}`

  },
  { 
    id:7,
    img: geochimie, 
    label: 'Géochimie', 
    desc: 'Étude de la composition chimique des sols, eaux et minéraux pour l’exploration et l’environnement.',
        url: `/donnees_type?id_type=${7}`

  },
  { 
    id:8,
    img: geophysique, 
    label: 'Géophysique', 
    desc: 'Analyses basées sur les propriétés physiques du sous-sol (magnétisme, sismique, gravimétrie, etc.).',
        url: `/donnees_type?id_type=${8}`

  },
  { 
    id: 9,
    img: petrochimie, 
    label: 'Pétrochimie', 
    desc: 'Transformation des hydrocarbures en produits industriels (plastiques, carburants, engrais, etc.).',
        url: `/donnees_type?id_type=${9}`


  },
  { 
    id: 13,
    img: environnement, 
    label: 'Environnement', 
    desc: 'Études d’impact, suivi écologique et gestion durable des ressources naturelles.',
    url: `/donnees_type?id_type=${13}`

  },
  { 
    id: 14,
    img: petrophysique, 
    label: 'Pétrophysique', 
    desc: 'Analyse des propriétés physiques et chimiques des roches réservoirs pour l’exploration pétrolière.',
        url: `/donnees_type?id_type=${14}`

  },
  { 
    id: 15,
    img: petrole, 
    label: 'Études pétrolières', 
    desc: 'Recherches et analyses globales liées au pétrole, de la prospection à la production.',
        url: `/donnees_type?id_type=${15}`

  },
];


  return (
    <div className="data" id="nosservices">
      <div className="data_title_row">
        <motion.h2
          className="data-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Nos données
          <motion.span
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          />
        </motion.h2>
      </div>

      <div className="data__wrapper">
        {dataItems.map((data, index) => (
          <motion.div
            className="data__row"
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.07, y: -8 }}
          >
            <motion.img
              src={data.img}
              alt={`Icône ${data.label}`}
              className="home_data_img"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 150 }}
            />
            <span className="home_desc_data">{data.label}</span>
            <p className="home_card_desc">{data.desc}</p>

            {/* Bouton Détail */}
            <motion.button
              className="detail-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(data.url)}
            >
              Voir détail
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
