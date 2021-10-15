import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./register.css";
import { Form, Input, Button, Select, message, Typography } from "antd";
const { Title } = Typography;
const OPTIONS = ["Sosial & Kebudayaan", "Lingkungan Hidup", "Ekonomi", "Investasi"];
export default function RegisterPage() {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelect = React.useCallback(() => {
    setSelectedItems(selectedItems);
  }, [selectedItems]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const success = () => {
    message
      .loading("Action in progress..", 2.5)
      .then(() => message.success("Loading finished", 2.5))
      .then(() => message.info("Loading finished is finished", 2.5));
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <Title className="registerLogo" level={3}>
            Bank Name
          </Title>
          <span className="registerDesc">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <Title className="registerBoxTextHed" level={4}>
              Selamat Datang di Co-Create
            </Title>
            <Title className="registerBoxTextSub" level={5}>
              {" "}
              Silahkan register, untuk memulai
            </Title>
            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                align="middle"
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input placeholder="Name" className="nameInput" />
              </Form.Item>
              <Form.Item
                align="middle"
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder="Username" className="usernameInput" />
              </Form.Item>

              <Form.Item
                align="middle"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Password" className="passwordInput" />
              </Form.Item>
              <Form.Item
                align="middle"
                label="Confirm Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Confirm Password" className="passwordConfirm" />
              </Form.Item>
              <Form.Item align="middle" name="topic" label="Select Topic" rules={[{ required: true }]}>
                <Select className="topics" mode="multiple" placeholder="Select Your Favourite Topic" value={selectedItems} onChange={handleSelect} style={{ width: "100%" }}>
                  {filteredOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 16,
                }}
              >
                <Link to="/">
                  <Button className="registerButton" type="primary" htmlType="submit" onClick={success}>
                    Register
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
