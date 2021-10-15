import React, { useState } from "react";
import { Card, Divider, Row, Col, Button, Modal } from "antd";
import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import useGetCollabInvitation from "../../../api/useGetCollabInvitation";
import { StepForwardOutlined } from "@ant-design/icons";

const InviteCollabComponent = (props) => {
  function success() {
    Modal.success({
      content: "Anda telah bergabung",
    });
  }
  return (
    <Card title="" bordered={true} style={{ width: 1200, backgroundColor: "Lavender" }}>
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
              <p>Admin</p>
              <p>Kollaborator lainnya</p>
            </Col>
            <Col span={19}>
              <h4>
                : <b>{items.category}</b>
              </h4>
              <p>: {items.name}</p>
              <p>: {items.startDate}</p>
              <p>: {items.linktrello}</p>
              <p>: {items.description}</p>
              <p>: {items.admin}</p>
              <p>
                :
                {items.collaborator.map((item) => (
                  <span key={item.key}> {item.name} </span>
                ))}
              </p>
            </Col>
          </Row>
          <Button type="primary" shape="round" onClick={success}>
            Bergabung <StepForwardOutlined />
          </Button>
          <Divider />
        </>
      ))}
    </Card>
  );
};

const InviteCollab = () => {
  const { data, isLoading } = useGetCollabInvitation();
  return (
    <SidebarMemberComponent defaultSelectedKeys="4">
      <div className="card">{isLoading ? <p>Data is loading...</p> : <InviteCollabComponent data={data} />}</div>
    </SidebarMemberComponent>
  );
};

export default InviteCollab;
