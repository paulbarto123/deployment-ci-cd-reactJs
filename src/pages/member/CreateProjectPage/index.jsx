import React, { useState } from "react";
import moment from "moment";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
// import Text from "antd/lib/typography/Text";
import {
  Form,
  DatePicker,
  Input,
  Button,
  Select,
  //Table,
  Space,
  Divider,
  Spin,
  Checkbox,
} from "antd";
// import jwt_decode from "jwt-decode";

import useCreateProject from "../../../Mutations/useCreateProject";
import useGetUserList from "../../../Query/useGetUserList";
import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import Text from "antd/lib/typography/Text";

const { Option } = Select;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

const CategoryOptionsValue = [
  {
    key: "teknologi",
    value: "Pengembangan Teknologi",
    label: "Pengembangan Teknologi",
    isDisabled: false,
  },
  {
    key: "go-green",
    value: "Go Green",
    label: "Go Green",
    isDisabled: false,
  },
  {
    key: "sosial",
    value: "Sosial & Kemanusiaan",
    label: "Sosial & Kemanusiaan",
    isDisabled: false,
  },
  {
    key: "budaya",
    value: "Budaya",
    label: "Budaya",
    isDisabled: false,
  },
];
// function create_random_generator(string_length) {
//   var random_string = "";
//   var char = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   var i;

//   for (i = 0; i < string_length; i++) {
//     random_string =
//       random_string + char.charAt(Math.floor(Math.random() * char.length));
//   }
//   return random_string;
// }

const CreateProjectPage = () => {
  // var decodedToken = jwt_decode(token);
  // console.log(decodedToken.user_id, "decoded >>")
  const { data, isLoading } = useGetUserList();
  //var obj = data.results;
  // data.push({key: create_random_generator(5)})
  console.log("data User List >>", data);
  const history = useHistory();
  const [componentSize, setComponentSize] = useState("default");
  const [formState, setFormState] = useState({
    kategori_project: "",
    nama_project: "",
    start_date: moment(new Date().toString()).format("YYYY-MMMM-DD"),
    deskripsi_project: "",
    link_trello: "",
    invited_user_id: [],
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { mutate, isError } = useCreateProject(formState, (result) => {
    if (isError) {
      console.log("message >> ", result);
    }
    console.log(formState);
    console.log("success mutation >> ", result);
    history.replace("/member/project-saya");
  });

  const { TextArea } = Input;
  // const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //   },
  //   {
  //     title: "Nama",
  //     dataIndex: "name",
  //     render: (text) => <Text>{text}</Text>,
  //   },
  // ];
  // const data = [
  //   {
  //     key: "1",
  //     number: "1",
  //     name: "Patrick",
  //   },
  //   {
  //     key: "2",
  //     number: "2",
  //     name: "Spongebob",
  //   },
  //   {
  //     key: "3",
  //     number: "3",
  //     name: "Sandy",
  //   },
  //   {
  //     key: "4",
  //     number: "4",
  //     name: "Tuan Krabs",
  //   },
  // ];
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //     //setFormState({ ...formState, invited_user_id: selectedRows.id });
  //   },
  //   getCheckboxProps: (record) => ({
  //     name: record.name,
  //   }),
  // };
  console.log(formState);
  //const [selectionType] = useState("checkbox");

  return (
    <SidebarMemberComponent defaultSelectedKeys="2">
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        {/* kategori project */}
        <Form.Item
          label="Kategori Project"
          name="category-option"
          rules={[{ required: true, message: "Please choose your category" }]}
        >
          <Select
            placeholder="Pilih Topik"
            onChange={(value) => {
              setFormState({ ...formState, kategori_project: value });
            }}
          >
            {CategoryOptionsValue.map((option) =>
              option.key === " " ? (
                <Option
                  key={option.key}
                  value={option.value}
                  disabled={option.isDisabled}
                ></Option>
              ) : (
                <Option
                  key={option.key}
                  value={option.value}
                  disabled={option.isDisabled}
                >
                  {option.label}
                </Option>
              )
            )}
          </Select>
        </Form.Item>

        {/* name project */}
        <Form.Item
          label="Nama Project"
          name="nameproject"
          rules={[{ required: true, message: "Please input your name project" }]}
        >
          <Input
            onChange={(value) => {
              setFormState({ ...formState, nama_project: value.target.value });
            }}
          />
        </Form.Item>

        {/* start date */}
        <Form.Item
          label="Tanggal Mulai"
          name="startdate"
          rules={[{ required: true, message: "Please input your start date" }]}
        >
          <DatePicker
            style={{ width: "500px" }}
            onChange={(value) => {
              console.log(value, "data value >>");
              setFormState({
                ...formState,
                start_date: moment(value._d).format("YYYY-MM-DD"),
              });
            }}
          />
        </Form.Item>

        {/* link trello */}
        <Form.Item
          label="Link Trello"
          name="linktrello"
          rules={[{ required: true, message: "Please input your link trello" }]}
        >
          <Input
            onChange={(value) => {
              setFormState({ ...formState, link_trello: value.target.value });
            }}
          />
        </Form.Item>

        {/* project description */}
        <Form.Item
          label="Deskripsi Project"
          name="projectdesc"
          rules={[
            { required: true, message: "Please input your project desciption" },
          ]}
        >
          <TextArea
            rows={4}
            onChange={(value) => {
              setFormState({ ...formState, deskripsi_project: value.target.value });
            }}
          />
        </Form.Item>

        {/* invite member */}
        <Form.Item
          label="Undang Member"
          name="invitemember"
          rules={[{ required: true, message: "Please invite your members" }]}
        >
          <Divider />
          <div>
            {isLoading ? (
              <Spin tip="Loading..."></Spin>
            ) : data ? (
              data.results.map((items) => (
                <>
                  <Checkbox
                    onChange={() => {
                      setFormState({
                        ...formState,
                        invited_user_id:[...formState.invited_user_id, items.id],
                      });
                      console.log("new Form State >> ", formState);
                    }}
                  >
                    {items.id}
                  </Checkbox>
                  <Space>
                    {" "}
                    <p>{items.name}</p>
                  </Space>
                  <Divider />
                </>
              ))
            ) : (
              // <Table
              //   //rowKey={data.results.id}
              //   dataSource={data.results}
              //   columns={columns}
              //   rowSelection={{
              //     type: selectionType,
              //     rowSelection,
              //   }}
              // />
              <Text>Gagal memuat data</Text>
            )}
          </div>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Space>
            <Button type="primary" onClick={mutate}>
              Buat & Publikasi Project
            </Button>
            <Link to="/member/beranda-project">
              <Button type="primary" danger>
                Batal
              </Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </SidebarMemberComponent>
  );
};

export default CreateProjectPage;
