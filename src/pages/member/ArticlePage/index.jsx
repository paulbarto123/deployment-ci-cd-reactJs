import React, { useCallback } from "react";
import { Card, Divider, Row, Col, Button, Space, Spin, } from "antd";
import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import useGetArticles from "../../../api/useGetArticles";
import useDeleteArticle from "../../../api/useDeleteArticle";
import Text from "antd/lib/typography/Text";

const ArticleComponent = (props) => {
  const { mutate: deleteArticle } = useDeleteArticle(props.article.id);

  const handleDeleteArticle = useCallback(() => {
    console.log("id transaction >> ", props.article.id);
    deleteArticle();
    window.location.reload();
  }, [props.article.id, deleteArticle]);
  return (
    <>
      <Card
        title=""
        bordered={true}
        style={{ width: 1400, backgroundColor: "AliceBlue" }}
      >
          <>
            <Row>
              <Col span={5}>
                <h4>
                  <b>Kategori</b>
                </h4>
                <p>Judul</p>
                <p>Tanggal Post</p>
                <p>Isi Artikel</p>
              </Col>
              <Col span={19}>
                <h4>
                  : <b>{props.article.category}</b>
                </h4>
                <p>: {props.article.title}</p>
                <p>: {props.article.date}</p>
                <p>: {props.article.detail}</p>
              </Col>
            </Row>
            <Button type="primary" danger onClick={handleDeleteArticle}>
              Hapus
            </Button>
            <Divider />
          </>
      </Card>
      <Divider />
    </>
  );
};
const ArticlePage = () => {
  const { data, isLoading } = useGetArticles();
  console.log("data >> article", data);
  return (
    <SidebarMemberComponent defaultSelectedKeys="6">
      <div className="card">
        <Space direction="vertical">
          {isLoading ? (
            <Spin tip="Loading..."></Spin>
          ) : data ? (
            data.map((article) => (
              <ArticleComponent key={article.id} article={article} />
            ))
          ) : (
            <Text>Gagal memuat data</Text>
          )}
        </Space>
      </div>
    </SidebarMemberComponent>
  );
};
export default ArticlePage;
