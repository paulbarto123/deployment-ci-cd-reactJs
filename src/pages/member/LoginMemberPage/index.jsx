import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./login.css";
import "antd/dist/antd.css";
import { useAuthorizedContext } from "../../../auth/AuthorizedContext";
import useLogin from "../../../Mutations/useLogin";

export default function LoginMemberPage() {
  const history = useHistory();
  const { setAuthorizedValue } = useAuthorizedContext();
  const [data, setData] = useState({
    email: "",
    password: "",
    login_as: 2
  });

  const { mutate } = useLogin(data, (result) => {
    if(result){
      console.log("result >>",result);
      localStorage.setItem("token", JSON.stringify(result.results.token))
      handleSignInButton()
    }
  });
  const handleSignInButton = React.useCallback(() => {
    setAuthorizedValue(true);
    history.push("/beranda-project");
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
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={(e) => {
              setData({...data, email: e.target.value})
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
              setData({...data, password: e.target.value})
            }}
          />
        </Form.Item>

        {/* link remember me and forgot password */}
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        {/* button masuk */}
        <Form.Item>
          <Link to="member/beranda-project">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={mutate}
            >
              Masuk
            </Button>
          </Link>
          Belum punya akun?
          <Link to="register">
            <a href="/register"> Daftar </a>
          </Link>
        </Form.Item>

        {/* login admin */}
        <Form.Item>
          Anda adalah admin?
          <Link to="login-admin">
            <a href="/login-admin"> Login Admin </a>
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
}
