import React from "react";
import { Layout, Button, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header } = Layout;
const Navbar = ({ collapsed, toggleCollapsed }) => {
  const {
    token: { colorSplit, lineWidth, lineType },
  } = theme.useToken();
  return (
    <Header
      className="site-layout-background"
      style={{
        borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
      />
    </Header>
  );
};

export default Navbar;
