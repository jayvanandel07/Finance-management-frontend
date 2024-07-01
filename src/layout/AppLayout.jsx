import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout, theme } from "antd";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Loans from "../pages/Loans";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const { Sider, Content } = Layout;
const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorSplit, lineWidth, lineType },
  } = theme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{ borderRight: `${lineWidth}px ${lineType} ${colorSplit}` }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Navbar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Content>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="loans" element={<Loans />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
