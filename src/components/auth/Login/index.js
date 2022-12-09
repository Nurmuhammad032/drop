import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../../manageState/actionCreators/authActionCreators";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: emailValue,
      password,
    };
    dispatch(loginUser(data, setError));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isLoggedIn) {
      history.goBack();
    }
  }, [error]);
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
          <Row className="align-items-center">
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
              <h1 className="display-5 text-secondary my-4 text-center">
                Login
              </h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <label htmlFor="email" className="app__register-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="app__login-inputs"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <label htmlFor="password" className="app__register-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="app__login-inputs"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicBtn" className="mt-3">
                  <button type="submit" className="app__register-btn">
                    Login
                  </button>
                </Form.Group>
                <p className="my-3 text-center">
                  If you didn't create a account <br />
                  <Link to="/signup" className="ms-2 text-decoration-none">
                    Register
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

export default Login;
