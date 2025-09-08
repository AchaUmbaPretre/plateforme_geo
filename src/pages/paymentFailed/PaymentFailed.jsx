import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Button, Card } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./paymentFailed.scss";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Récupération des paramètres d’URL
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference") || "-";
  const method = queryParams.get("Method") || "N/A";

  return (
    <div className="payment-failed-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="payment-failed-card" bordered={false}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            className="icon-wrapper"
          >
            <XCircle className="failed-icon" />
          </motion.div>

          <h1 className="title">Paiement Échoué ❌</h1>
          <p className="subtitle">
            Une erreur est survenue lors du traitement de votre paiement.
          </p>

          <div className="details">
            <p><strong>Référence :</strong> {reference}</p>
            <p><strong>Méthode :</strong> {method}</p>
            <p><strong>Statut :</strong> Échoué</p>
          </div>

          <div className="actions">
            <Button
              type="primary"
              danger
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

export default PaymentFailed;
