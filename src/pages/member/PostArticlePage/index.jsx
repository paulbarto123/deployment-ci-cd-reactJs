import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
import moment from "moment";
import { useHistory } from "react-router-dom";
import useCreateArticle from "../../../api/useCreateArticle";
const { TextArea } = Input;
const { Option } = Select;

const PostArticlePage = () => {
  const history = useHistory();
  const [componentSize, setComponentSize] = useState("default");
  const [formState, setFormState] = useState({
    category: "",
    title: "",
    detail: "",
    date: moment(new Date().toString()).format("DD MMMM YYYY"),
  });
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { mutate } = useCreateArticle(formState, (result) => {
    //console.log(formState);
    //console.log("success mutation >> ", result);
    history.replace("/member/artikel-saya");
  });

  return (
    <SidebarMemberComponent defaultSelectedKeys="5">
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
        <Form.Item label="Kategori Project">
          <Select
            onChange={(value) => {
              setFormState({ ...formState, category: value })
            }}
          >
            <Option value="Pengembangan Teknologi Go Green">
              Pengembangan Teknologi Go Green
            </Option>
            <Option value="Sosial & Kebudayaan">Sosial & Kebudayaan</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Judul">
          <Input
            onChange={(value) => {
             setFormState({ ...formState, title: value.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Deskripsi Project">
          <TextArea
            rows={4}
            onChange={(value) => {
              setFormState({ ...formState, detail: value.target.value });
             // console.log(value.target.value);
            }}
          />
        </Form.Item>

        <Button type="primary" onClick={mutate}>
          Submit
        </Button>
        <Button type="secondary" danger>
          Cancel
        </Button>
      </Form>
    </SidebarMemberComponent>
  );
};

export default PostArticlePage;
