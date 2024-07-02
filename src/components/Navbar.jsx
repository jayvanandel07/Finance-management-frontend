import React from "react";
import { Layout, Button, theme, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;
const Navbar = ({ collapsed, toggleCollapsed }) => {
  const {
    token: { colorSplit, lineWidth, lineType },
  } = theme.useToken();
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
      />
      <Link to="/app/profile">
        <Avatar size="default" icon={<UserOutlined />}>
          hello
        </Avatar>
      </Link>
    </Header>
  );
};

export default Navbar;
