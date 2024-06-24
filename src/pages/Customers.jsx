import React from "react";
import { useTranslation } from "react-i18next";

const Customers = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h2>{t("customers")}</h2>
    </div>
  );
};

export default Customers;
