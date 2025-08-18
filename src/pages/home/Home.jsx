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


const Home = () => {
  const dataItems = [
  { img: geographique, label: 'Géographique' },
  { img: geologique, label: 'Géologiques' },
  { img: hydrologique, label: 'Hydrologiques' },
  { img: hydrogeologique, label: 'Hydrogéologiques' },
  { img: forage, label: 'Forage' },
  { img: petrolier, label: 'Pétrolier' },
  { img: geochimie, label: 'Géochimie' },
  { img: geophysique, label: 'Géophysique' },
  { img: petrochimie, label: 'Pétrochimie' }
];

  return (
    <div className="home">
      <div className="home__wrapper">
      <motion.div
        className="home__left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="home__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Données géospatiales et injections à portée de main
        </motion.h2>
        <motion.p
          className="home__desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Accédez facilement à des données fiables et complètes sur : Géographique, Géologiques, Hydrologiques, Hydrogéologiques, Forage, Pétrolier, Géochimie, Géophysique et Pétrochimie, directement depuis notre plateforme en ligne.
        </motion.p>

        <motion.button
          className="home__btn"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Souscrire à un abonnement
        </motion.button>
      </motion.div>

      <motion.div
        className="home__right"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.img
          src={homeImg}
          alt="Accueil"
          className="home__img"
          whileHover={{ scale: 1.03, rotate: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </motion.div>
    </div>


      <div className="data">
      <motion.div
        className="data_title_row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="data_title">Données disponibles</h2>
      </motion.div>

      <div className="data__wrapper">
        {dataItems.map((data, index) => (
          <motion.div
            className="data__row"
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6, type: 'spring', stiffness: 120 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <img src={data.img} alt={data.label} className="home_data_img" />
            <span className="home_desc_data">{data.label}</span>
          </motion.div>
        ))}
      </div>
    </div>

    </div>
  );
};

export default Home;
