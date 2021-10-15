import React, {useState} from "react";
import { Col, Row, Divider, Tabs, Card } from "antd";
import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import useGetProjects from "../../../api/useGetProjects";

const { TabPane } = Tabs;
const readMoreStyle = {
    color: "rgb(192,192,192)",
    cursor: "pointer", 
    marginLeft: 10
}
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} style={readMoreStyle} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};
const articleData = [
  {
    title: "Kisah Inpiratif Kak Ghufron Berbagi Bubur",
    image: "https://pbs.twimg.com/profile_images/1260578013558816768/rpc_t-vc_400x400.jpg",
    date: "2019",
    category: "Sosial & Kebudayaan",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and  more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];
const ArticleComponent = (props) => {
  return (
    <Row>
      {props.data.map((data, index) => (
        <>
          <Col span={5}>
            <img src={data.image} alt="thumb" />
          </Col>
          <Col span={19}>
            <h3>
              <b>{data.title}</b>
            </h3>
            <h4>
              <span className="date">{data.date}</span> <span className="kategori">{data.category}</span>
            </h4>
            <ReadMore>
            {data.detail}
            </ReadMore>
            
          </Col>
          <Divider />
        </>
      ))}
    </Row>
  );
};

const MyProjectComponent = (props) => {
  return (
    <Card title="" bordered={true} style={{ width: 1400, backgroundColor: "AliceBlue" }}>
      {props.data.map((items) => (
        <>
          <Row key={items.id}>
            <Col span={5}>
              <h4>
                <b>Kategori Project</b>
              </h4>
              <p>Nama Project</p>
              <p>Tanggal Mulai</p>
              <p>Link Trello</p>
              <p>Deskripsi Project</p>
              <p>Kollaborator</p>
            </Col>
            <Col span={19}>
              <h4>
                : <b>{items.category}</b>
              </h4>
              <p>: {items.name}</p>
              <p>: {items.startDate}</p>
              <p>: {items.linktrello}</p>
              <ReadMore>
              <p>: {items.description}</p>
              </ReadMore>
              
              <p>
                :
                {items.collaborator.map((item) => (
                  <span key={item.key}>@{item.name} </span>
                ))}
              </p>
            </Col>
          </Row>
          <Divider />
        </>
      ))}
    </Card>
  );
};
const ProjectListPage = () => {
  const { data, isLoading } = useGetProjects();
  return <div className="card">{isLoading ? <p>Data is loading...</p> : <MyProjectComponent data={data} />}</div>;
};

const DashboardProjectPage = () => {
  return (
    <SidebarMemberComponent defaultSelectedKeys="1">
      <div className="tabs">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Artikel" key="1">
            <ArticleComponent data={articleData} />
            <ArticleComponent data={articleData} />
            <ArticleComponent data={articleData} />
            <ArticleComponent data={articleData} />
          </TabPane>
          <TabPane tab="Project" key="2">
            <ProjectListPage />
          </TabPane>
        </Tabs>
        <Divider />
      </div>
    </SidebarMemberComponent>
  );
};

export default DashboardProjectPage;
