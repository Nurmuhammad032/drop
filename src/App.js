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
              background:
                "url('https://wusys.yellowmind.agency/img/svg/bg-main.svg') center center/cover no-repeat",
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
                  color: "#212121",
                  padding: "3rem 0 1rem",
                  fontWeight: 400,
                }}
              >
                My Dropbox
              </h1>
              <p
                style={{
                  color: "#212121",
                }}
              >
                Dropbox brings everything - traditional files, cloud content and
                web shortcuts - together in one place.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "4rem",
              }}
            >
              <img
                src="https://fjord.dropboxstatic.com/warp/conversion/dropbox/warp/en-us/basic/basic_hero_ui_en_GB@2x.png?id=8a9978db-8b4e-4136-b20b-bfe317363ff2&output_type=png"
                alt="ph"
                style={{
                  width: "40rem",
                  display: "block",
                }}
              />
              <h1>
                Trusted by over 700 million <br /> registered users and 600,000
                teams
              </h1>
            </div>
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
