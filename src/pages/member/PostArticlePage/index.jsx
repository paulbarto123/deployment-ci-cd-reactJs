import React, { useState } from "react";
import { Form, Input, Button, Select, Space } from "antd";
import SidebarMemberComponent from "../../../components/SidebarMemberComponent";
// import moment from "moment";
import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";

import useCreateArticle from "../../../Mutations/useCreateArticle";

const { TextArea } = Input;
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

const PostArticlePage = () => {
  const [token] = useState(localStorage.getItem("token"));
  var decodedToken = jwt_decode(token);
  console.log(decodedToken.user_id, "decoded >>");
  const history = useHistory();
  const [componentSize, setComponentSize] = useState("default");
  const [formState, setFormState] = useState({
    kategori: "",
    judul: "",
    isi_artikel: "",
    id_user: parseInt(decodedToken.user_id),
  });
  // date: moment(new Date().toString()).format("DD MMMM YYYY"),

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { mutate, isError } = useCreateArticle(formState, (result) => {
    if (isError) {
      console.log("message >> ", result);
    }
    console.log(formState);
    console.log("success mutation >> ", result);
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
        <Form.Item label="Kategori Artikel">
          <Select
            onChange={(value) => {
              setFormState({ ...formState, kategori: value });
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
              setFormState({ ...formState, judul: value.target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Isi Artikel">
          <TextArea
            rows={4}
            onChange={(value) => {
              setFormState({ ...formState, isi_artikel: value.target.value });
              // console.log(value.target.value);
            }}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Space>
            <Button type="primary" onClick={mutate}>
              Buat & Publikasi Artikel
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

export default PostArticlePage;
