import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Register.scss";

import BackgroundImage from "../../data/imgs/backgroud.jpg";
import Logo from "../../data/imgs/user_icon.webp";
import { Link } from "react-router-dom";
import { RequestData } from "../../utils/request";
import { authService } from "../../services/authService";

const Register = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputRePassword, setInputRePassword] = useState("");
  const [selectRole, setSelectRole] = useState("STUDENT");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMute, setShowMute] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
    console.log(`Username :${inputUsername}, Password :${inputPassword}`);
    if (inputPassword !== inputRePassword) {
      setShowMute(true);
    }
    if (inputPassword === inputRePassword) {
      setShowMute(false);
      // nhận dữ liệu về kiểm tra đăng kí thành công không
      // const auth
      // setShow(true);
      const data = RequestData().RegisterRequest(
        inputUsername,
        inputPassword,
        inputEmail,
        selectRole === "STUDENT" ? [] : [selectRole]
      );
      const register = await authService.register(data);
      console.log(selectRole);
      console.log(inputEmail);
      console.log(register);
      console.log("OK");
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
        <div className="h4 mb-2 text-center">Đăng ký</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Tài khoản đã tồn không đúng.
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
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={inputEmail}
            placeholder="Email"
            onChange={(e) => setInputEmail(e.target.value)}
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
          <Form.Text
            className="text-danger"
            id="repassword"
            style={{ display: showMute ? "block" : "none" }}
          >
            Mật khẩu chưa đúng hoặc mật khẩu phải từ 8 đến 20 kí tự.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-2" controlId="repassword">
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={inputRePassword}
            placeholder="Nhập lại mật khẩu"
            onChange={(e) => setInputRePassword(e.target.value)}
            required
          />
          <Form.Text
            className="text-danger"
            id="repassword"
            style={{ display: showMute ? "block" : "none" }}
          >
            Mật khẩu chưa đúng hoặc mật khẩu phải từ 8 đến 20 kí tự.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="type">
          <Form.Label>Loại tài khoản</Form.Label>
          <Form.Select
            aria-label="Loại tài khoản"
            onChange={(e) => setSelectRole(e.target.value)}
          >
            <option value="STUDENT">Học sinh</option>
            <option value="TEACHER">Giáo viên</option>
          </Form.Select>
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Đăng ký
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Đang đăng ký...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Link to={"/login"} className="mt-2">
            Đăng nhập?
          </Link>
        </div>
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        @ 2024 - Bản quyền của Công ty TNHH Công Nghệ DL. | &copy;2024
      </div>
    </div>
  );
};

export default Register;
