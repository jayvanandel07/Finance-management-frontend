import React from "react";
import { Menu, Typography } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Sidebar = ({ collapsed }) => {
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/app/profile">Profile</Link>,
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Nav 2",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "Nav 3",
    },
  ];

  return (
    <>
      <Typography.Title style={{ textAlign: "center" }} level={4}>
        {collapsed ? "FM" : "Finance Manager"}
      </Typography.Title>
      <Menu
        style={{ border: "none" }}
        mode="vertical"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
    </>
  );
};

export default Sidebar;
