import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button, Card } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./paymentSuccess.scss";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Récupération des paramètres d’URL
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status") || "pending";
  const reference = queryParams.get("reference") || "-";
  const method = queryParams.get("Method") || "N/A";

  return (
    <div className="payment-success-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="payment-success-card" bordered={false}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            className="icon-wrapper"
          >
            <CheckCircle2 className="success-icon" />
          </motion.div>

          <h1 className="title">Paiement Réussi ✅</h1>
          <p className="subtitle">
            Merci ! Votre paiement a été traité avec succès.
          </p>

          <div className="details">
            <p><strong>Référence :</strong> {reference}</p>
            <p><strong>Méthode :</strong> {method}</p>
            <p><strong>Statut :</strong> {status}</p>
          </div>

          <div className="actions">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/dashboard")}
            >
              Aller au Tableau de Bord
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

export default PaymentSuccess;
