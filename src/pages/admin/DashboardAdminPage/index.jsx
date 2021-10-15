import React, { useState } from "react";
import "./enrollment.css";
import { Table, Popconfirm, Spin } from "antd";
import SidebarAdminComponent from "../../../components/SidebarAdminComponent/index";
import useGetEnrollment from "../../../api/useGetEnrollment";
import useUpdateEnrollment from "../../../api/useUpdateEnrollment";

const title = () => {
  return (
    <h1 style={{ fontSize: "36px", fontStyle: "bold" }}>Enrollment Request</h1>
  );
};
const showHeader = true;
const pagination = { position: "bottom" };

const DashboardAdminPage = () => {
  const { data, isLoading } = useGetEnrollment();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [enrolmentState, setEnrollmentState] = useState({
    id: "",
    tanggalRegistrasi: "",
    nama: "",
    status: "",
    topik: "",
  });
  console.log("enrollmentData >>", data);

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Tanggal Registrasi",
      dataIndex: "tanggalRegistrasi",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tanggalRegistrasi.length - b.tanggalRegistrasi.length,
    },
    {
      title: "Nama",
      dataIndex: "nama",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.nama.length - b.nama.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Menunggu Approval",
          value: "Menunggu Approval",
        },
        {
          text: "Approved",
          value: "Approved",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "approval",
      dataIndex: "approval",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to Approve?"
            onConfirm={() => {
              handleUpdateStatus(record);
            }}
          >
            <a href="#">Approve</a>
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

  const { mutate } = useUpdateEnrollment(enrolmentState, (result) => {
    console.log(enrolmentState);
    console.log("success mutation >> ", result);
    window.location.reload();
  });
  const handleUpdateStatus = (record) => {
    console.log("record", record);
    setEnrollmentState({
      id: record.id,
      tanggalRegistrasi: record.tanggalRegistrasi,
      nama: record.nama,
      status: "Approved",
      topik: record.topik,
    });
    console.log("enrolmentState >>",enrolmentState)
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: tables.ellipsis,
  }));

  return (
    <>
      <SidebarAdminComponent>
        {isLoading ? (
          <Spin tip="Loading..."></Spin>
        ) : (
          <Table
            rowKey={data.id}
            {...tables}
            pagination={{ position: [tables.top, tables.bottom] }}
            columns={tableColumns}
            dataSource={data}
            rowSelection={rowSelection}
          />
        )}

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
