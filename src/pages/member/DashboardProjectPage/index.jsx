import React from "react";
import { Divider, Tabs } from "antd";

import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import ArticleList from "./ArticleList";
import ProjectList from "./ProjectList";

const { TabPane } = Tabs;

const DashboardProjectPage = () => {
  return (
    <SidebarMemberComponent defaultSelectedKeys="1">
      <div className="tabs">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Artikel" key="1">
            <ArticleList />
          </TabPane>
          <TabPane tab="Project" key="2">
            <ProjectList />
          </TabPane>
        </Tabs>
        <Divider />
      </div>
    </SidebarMemberComponent>
  );
};

export default DashboardProjectPage;
