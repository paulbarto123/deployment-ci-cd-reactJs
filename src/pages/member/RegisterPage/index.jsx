import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Card, Image, Select, message } from "antd";

import "./register.css";
import "antd/dist/antd.css";

import useRegister from '../../../Mutations/useRegister'

const { Option} = Select;

const TopicOptionsValue = [
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

export default function RegisterPage() {
  const [form] = Form.useForm();
  const [ data, setData] = useState({
    name: "",
    email: "",
    password: "",
    topik_diminati: "",
    role_id: 2
  });

  const { mutate } = useRegister(data, (result) => {
    if(result){
      message
      .loading("Action in progress..", 2.5)
      .then(() => message.success("Loading finished", 2.5))
      .then(() => message.info("Loading finished is finished", 2.5));
    }
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleSelect = React.useCallback((value) => {
    setData({...data, topik_diminati: value});
  }, [data]);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 9,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 18,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 9,
      },
    },
  };

  return (
    <Card className="card-register" style={{ width: "40%" }}>
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        className="register-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/*logo */}
        <Form.Item {...tailFormItemLayout}>
          <Image
            width={150}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_2020.svg/1200px-BRI_2020.svg.png"
          ></Image>
        </Form.Item>

        {/* input fullname */}
        <Form.Item
          name="fullName"
          label="Nama Lengkap"
          onChange={(event) => {
            setData({...data, name: event.target.value})
          }}
          rules={[
            {
              required: true,
              message: "Masukkan nama lengkap!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* input username */}
        <Form.Item
          name="username"
          label="Email"
          onChange={(event) => {
            setData({...data, email: event.target.value})
          }}
          rules={[
            {
              required: true,
              message: "Masukkan username!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* input password */}
        <Form.Item
          name="password"
          label="Password"
          onChange={(event) => {
            setData({...data, password: event.target.value})
          }}
          rules={[
            {
              required: true,
              message: "Masukkan password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        {/* input confirm password */}
        <Form.Item
          name="confirmPassword"
          label="Konfirmasi Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Masukkan konfirmasi password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* select topic */}
         <Form.Item
          label="Topic"
          name="topic"
          rules={[{ required: true, message: "Silahkan masukkan topik anda" }]}
        >
          <Select
            placeholder="- Pilih Topik -"
            onChange={handleSelect}
            initialValues="Go Green"
          >
            {TopicOptionsValue.map((option) =>
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


        {/* button register */}
        <Form.Item {...tailFormItemLayout}>
          <Link to="/">
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
              onClick={mutate}
            >
              Daftar
            </Button>
          </Link>
          Sudah punya akun?
          <a href="/"> Masuk</a>
        </Form.Item>
      </Form>
    </Card>
  );
}
