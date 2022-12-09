import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../../manageState/actionCreators/authActionCreators";
import "../Register.scss";

const Register = () => {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [confirmPasswordUpdate, setConfirmPasswordUpdate] = useState("");
  const [isError, setIsError] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameValue || !emailValue || !password)
      return toast.error("Please fill in all fields!!");

    if (password !== confirmPasswordUpdate)
      return toast.error("Passwords don't match!");

    if (password.length < 6) {
      return toast.error("Password length must be 5 or higher ");
    }

    const data = {
      name: nameValue,
      email: emailValue,
      password,
    };

    dispatch(registerUser(data, setIsError));
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [isError, isLoggedIn]);
  return (
    <Container>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Row className="h-320 p-4 align-items-center">
            <Col md="5">
              <img
                src="/login.png"
                alt="phhp"
                style={{
                  width: "20rem",
                }}
              />
            </Col>
            <Col md="6" className="ms-5">
              <h1
                style={{ fontWeight: "400" }}
                className="text-secondary my-4 text-center"
              >
                Create an account
              </h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName" className="mb-3">
                  <label htmlFor="name" className="app__register-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    className="app__login-inputs"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <label htmlFor="name" className="app__register-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className={"app__login-inputs"}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <label htmlFor="name" className="app__register-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    className={"app__login-inputs"}
                  />{" "}
                </Form.Group>
                <Form.Group
                  controlId="formBasicConfirmPassword"
                  className="mb-3"
                >
                  <label htmlFor="name" className="app__register-label">
                    Re-type password
                  </label>
                  <input
                    type="password"
                    value={confirmPasswordUpdate}
                    onChange={(e) => setConfirmPasswordUpdate(e.target.value)}
                    className={"app__login-inputs"}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicBtn" className="mt-3">
                  <button type="submit" className="app__register-btn">
                    Create account
                  </button>
                </Form.Group>
                <p className="my-3 text-center">
                  If you have already account
                  <Link to="/login" className="ms-2 text-decoration-none">
                    Log in
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Register;
