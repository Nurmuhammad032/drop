import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../../manageState/actionCreators/authActionCreators";

const NavDashboard = () => {
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
      expand="lg"
      variant="light"
      className="border-bottom py-3 shadow-sm"
    >
      <Navbar.Brand
        as={Link}
        to="/"
        style={{ marginLeft: "60px", marginRight: "auto" }}
      >
        My Dropbox
      </Navbar.Brand>
      <Nav style={{ marginRight: "60px" }}>
        {isLoggedIn ? (
          <>
            <Nav.Link
              as={Link}
              style={{ marginRight: "10px", marginLeft: "-10px" }}
              className="text-dark"
              to="/dashboard/profile"
            >
              You are welcome,
              <span style={{ fontStyle: "italic", marginLeft: "0.5rem" }}>
                {user.data.displayName}
              </span>
            </Nav.Link>
            <button
              className="app__dashboard-navLinks"
              onClick={() => history.push("/")}
            >
              Home
            </button>
            <button
              className="app__dashboard-navLinks"
              onClick={() => logout()}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Nav.Link active style={{ marginRight: "5px" }} size="sm">
              Loading...
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavDashboard;
