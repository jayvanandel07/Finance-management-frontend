import React from "react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h2>{t("dashboard")}</h2>
    </div>
  );
};

export default Dashboard;
