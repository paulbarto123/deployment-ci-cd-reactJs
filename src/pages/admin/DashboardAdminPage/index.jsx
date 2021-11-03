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
    //tanggalRegistrasi: "",
    // nama_lengkap: "",
    // //status: "",
    // topik_diminati: "",
  });
  console.log("enrollmentData >>", data);

  const columns = [
    {
      
      title: "No",
      dataIndex: "id_user",
      key: "id_user"
    },
    // {
    //   title: "Tanggal Registrasi",
    //   dataIndex: "tanggalRegistrasi",
    //   defaultSortOrder: "descend",
    //   sorter: (a, b) => a.tanggalRegistrasi.length - b.tanggalRegistrasi.length,
    // },
    {
     
      title: "Nama",
      dataIndex: "nama_lengkap",
      key: "nama_lengkap"
      //defaultSortOrder: "descend",
     // sorter: (a, b) => a.nama_lengkap.length - b.nama_lengkap.length,
    },
    {
      
      title: "Topik Diminati",
      dataIndex: "topik_diminati",
      //defaultSortOrder: "ascend",
      key: "topik_diminati",
     // sorter: (a, b) => a.nama_lengkap.length - b.nama_lengkap.length,
    },
    {
      title: 'Status',
      dataIndex: '',
      key: 'x',
      render: () => <p>Menunggu Approval</p>
      // filters: [
      //   {
      //     text: "Menunggu Approval",
      //     value: "Menunggu Approval",
      //   },
      //   {
      //     text: "Approved",
      //     value: "Approved",
      //   },
      //],
      // onFilter: (value, record) => record.status.indexOf(value) === 0,
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
      //tanggalRegistrasi: record.tanggalRegistrasi,
      //nama_lengkap: record.nama_lengkap,
      //status: "Approved",
     // topik_diminati: record.topik_diminati,
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
  // const tableColumns = columns.map((item) => ({
  //   ...item,
  //   ellipsis: tables.ellipsis,
  // }
  // ));
  return (
    <>
      <SidebarAdminComponent>
        {isLoading ? (
          <>
         
           
           <Spin tip="Loading..."></Spin>
          </>
        ) : 
          (
            
            // data.results.map((items) => (
            //   <>
            //     <Checkbox
            //         onChange={() => {
            //           setEnrollmentState({
            //             ...enrolmentState,
            //             user_ids:[...enrolmentState.user_ids, items.id_user],
            //           });
            //           console.log("new Form State >> ", enrolmentState);
            //         }}
            //       >
            //         {items.id_user}
            //       </Checkbox>
            //       <Space>
            //         {" "}
            //         <p>{items.nama_lengkap}</p>
            //         <p>{items.topik_diminati}</p>
            //       </Space>
            //  <Divider />
            //  </>
            // ))

           
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
