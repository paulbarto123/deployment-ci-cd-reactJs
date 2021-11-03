import React, { useState } from "react";
import { Form, Input, Button, Card, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";

import { useAuthorizedContext } from "../../../auth/AuthorizedContext";
import useLoginAdmin from "../../../Mutations/useLoginAdmin";
import "./login.css";

export default function LoginAdminPage() {
  const history = useHistory();
  const { setAuthorizedValue } = useAuthorizedContext();
  const [data, setData] = useState({
    email: "",
    password: "",
    login_as: 1,
  });
  const { mutate } = useLoginAdmin(data, (results) => {
    if (results) {
      localStorage.setItem("admin-token", JSON.stringify(results.results.token));
      handleSignInButton();
    }
  });

  const handleSignInButton = React.useCallback(() => {
    setAuthorizedValue(true);
    history.push("/beranda-admin");
  }, [setAuthorizedValue, history]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card className="card-login" style={{ width: "30%" }}>
      <Form
        name="basic"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* logo */}
        <Form.Item style={{ textAlign: "center" }}>
          <Image
            width={150}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_2020.svg/1200px-BRI_2020.svg.png"
          ></Image>
        </Form.Item>

        {/* input username */}
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </Form.Item>

        {/* input password */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </Form.Item>

        {/* button masuk */}
        <Form.Item>
          <Link to="/beranda-admin">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={mutate}
            >
              Masuk
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
}
