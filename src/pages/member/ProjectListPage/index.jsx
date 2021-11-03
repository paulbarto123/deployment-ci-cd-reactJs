import React from "react";
import { Card, Divider, Row, Col, Spin } from "antd";
import moment from "moment";

import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import useGetMyProject from "../../../Mutations/useGetMyProject";
import Text from "antd/lib/typography/Text";

const MyProjectComponent = (props) => {
  console.log("props data >>", props.data.collaborator_user_id);
  return (
    <Card
      title=""
      bordered={true}
      style={{ width: 1120, backgroundColor: "AliceBlue" }}
    >
      <>
        <Row key={props.data.id_project}>
          <Col span={5}>
            <h4>
              <b>Kategori Project</b>
            </h4>
            <p>Nama Project</p>
            <p>Tanggal Mulai</p>
            <p>Link Trello</p>
            <p>Deskripsi Project</p>
            <p>Kollaborator</p>
            {/* <p>Invited User</p> */}
          </Col>
          <Col span={19}>
            <h4>
              : <b>{props.data.kategori_project}</b>
            </h4>
            <p>: {props.data.nama_project}</p>
            <p>: {moment(props.data.start_date).format("DD MMMM YYYY")}</p>
            <p>: {props.data.link_trello}</p>
            <p>: {props.data.deskripsi_project}</p>
            <p>
              :<span>@{props.data.collaborator_user_name} </span>
            </p>
            {/* <p>
              :@{
                props.data.invited_user_name[0]
              }
              {/* {.map((items) => (
                <span>@{items} </span>
              ))} 
            </p> */}
          </Col>
        </Row>
        <Divider />
      </>
    </Card>
  );
};
const ProjectListPage = () => {
  const { data, isLoading } = useGetMyProject();
  console.log("data ?? ", data);
  return (
    <SidebarMemberComponent defaultSelectedKeys="3">
      <div className="card">
        {isLoading ? (
          <Spin tip="Loading..."></Spin>
        ) : data ? (
          data.results.map((project) => (
            // console.log("project value >> ", project)
            <MyProjectComponent key={project.id_project} data={project} />
          ))
        ) : (
          <Text>Gagal memuat data</Text>
        )}
      </div>
    </SidebarMemberComponent>
  );
};

export default ProjectListPage;
