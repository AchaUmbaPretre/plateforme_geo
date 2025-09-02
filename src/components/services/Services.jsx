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
  const dataItems = [
    { img: geographique, label: 'Géographique', desc: 'Cartographie et localisation des territoires, facilitant la gestion et l’analyse spatiale.' },
    { img: geologique, label: 'Géologiques', desc: 'Informations sur la structure du sous-sol, les roches et formations géologiques.' },
    { img: hydrologique, label: 'Hydrologiques', desc: 'Données sur les rivières, lacs et nappes, utiles pour la gestion des ressources en eau.' },
    { img: hydrogeologique, label: 'Hydrogéologiques', desc: 'Analyse des eaux souterraines et des aquifères pour une exploitation durable.' },
    { img: forage, label: 'Forage', desc: 'Suivi et documentation des activités de forage pour l’eau ou l’exploration.' },
    { img: petrolier, label: 'Pétrolier', desc: 'Informations relatives à l’exploration et l’exploitation des ressources pétrolières.' },
    { img: geochimie, label: 'Géochimie', desc: 'Étude de la composition chimique des sols et des minéraux pour l’exploration minière.' },
    { img: geophysique, label: 'Géophysique', desc: 'Analyses basées sur les propriétés physiques du sous-sol (magnétique, sismique, etc.).' },
    { img: petrochimie, label: 'Pétrochimie', desc: 'Transformations chimiques des hydrocarbures en produits industriels utiles.' },
    { img: environnement, label: 'Environnement', desc: 'Transformations chimiques des hydrocarbures en produits industriels utiles.' },
    { img: petrophysique, label: 'Environnement', desc: 'Transformations chimiques des hydrocarbures en produits industriels utiles.' },
    { img: petrole, label: 'Etude dans le pétrole', desc: 'Transformations chimiques des hydrocarbures en produits industriels utiles.' },



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
              onClick={() => alert(`Voir le détail de ${data.label}`)}
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
