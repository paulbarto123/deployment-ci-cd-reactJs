import React, { useState } from "react";
import { Table, Popconfirm, Spin, Button } from "antd";

import SidebarAdminComponent from "../../../components/SidebarAdminComponent";
import useGetEnrollment from "../../../Query/useGetEnrollment";
import useCreateApprove from "../../../Mutations/useCreateApprove";
import "./enrollment.css";

const title = () => {
  return <h1 style={{ fontSize: "36px", fontStyle: "bold" }}>Enrollment Request</h1>;
};
const showHeader = true;
const pagination = { position: "bottom" };

const DashboardAdminPage = () => {
  const { data, isLoading } = useGetEnrollment();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [enrolmentState, setEnrollmentState] = useState({
    user_ids: [],
  });
  console.log("enrollmentData >>", data);

  const columns = [
    {
      
      title: "No",
      dataIndex: "id_user",
      key: "id_user"
    },
    {
     
      title: "Nama",
      dataIndex: "nama_lengkap",
      key: "nama_lengkap"
    },
    {
      
      title: "Topik Diminati",
      dataIndex: "topik_diminati",
      key: "topik_diminati",
    },
    {
      title: 'Status',
      dataIndex: '',
      key: 'x',
      render: () => <p>Menunggu Approval</p>
    },
    {
      title: "approval",
      dataIndex: "approval",
      render: (_, record) => 
        data.results.length >= 1 ? (
          <Popconfirm
            title="Sure to Approve?"
            onConfirm={() => {
              handleUpdateStatus(record);
            }}
          >
            <Button type="primary" size="middle">Approve</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const tables = {
    bordered: false,
    loading: false,
    pagination,
    size: "default",
    title: title,
    showHeader,
    rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: "none",
    bottom: "bottomRight",
  };

  const { mutate } = useCreateApprove(enrolmentState, (result) => {
    console.log(enrolmentState);
    console.log("success mutation >> ", result);
    window.location.reload();
  });
  const handleUpdateStatus = (record) => {
    console.log("record to approve", record);
    setEnrollmentState({
      ...enrolmentState,
      user_ids: [...enrolmentState.user_ids, record.id_user],
    });
    console.log("enrolmentState >>", enrolmentState);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <>
      <SidebarAdminComponent>
        {isLoading ? (
          <>
         
           
           <Spin tip="Loading..."></Spin>
          </>
        ) : 
          (
              <Table
              key={data.results.id_user}
              rowKey={data.results.id_user}
              {...tables}
              pagination={{ position: [tables.top, tables.bottom] }}
              columns={columns}
              dataSource={data.results}
              rowSelection={rowSelection}
            />
          )
            }

        <div className="approve">
          <button type="submit" className="approve_button" onClick={mutate}>
            Approve
          </button>
        </div>
      </SidebarAdminComponent>
    </>
  );
};
export default DashboardAdminPage;
