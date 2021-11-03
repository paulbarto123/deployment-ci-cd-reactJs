import React, { useCallback } from "react";
import { Card, Divider, Row, Col, Button, Space, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";


import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import useGetArticles from "../../../Query/useGetArticles";
import useDeleteArticle from "../../../Mutations/useDeleteArticle";



const ArticleComponent = (props) => {
  const { mutate: deleteArticle, isLoading } = useDeleteArticle(props.article.id_artikel);

  const handleDeleteArticle = useCallback(() => {
    console.log("id article >> ", props.article.id);
    deleteArticle().then(window.location.reload())
    //window.location.reload();
   
  }, [props.article.id, deleteArticle]);
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
              <p>Isi Artikel</p>
            </Col>
            <Col span={19}>
              <h4>
                : <b>{props.article.kategori}</b>
              </h4>
              <p>: {props.article.judul}</p>
              <p>: {moment(props.article.posting_date).format("DD MMMM YYYY")}</p>
              <p>: {props.article.isi_artikel}</p>
            </Col>
          </Row>
          <Button type="primary" danger onClick={handleDeleteArticle}>
            {
              isLoading?  <Spin tip="Loading..."></Spin> : <p>Hapus</p>
            }
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
  // const {result, setResult} = useState(data.results)
  
  // useEffect(() => {
  //   setResult(data)
  // }, []);
  //console.log("data >> article", result);
  return (
    <SidebarMemberComponent defaultSelectedKeys="6">
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
    </SidebarMemberComponent>
  );
};
export default ArticlePage;
