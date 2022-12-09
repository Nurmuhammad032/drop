import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import emoji from "./assets/svg/emoji.svg";
import cloud from "./assets/svg/cloud.svg";
import shield from "./assets/svg/shield.svg";
import twinkle from "./assets/svg/twinkle.svg";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NavbarComponent from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./manageState/actionCreators/authActionCreators";
import { Row, Col, Container } from "react-bootstrap";
import NotFound from "./components/NotFound";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getUser());
    }
  }, [dispatch]);
  return (
    <div className="App">
      <ToastContainer position="bottom-right" />

      <Switch>
        <Route exact path={"/"}>
          <NavbarComponent />
          <div
            style={{
              background: "#1E1919",
              minHeight: "100vh",
            }}
          >
            <div
              style={{
                width: "40rem",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  color: "#F7F5F2",
                  padding: "3rem 0 1rem",
                  fontWeight: 400,
                }}
              >
                Join over 700 million registered users who trust Dropbox
              </h1>
              <p
                style={{
                  color: "#F7F5F2",
                }}
              >
                Easy to use, reliable, private and secure. It’s no wonder
                Dropbox is the choice for storing and sharing your most
                important files.
              </p>
            </div>

            <img
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/v2-hp-asset-medium-2560x1840-en_GB.jpg.transform/2560w/80q/img.jpg"
              alt="ph"
              style={{
                width: "40rem",
                display: "block",
                margin: "4rem auto",
              }}
            />
            <Container>
              <Row>
                <Col md="3" className="p-4">
                  <div className="text-white ">
                    <img src={emoji} alt="hp" />
                    <h5 className="mt-4 mb-3">Your files, not ours</h5>
                    <p>
                      With Dropbox, your files belong to you, not us, so you can
                      be sure we’re not reselling your data.
                    </p>
                  </div>
                </Col>
                <Col md="3" className="p-4">
                  <div className="text-white ">
                    <img src={cloud} alt="hp" />
                    <h5 className="mt-4 mb-3">All your files in one place</h5>
                    <p>
                      Store computer backups, photo libraries, thousands of
                      documents – all your files, in the same place.
                    </p>
                  </div>
                </Col>
                <Col md="3" className="p-4">
                  <div className="text-white ">
                    <img src={twinkle} alt="hp" />
                    <h5 className="mt-4 mb-3">One-of-a-kind functionality</h5>
                    <p>
                      Store files as large as 2 TB each, sync at light speed and
                      allow anyone to preview nearly 200 file types.
                    </p>
                  </div>
                </Col>
                <Col md="3" className="p-4">
                  <div className="text-white ">
                    <img src={shield} alt="hp" />
                    <h5 className="mt-4 mb-3">Ease of use and security</h5>
                    <p>
                      2/3 of surveyed users say that Dropbox keeps their files
                      more secure and we’re a leader in ease of use.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Route>
        <Route exact path="/login" component={() => <Login />}></Route>
        <Route exact path="/signup" component={() => <Register />}></Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
