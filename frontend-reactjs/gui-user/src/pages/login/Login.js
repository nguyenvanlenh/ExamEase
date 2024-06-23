import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.scss";

import BackgroundImage from "../../data/imgs/backgroud.jpg";
import Logo from "../../data/imgs/user_icon.webp";
import { authService } from "../../services/authService";
import { RequestData } from "../../utils/request";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/slices/authSlice";
import { ROLE_ADMIN } from "../../utils/constants";

const Login = () => {
  const navigation = useNavigate()
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);

    const data = await authService.login(RequestData().LoginRequest(inputUsername, inputPassword))
    if (data.status >= 400) {
      setShow(true);
    } else {
      dispatch(addAuth(data.data))
      localStorage.setItem('username', JSON.stringify(inputUsername))
      if (data?.data?.listRoles?.includes(ROLE_ADMIN)) {
        navigation("/admin/dashboard");
      } else {
        navigation("/");
      }
    }
    setLoading(false);
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Đăng nhập</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Tài khoản hoặc mật khẩu không đúng.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Tài khoản</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Tài khoản"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Mật khẩu"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Đăng nhập
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Đang đăng nhập...
          </Button>
        )}
        <div className="d-flex justify-content-between">
          <Link to={"/register"} className="mt-2">Đăng ký?</Link>
          <Button
            className="text-muted px-0"
            variant="link"
          >
            Quên mật khẩu?
          </Button>
        </div>
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        @ 2024 - Bản quyền của Công ty TNHH Công Nghệ VLDL. | &copy;2024
      </div>
    </div>
  );
};

export default Login;
