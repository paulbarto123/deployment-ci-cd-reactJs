import React from "react";
import { Card, Divider, Row, Col } from "antd";
import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import useGetProjects from "../../../api/useGetProjects";

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
              <p>: {items.description}</p>
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
  return (
    <SidebarMemberComponent defaultSelectedKeys="3">
      <div className="card">{isLoading ? <p>Data is loading...</p> : <MyProjectComponent data={data} />}</div>
    </SidebarMemberComponent>
  );
};

export default ProjectListPage;
