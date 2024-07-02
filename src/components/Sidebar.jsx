import React from "react";
import { Flex, Menu, Typography, theme } from "antd";
import {
  UserOutlined,
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
      icon: <UserOutlined />,
      label: <Typography.Text>{t("translation")}</Typography.Text>,
      children: [
        {
          key: "t1",
          label: (
            <div onClick={() => i18n.changeLanguage("en")}>
              <Typography.Text>{t("english")}</Typography.Text>
            </div>
          ),
        },
        {
          key: "t2",
          label: (
            <div onClick={() => i18n.changeLanguage("ta")}>
              <Typography.Text>{t("tamil")}</Typography.Text>
            </div>
          ),
        },
      ],
    },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ color: `${colorError}` }} />,
      label: <Typography.Text> {t("logout")}</Typography.Text>,
    },
  ];
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: (
        <Link to="/app/dashboard">
          <Typography.Text>{t("dashboard")}</Typography.Text>
        </Link>
      ),
    },
    {
      key: "customers",
      icon: <UsergroupAddOutlined />,
      label: (
        <Link to="/app/customers">
          <Typography.Text>{t("customers")}</Typography.Text>
        </Link>
      ),
    },
    {
      key: "loans",
      icon: <MoneyCollectOutlined />,
      label: (
        <Link to="/app/loans">
          <Typography.Text>{t("loans")}</Typography.Text>
        </Link>
      ),
    },
  ];

  return (
    <>
      <Typography.Title
        style={{
          textAlign: "center",
          marginBlock: ".77em",
        }}
        level={4}
      >
        {collapsed ? "FM" : "Finance Manager"}
      </Typography.Title>

      <Menu
        style={{
          border: "none",
          borderTop: `${lineWidth}px ${lineType} ${colorSplit}`,
        }}
        mode="vertical"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
      <Flex
        style={{ position: "absolute", bottom: 0, width: "100%" }}
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
