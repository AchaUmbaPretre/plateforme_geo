import { Call, FacebookOutlined, Instagram, LinkedIn, LocationOn, Mail, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './footer.scss';
import logo from './../../assets/logo.jpeg';

const Footer = () => {
  const liens = [
    'Géographique', 'Géologiques', 'Hydrologiques', 
    'Hydrogéologiques', 'Forage', 'Pétrolier', 'Géochimie'
  ];

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-top">
          <div className="footer-left">
            <img src={logo} alt="Logo Plateforme Geo" className="footer-img" />
          </div>

          <div className="footer-center">
            <div className="service-cont-title">
              <h2 className="service-title">Nous trouver</h2>
              <div className="apropos-barre"><span className="apropos-moov"></span></div>
            </div>
            <div className="footer-contact">
              <div className="footer-row-icon"><LocationOn className="footer-icon" /><span>10ieme rue N°20 Q/Industriel Commune de Limete, RDC</span></div>
              <div className="footer-row-icon"><Mail className="footer-icon" /><span>lensgabriel1@gmail.com</span></div>
              <div className="footer-row-icon"><Call className="footer-icon" /><span>+243 823956649</span></div>
              <div className="footer-reseaux">
                <Twitter className="footer-rsx"/><FacebookOutlined className="footer-rsx"/>
                <LinkedIn className="footer-rsx"/><Instagram className="footer-rsx"/>
              </div>
            </div>
          </div>

          <div className="footer-links">
            <div className="service-cont-title">
              <h2 className="service-title">Liens</h2>
              <div className="apropos-barre"><span className="apropos-moov"></span></div>
            </div>
            <ul>
              {liens.map((link, i) => <li key={i}><Link>{link}</Link></li>)}
            </ul>
          </div>

          <div className="footer-links">
            <div className="service-cont-title">
              <h2 className="service-title">Liens Populaires</h2>
              <div className="apropos-barre"><span className="apropos-moov"></span></div>
            </div>
            <ul>
              {liens.map((link, i) => <li key={i}><Link>{link}</Link></li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
          <p>© <span className="footer-techno">Plateforme Geo</span>. All Rights Reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
