import React, { useState } from "react";
import { Card, Divider, Row, Col, Button, Modal, Spin } from "antd";
import { StepForwardOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";

import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import useGetCollabInvitation from "../../../Query/useGetCollabInvitation";
import useAccepInvitation from "../../../Mutations/useAccepInvitation";
import { useHistory } from "react-router";



const InviteCollabComponent = (props) => {
  
const token = localStorage.getItem("token");
var decodedToken = jwt_decode(token);
var user_id = decodedToken.user_id;

  const [invite] = useState({
    id_project: props.data.id_project,
    id_user: parseInt(user_id)
  })
  const history = useHistory();
  
  
  const { mutate, isError } = useAccepInvitation(invite, (result) => {
    if (isError) {
      console.log("message >> ", result);
    }
    console.log(invite);
    console.log("success mutation >> ", result);
    history.replace("/member/project-saya");
  });
  function success() {
    mutate();
    Modal.success({
      content: "Anda telah bergabung",
    });
  }

  return (
    <Card
      title=""
      bordered={true}
      style={{ width: 1200, backgroundColor: "Lavender" }}
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
              <p>Kollaborator lainnya</p>
            </Col>
            <Col span={19}>
              <h4>
                : <b>{props.data.kategori_project}</b>
              </h4>
              <p>: {props.data.nama_project}</p>
              <p>: {props.data.start_date}</p>
              <p>: {props.data.link_trello}</p>
              <p>: {props.data.deskripsi_project}</p>
             
            </Col>
          </Row>
          <Button type="primary" shape="round" onClick={success}>
            Bergabung <StepForwardOutlined />
          </Button>
          <Divider />
        </>
    </Card>
  );
};

const InviteCollab = () => {
  const { data, isLoading } = useGetCollabInvitation();
  console.log("get invitation >>", data);
  return (
    <SidebarMemberComponent defaultSelectedKeys="4">
      <div className="card">
        {isLoading ? (
          <Spin tip="Loading..."></Spin>
        ) : (
          data.results.map((data) => (
            <InviteCollabComponent key={data.id_project} data={data} />
          ))
          
        )}
      </div>
    </SidebarMemberComponent>
  );
};

export default InviteCollab;
