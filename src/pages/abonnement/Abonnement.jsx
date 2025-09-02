import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  notification,
  Card,
  Typography,
  Divider,
  Alert,
  Space,
} from "antd";
import {
  CreditCardOutlined,
  PhoneOutlined,
  CrownOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./abonnement.scss";
import { postPayment } from "../../services/payment.service";
import { getSubscription } from "../../services/subscriptions.service";

const { Option } = Select;
const { Title, Text } = Typography;

const Abonnement = () => {
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    // Fetch des abonnements depuis le backend
    const fetchData = async () => {
      try {
        const { data } = await getSubscription();
        setSubscriptions(data);
      } catch (error) {
        notification.error({
          message: "Erreur",
          description: "Impossible de récupérer les formules d'abonnement.",
        });
      }
    };
    fetchData();
  }, []);

  // Compte à rebours
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) return setTimeLeft(null);

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSubscriptionChange = (id) => {
    const sub = subscriptions.find((s) => s.id_subscription === id);
    setSelected(sub || null);
    setTimeLeft(600); // 10 minutes
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

const handleFinish = async (values) => {
  if (!selected) return;
  setLoading(true);

  try {
    const res = await postPayment({
      userId: 1, // remplacer par l'utilisateur connecté
      subscriptionId: values.subscription,
      amount: selected.price,
      phone: values.phone,
      email: values.email || "test@test.com",
    });

    if (res.success) {
      // Créer dynamiquement le formulaire POST pour MaxiCash
      const form = document.createElement("form");
      form.method = "POST";
      form.action = res.data.redirectUrl;

      Object.entries(res.data.formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } else {
      notification.error({
        message: "Erreur ❌",
        description: res.error || "Impossible d’initier le paiement",
      });
    }
  } catch (err) {
    console.error(err);
    notification.error({
      message: "Erreur ❌",
      description: "Une erreur inattendue est survenue",
    });
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="abonnement">
      <Card className="abonnement-card" bordered={false}>
        <div className="abonnement-header">
          <CrownOutlined className="abonnement-icon" />
          <Title level={3}>Souscrire à un abonnement</Title>
          <Text type="secondary">
            Choisissez une formule et payez en toute sécurité via MaxiCash.
          </Text>
        </div>

        <Divider />

        <Form layout="vertical" onFinish={handleFinish}>
          {/* Sélection abonnement */}
          <Form.Item
            label="Formule d’abonnement"
            name="subscription"
            rules={[{ required: true, message: "Veuillez choisir une formule" }]}
          >
            <Select
              placeholder="Sélectionnez une formule"
              size="large"
              onChange={handleSubscriptionChange}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {subscriptions.map((d) => (
                <Option key={d.id_subscription} value={d.id_subscription}>
                  {d.name} — {d.price} $
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Montant */}
          <Form.Item label="Montant (USD)">
            <Input
              prefix={<CreditCardOutlined />}
              value={selected?.price || ""}
              disabled
              size="large"
            />
          </Form.Item>

          {/* Téléphone */}
          <Form.Item
            label="Numéro de téléphone"
            name="phone"
            rules={[{ required: true, message: "Entrez votre numéro de téléphone" }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="+243..."
              size="large"
            />
          </Form.Item>

          {/* Résumé abonnement */}
          {selected && (
            <Alert
              type="info"
              showIcon
              message="Résumé de votre formule"
              description={
                <Space direction="vertical">
                  <Text><b>Nom :</b> {selected.name}</Text>
                  <Text><b>Durée :</b> {selected.duration_days} jours</Text>
                  <Text><b>Prix :</b> {selected.price} USD</Text>
                </Space>
              }
              style={{ marginBottom: 16 }}
            />
          )}

          {/* Compte à rebours */}
          <div className="countdown-wrapper">
            <div className="countdown">
                <ClockCircleOutlined style={{ marginRight: 8, color: "#fa8c16" }} />
                <Text strong>
                Temps restant pour finaliser : {formatTime(timeLeft)}
                </Text>
            </div>

            {/* Barre de progression avec couleur dynamique */}
            <div className="countdown-bar">
                <div
                className={`countdown-progress ${
                    timeLeft > 300 ? "green" : timeLeft > 120 ? "orange" : "red"
                }`}
                style={{
                    width: `${(timeLeft / 600) * 100}%`,
                }}
                />
            </div>
          </div>


          <Form.Item style={{ marginTop: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              disabled={!selected}
            >
              🚀 Payer avec MaxiCash
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Abonnement;
