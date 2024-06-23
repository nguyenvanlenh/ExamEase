import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./LoginStudent.scss";

import BackgroundImage from "../../data/imgs/backgroud.jpg";
import Logo from "../../data/imgs/user_icon.webp";
import { authService } from "../../services/authService";
import { RequestData } from "../../utils/request";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/slices/authSlice";
import { workTimeService } from "../../services/workTimeService";
import { addExamWorked } from "../../redux/slices/examWorkedSlice";

const LoginStudent = () => {
  const navigation = useNavigate()
  const [inputCodeGroup, setInputCodeGroup] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
    const data =  await authService.loginStudent(RequestData().LoginStudentRequest(inputEmail, inputPassword, inputCodeGroup))
    if (data.status !== 200) {
      setShow(true);
    }else {
      dispatch(addAuth(data.data))
      navigation("/examining-rules")
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
        <Form.Group className="mb-2" controlId="codeGroup">
          <Form.Label>Mã nhóm</Form.Label>
          <Form.Control
            type="text"
            value={inputCodeGroup}
            placeholder="Mã nhóm"
            onChange={(e) => setInputCodeGroup(e.target.value)}
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
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        @ 2024 - Bản quyền của Công ty TNHH Công Nghệ VLDL. | &copy;2024
      </div>
    </div>
  );
};

export default LoginStudent;
