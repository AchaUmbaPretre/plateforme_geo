import './home.scss';
import { motion } from 'framer-motion';
import homeImg from './../../assets/imgHome.png';
import About from '../../components/about/About';
import Contact from '../../components/contact/Contact';
import Services from '../../components/services/Services';


const Home = () => {

  return (
    <div className="home">
      <div className="home_container">
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
      </div>

      <About/>

      {/* SECTION DONNÉES */}
      <Services/>

      <Contact/>
    </div>
  );
};

export default Home;
