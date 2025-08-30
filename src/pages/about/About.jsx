import './about.scss';
import aboutImg from './../../assets/about.png';
import { CheckCircleOutlined } from '@ant-design/icons';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const listItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, type: 'spring', stiffness: 100 }
  })
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  return (
    <motion.div
      className="about"
      ref={ref}
      initial="hidden"
      animate={controls}
    >
      <div className="about_title_row">
        <motion.h2
          className="about-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          À propos de nous
          <motion.span
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          />
        </motion.h2>
      </div>

      <div className="about-wrapper">
        <motion.div
          className="about_left"
          variants={{
            hidden: { x: -50, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
          }}
        >
          <motion.p
            className="about_desc"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
            }}
          >
            Nous centralisons et diffusons des données scientifiques et techniques liées à l’environnement, la géologie et les ressources naturelles. Notre mission : rendre l’information rapide, fiable et accessible.
          </motion.p>
          <motion.span
            className="about_sous"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.4 } }
            }}
          >
            Grâce à notre abonnement, consultez facilement :
          </motion.span>
          <ul className="about_ul">
            {[
              "Des données géographiques, géologiques et hydrologiques",
              "Des informations sur l’hydro-géologie et les forages",
              "Des analyses pétrolières et pétrochimiques",
              "Des résultats géophysiques et géochimiques",
              "Des cartes interactives détaillées"
            ].map((text, i) => (
              <motion.li
                className="about_li"
                key={i}
                custom={i}
                initial="hidden"
                animate={controls}
                variants={listItemVariants}
              >
                <CheckCircleOutlined className="about_icon" /> {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="about_right"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.img
            src={aboutImg}
            alt="À propos"
            className="about-img"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
