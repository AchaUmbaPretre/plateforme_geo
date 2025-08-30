import './home.scss';
import { motion } from 'framer-motion';
import homeImg from './../../assets/imgHome.png';
import geographique from './../../assets/geologiques.png';
import geologique from './../../assets/geologiques.png';
import hydrologique from './../../assets/hydrologiques.png';
import hydrogeologique from './../../assets/hydrogeologiques.png';
import forage from './../../assets/forage.png';
import petrolier from './../../assets/petrolier.png';
import geochimie from './../../assets/geochimie.png';
import geophysique from './../../assets/geophysique.png';
import petrochimie from './../../assets/petrochimie.png';
import About from '../about/About';
import Contact from '../contact/Contact';

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

const Home = () => {
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
  ];

  return (
    <div className="home">
      <div className="home__wrapper">
        {/* LEFT */}
        <motion.div
          className="home__left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="home__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Données géospatiales et injections à portée de main
          </motion.h2>
          <motion.p
            className="home__desc"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Accédez facilement à des données fiables et complètes sur : Géographique, Géologiques, Hydrologiques, Hydrogéologiques, Forage, Pétrolier, Géochimie, Géophysique et Pétrochimie, directement depuis notre plateforme en ligne.
          </motion.p>

          <motion.button
            className="home__btn"
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            🚀 Souscrire à un abonnement
          </motion.button>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="home__right"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.img
            src={homeImg}
            alt="Illustration d'accueil - Données géospatiales"
            className="home__img"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      </div>

      <About/>

      {/* SECTION DONNÉES */}
      <div className="data" id="nosservices">

        <div className="data_title_row">
          <motion.h2
            className="data-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Nos services
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
            </motion.div>
          ))}
        </div>
      </div>
      <Contact/>
    </div>
  );
};

export default Home;
