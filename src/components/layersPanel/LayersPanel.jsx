import React, { useState } from "react";
import { Collapse, Switch, Slider, Tooltip, Divider, Typography, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

// Exemple : URL ou base64 pour mini-preview
const getLayerPreview = (layerName) => {
  const previews = {
    "Formations géologiques": "/previews/geologie.png",
    "Minéraux": "/previews/mineraux.png",
    "Cours d'eau": "/previews/cours_eau.png",
    "Lacs": "/previews/lacs.png",
    "Routes": "/previews/routes.png",
    "Bâtiments": "/previews/batiments.png",
  };
  return previews[layerName] || null;
};

const categoriesData = [
  {
    name: "Géologie",
    layers: [
      { name: "Formations géologiques", defaultActive: true },
      { name: "Minéraux", defaultActive: false },
    ]
  },
  {
    name: "Hydrographie",
    layers: [
      { name: "Cours d'eau", defaultActive: true },
      { name: "Lacs", defaultActive: false },
    ]
  },
  {
    name: "Infrastructure",
    layers: [
      { name: "Routes", defaultActive: true },
      { name: "Bâtiments", defaultActive: false },
    ]
  }
];

export default function LayersPanel() {
  const [categories, setCategories] = useState(
    categoriesData.map(category => ({
      ...category,
      layers: category.layers.map(layer => ({ ...layer, active: layer.defaultActive, opacity: 100 }))
    }))
  );

  const handleToggle = (catIndex, layerIndex) => {
    const newCategories = [...categories];
    newCategories[catIndex].layers[layerIndex].active = !newCategories[catIndex].layers[layerIndex].active;
    setCategories(newCategories);
  };

  const handleOpacityChange = (catIndex, layerIndex, value) => {
    const newCategories = [...categories];
    newCategories[catIndex].layers[layerIndex].opacity = value;
    setCategories(newCategories);
  };

  return (
    <div style={{
      flex: 1,
      border: "1px solid #e6e6e6",
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      padding: 16,
      maxHeight: "100%",
      overflowY: "auto"
    }}>
      <Typography.Title level={5}>Couches de la carte</Typography.Title>
      <Divider />

      <Collapse
        defaultActiveKey={categories.map((_, i) => i)}
        expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
      >
        {categories.map((category, catIndex) => (
          <Panel header={category.name} key={catIndex}>
            {category.layers.map((layer, layerIndex) => (
              <div key={layer.name} style={{ marginBottom: 16 }}>
                <Space align="center" style={{ justifyContent: "space-between", width: "100%" }}>
                  <Tooltip
                    title={
                      getLayerPreview(layer.name) ? (
                        <img
                          src={getLayerPreview(layer.name)}
                          alt={layer.name}
                          style={{ width: 150, height: 100, objectFit: "cover" }}
                        />
                      ) : null
                    }
                  >
                    <Typography.Text style={{ cursor: "pointer" }}>{layer.name}</Typography.Text>
                  </Tooltip>

                  <Switch
                    checked={layer.active}
                    onChange={() => handleToggle(catIndex, layerIndex)}
                  />
                </Space>

                {layer.active && (
                  <div style={{ marginTop: 8, paddingLeft: 8 }}>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      Transparence : {layer.opacity}%
                    </Typography.Text>
                    <Slider
                      value={layer.opacity}
                      onChange={(val) => handleOpacityChange(catIndex, layerIndex, val)}
                      min={0}
                      max={100}
                    />
                  </div>
                )}
                <Divider />
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
