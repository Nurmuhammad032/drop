import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../manageState/actionCreators/authActionCreators";
import "./Navbar.scss";

const NavbarComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar
      bg="white"
      expand="xl"
      variant="dark"
      width="50"
      style={{
        padding: "1rem 0",
      }}
    >
      <Navbar.Brand
        as={Link}
        to="/"
        style={{
          marginLeft: "60px",
          marginRight: "auto",
          width: "40px",
          color: "#000",
          fontWeight: "600",
        }}
      >
        MY DROPBOX
      </Navbar.Brand>
      <Nav style={{ marginRight: "60px" }}>
        {isLoggedIn ? (
          <>
            <Nav.Link
              className="text-white d-flex align-items-center justify-content-between"
              style={{ pointerEvents: "unset", cursor: "text" }}
            >
              Welcome:
            </Nav.Link>
            <Nav.Link
              as={Link}
              style={{ marginRight: "10px", marginLeft: "-10px" }}
              className="text-white"
              to="/dashboard/profile"
            >
              <strong>{user.data.displayName}</strong>
            </Nav.Link>
            <button
              onClick={() => history.push("/dashboard")}
              className="app__nav-btn"
            >
              Dashboard
            </button>

            <button onClick={() => logout()} className="app__nav-btn">
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => history.push("/login")}
              className="app__nav-btn"
            >
              Login
            </button>
            <button
              onClick={() => history.push("/signup")}
              className="app__nav-btn"
            >
              Register
            </button>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
