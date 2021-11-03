import React, { useState } from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupDeleteOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

import { useAuthorizedContext } from "../../auth/AuthorizedContext";
import "../sidebar.css";

const { Sider, Content, Header } = Layout;

const SidebarAdminComponent = (props) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const { setAuthorizedValue } = useAuthorizedContext();

  const handleSignOutButton = React.useCallback(() => {
    localStorage.removeItem("admin-token");
    setAuthorizedValue(false);
    history.push("login");
  }, [setAuthorizedValue, history])

  const handleToggle = React.useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <Layout>
      <Sider
        className="layout_sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo"></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            className="menu_item"
            key="1"
            icon={<UsergroupDeleteOutlined />}
          >
            <Link to="/beranda-admin"> Enrollment Request</Link>
          </Menu.Item>

          <Menu.Item className="menu_item" key="2" icon={<LogoutOutlined />}>
            <Link onClick={handleSignOutButton}>Keluar</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: handleToggle,
          })}
          Selamat Datang!
        </Header>
        <Content className="site-layout-background layout_content">
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarAdminComponent;
