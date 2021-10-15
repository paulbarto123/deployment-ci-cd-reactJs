import React from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./sidebarAdmin.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupDeleteOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Sider, Content } = Layout;

const SidebarAdminComponent = (props) => {
  const [collapse, setCollapse] = React.useState(false);
  const handleToggle = React.useCallback(() => {
    setCollapse(!collapse);
  }, [collapse]);

  return (
    <Layout>
      <Sider
        width="300px"
        className="sider"
        trigger={null}
        collapsible
        collapsed={collapse}
      >
        <div className="menu_header">
          {collapse ? null : (
            <div className="logo">
              <img/>
            </div>
          )}

          <div className="site-layout-background sider_icon">
            {React.createElement(
              collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: handleToggle,
              }
            )}
          </div>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            className="menu_item"
            key="1"
            icon={<UsergroupDeleteOutlined />}
          >
            <Link to="/beranda-admin"> Enrollment Request</Link>
          </Menu.Item>

          <Menu.Item className="menu_item" key="2" icon={<LogoutOutlined />}>
            <Link to="/">Keluar</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content className="site-layout-background site_content">
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarAdminComponent;
