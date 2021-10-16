import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useAuthorizedContext } from "../../../auth/AuthorizedContext";
import { useHistory } from "react-router-dom";

import { Button, Form, Input, Typography } from "antd";
const { Title } = Typography;

export default function LoginMemberPage() {
  const history = useHistory();
  const { setAuthorizedValue } = useAuthorizedContext();

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
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <Title level={3} className="loginLogo">
            Bank Name
          </Title>
          <span className="loginDesc">Lorem ipsum, dolor sit amet consectetur adipisicing elit consectetur dolor .</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <Title level={4} className="loginBoxTextHed">
              Selamat Datang di Co-Create
            </Title>
            <Title level={5} className="loginBoxTextSub">
              Silahkan login, untuk memulai 
            </Title>
            <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
              <Form.Item label="Username" name="username" align="middle" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input placeholder="Username" className="usernameInput" />
              </Form.Item>

              <Form.Item label="Password" name="password" align="middle" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password placeholder="Password" className="passwordInput" />
              </Form.Item>

              <Link to="member/beranda-project">
                <Button className="loginButton" onClick={handleSignInButton}>
                  Masuk
                </Button>
              </Link>

              <span className="loginForgot">Belum punya akun?</span>
              <Link to="register">
                <Button type="" className="registerButton">
                  Register
                </Button>
              </Link>

              <span className="loginForgot">Anda adalah admin?</span>
              <Link to="login-admin">
                <Button type="" className="loginAdmin">
                  Login Admin
                </Button>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
