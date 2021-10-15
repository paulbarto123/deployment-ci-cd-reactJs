import React, { useState } from "react";
import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import { Form, DatePicker, Input, Button, Select, Table, Divider } from "antd";
import useCreateProject from "../../../api/useCreateProject";
import moment from "moment";
import { useHistory } from "react-router";
import Text from "antd/lib/typography/Text";

const { Option } = Select;

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

const CreateProjectPage = () => {
  const history = useHistory();
  const [componentSize, setComponentSize] = useState("default");
  const [formState, setFormState] = useState({
    category: "",
    name: "",
    startDate: moment(new Date().toString()).format("DD MMMM YYYY"),
    description: "",
    linktrello: "",
    collaborator: [],
  });
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { mutate } = useCreateProject(formState, (result) => {
    console.log(formState);
    console.log("success mutation >> ", result);
    history.replace("/member/project-saya");
  });

  const { TextArea } = Input;
  const columns = [
    {
      title: "No",
      dataIndex: "key",
    },
    {
      title: "Nama",
      dataIndex: "name",
      render: (text) => <Text>{text}</Text>,
    },
  ];
  const data = [
    {
      key: "1",
      number: "1",
      name: "Patrick",
    },
    {
      key: "2",
      number: "2",
      name: "Spongebob",
    },
    {
      key: "3",
      number: "3",
      name: "Sandy",
    },
    {
      key: "4",
      number: "4",
      name: "Tuan Krabs",
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
      setFormState({ ...formState, collaborator: selectedRows });
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };
  console.log(formState);
  const [selectionType] = useState("checkbox");

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
        <Form.Item label="Kategori Project" name="category-option" rules={[{ required: true, message: "Please choose your category" }]}>
          <Select
            placeholder="Pilih Topik"
            onChange={(value) => {
              setFormState({ ...formState, category: value });
            }}
          >
            {CategoryOptionsValue.map((option) =>
              option.key === " " ? (
                <Option key={option.key} value={option.value} disabled={option.isDisabled}></Option>
              ) : (
                <Option key={option.key} value={option.value} disabled={option.isDisabled}>
                  {option.label}
                </Option>
              )
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Nama Project" name="nameproject" rules={[{ required: true, message: "Please input your name project" }]}>
          <Input
            onChange={(value) => {
              setFormState({ ...formState, name: value.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Tanggal Mulai" name="startdate" rules={[{ required: true, message: "Please input your start date" }]}>
          <DatePicker
            onChange={(value) => {
              setFormState({
                ...formState,
                startDate: moment(value._d).format("DD MMMM YYYY"),
              });
            }}
          />
        </Form.Item>

        <Form.Item label="Link Trello" name="linktrello" rules={[{ required: true, message: "Please input your link trello" }]}>
          <Input
            onChange={(value) => {
              setFormState({ ...formState, linktrello: value.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Deskripsi Project" name="projectdesc" rules={[{ required: true, message: "Please input your project desciption" }]}>
          <TextArea
            rows={4}
            onChange={(value) => {
              setFormState({ ...formState, description: value.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Undang Member" name="invitemember" rules={[{ required: true, message: "Please invite your members" }]}>
          <Divider />
          <div>
            <Table
              dataSource={data}
              columns={columns}
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
            />
          </div>
        </Form.Item>

        <Button type="primary" onClick={mutate}>
          Submit
        </Button>
        <Button type="primary" danger>
          Cancel
        </Button>
      </Form>
    </SidebarMemberComponent>
  );
};

export default CreateProjectPage;
