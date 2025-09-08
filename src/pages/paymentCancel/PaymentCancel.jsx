import { motion } from "framer-motion";
import { Slash } from "lucide-react";
import { Button, Card } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./paymentCancel.scss";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Récupération des paramètres d’URL
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference") || "-";
  const method = queryParams.get("Method") || "N/A";

  return (
    <div className="payment-cancel-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="payment-cancel-card" bordered={false}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            className="icon-wrapper"
          >
            <Slash className="cancel-icon" />
          </motion.div>

          <h1 className="title">Paiement Annulé ⚠️</h1>
          <p className="subtitle">
            Vous avez annulé le paiement. Aucune transaction n’a été effectuée.
          </p>

          <div className="details">
            <p><strong>Référence :</strong> {reference}</p>
            <p><strong>Méthode :</strong> {method}</p>
            <p><strong>Statut :</strong> Annulé</p>
          </div>

          <div className="actions">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/paiement")}
            >
              Réessayer le Paiement
            </Button>
            <Button
              type="default"
              size="large"
              onClick={() => navigate("/")}
            >
              Retour à l’accueil
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
