import React from "react";
import { Divider, Tabs, Col, Row, Card, Space, Spin } from "antd";
import Text from "antd/lib/typography/Text";

import useGetArticles from "../../../Query/useGetArticles";
import SidebarMemberComponent from "../../../components/SidebarMemberComponent";

import ProjectList from "./ProjectList.js";

const { TabPane } = Tabs;
const ArticleComponent = (props) => {
  return (
    <>
      <Card
        title=""
        bordered={true}
        style={{ width: 1120, backgroundColor: "AliceBlue" }}
      >
        <>
          <Row>
            <Col span={5}>
              <h4>
                <b>Kategori</b>
              </h4>
              <p>Judul</p>
              <p>Tanggal Post</p>
              <p>Ditulis Oleh User ID</p>
              <p>Isi Artikel</p>
            </Col>
            <Col span={19}>
              <h4>
                : <b>{props.article.kategori}</b>
              </h4>
              <p>: {props.article.judul}</p>
              <p>: {props.article.posting_date}</p>
              <p>: {props.article.id_user}</p>
              <p>
                :
                {/* <ReadMore> */}
                  {props.article.isi_artikel}
                {/* </ReadMore> */}
              </p>
            </Col>
          </Row>
        </>
      </Card>
    </>
  );
};
const ArticleList = () => {
  const { data, isLoading } = useGetArticles();
  return (
    <div className="card">
      <Space direction="vertical">
        {isLoading ? (
          <Spin tip="Loading..."></Spin>
        ) : data ? (
          data.results.map((article) => (
            <ArticleComponent key={article.id_artikel} article={article} />
          ))
        ) : (
          <Text>Gagal memuat data</Text>
        )}
      </Space>
    </div>
  );
};

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
