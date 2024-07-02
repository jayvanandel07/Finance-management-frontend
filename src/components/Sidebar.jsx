import React from "react";
import { Flex, Menu, Typography, theme } from "antd";
import {
  TranslationOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  MoneyCollectOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = ({ collapsed }) => {
  const { t, i18n } = useTranslation();
  const {
    token: { lineWidth, lineType, colorSplit, colorError },
  } = theme.useToken();

  const bottomMenuItems = [
    {
      key: "translation",
      title: t("translation"),
      icon: <TranslationOutlined />,
      label: <Typography.Text>{t("translation")}</Typography.Text>,
      children: [
        {
          key: "t1",
          label: (
            <Typography.Text
              style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
              }}
              onClick={() => i18n.changeLanguage("en")}
            >
              {t("english")}
            </Typography.Text>
          ),
        },
        {
          key: "t2",
          label: (
            <Typography.Text
              style={{ display: "flex", height: "100%", alignItems: "center" }}
              onClick={() => i18n.changeLanguage("ta")}
            >
              {t("tamil")}
            </Typography.Text>
          ),
        },
      ],
    },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ color: `${colorError}` }} />,
      title: t("logout"),
      label: <Typography.Text> {t("logout")}</Typography.Text>,
    },
  ];
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      title: t("dashboard"),
      label: (
        <Link to="/app/dashboard">
          <Typography.Text>{t("dashboard")}</Typography.Text>
        </Link>
      ),
    },
    {
      key: "customers",
      icon: <UsergroupAddOutlined />,
      title: t("customers"),
      label: (
        <Link to="/app/customers">
          <Typography.Text>{t("customers")}</Typography.Text>
        </Link>
      ),
    },
    {
      key: "loans",
      icon: <MoneyCollectOutlined />,
      title: t("loans"),
      label: (
        <Link to="/app/loans">
          <Typography.Text>{t("loans")}</Typography.Text>
        </Link>
      ),
    },
  ];

  return (
    <>
      <Link to="/app/dashboard">
        <Typography.Title
          style={{
            textAlign: "center",
            margin: 0,
            paddingBlock: ".77em",
            borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
          }}
          level={4}
        >
          {collapsed ? "FM" : "Finance Manager"}
        </Typography.Title>
      </Link>

      <Menu
        style={{
          border: "none",
        }}
        mode="vertical"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
      <Flex
        style={{ position: "sticky", bottom: 0, width: "100%" }}
        gap={"middle"}
        vertical
      >
        <Menu
          style={{
            border: "none",
            borderTop: `${lineWidth}px ${lineType} ${colorSplit}`,
          }}
          mode="vertical"
          items={bottomMenuItems}
        />
      </Flex>
    </>
  );
};

export default Sidebar;
