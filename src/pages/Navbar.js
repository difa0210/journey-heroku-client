import { InputGroup, Dropdown, Image } from "react-bootstrap";
import imageLogo from "../images/logo-journey.png";
import imageLogo2 from "../images/Icon.png";
import icon1 from "../images/icon1.png";
import icon2 from "../images/icon2.png";
import icon3 from "../images/icon3.png";
import icon4 from "../images/icon4.png";
import profile from "../images/profile.png";
import { ModalContext } from "../context/ModalContext";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [, , toggle] = useContext(ModalContext);
  const [user, setUser] = useContext(UserContext);

  return (
    <div className="container p-0">
      {user ? (
        <>
          {/* <div className="container text-start  "> */}
          <div className="container row mx-auto px-2 shadow py-2 d-flex align-items-center">
            <div className="col">
              <Link to="/journey">
                <img src={imageLogo2} alt="logoJourney" />
              </Link>
            </div>
            <div className="col d-flex justify-content-end align-items-center">
              <InputGroup className="d-flex justify-content-end align-items-center">
                <Dropdown>
                  <Dropdown.Toggle>
                    <Image src={profile} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile" className="mb-3 fw-bold">
                      <Image src={icon3} className="mx-3" />
                      Profile
                    </Dropdown.Item>

                    <Dropdown.Item href="/newjourney" className="mb-3 fw-bold">
                      <Image src={icon2} className="mx-3" />
                      New Journey
                    </Dropdown.Item>

                    <Dropdown.Item
                      href="/bookmarks"
                      className="mb-3 px-4 fw-bold"
                    >
                      <Image src={icon1} className="mx-3" />
                      Bookmark
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item
                      href="/"
                      className="fw-bold"
                      onClick={() => {
                        localStorage.removeItem("token");
                        setUser(null);
                      }}
                    >
                      <Image src={icon4} className="mx-3" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </InputGroup>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="jumbotron p-5 text-start shadow"
            style={{ height: "29rem" }}
          >
            <div className="row mb-5">
              <div className="col">
                <Link to="/">
                  <img src={imageLogo} alt="logoJourney" />
                </Link>
              </div>
              <div className="col d-flex justify-content-end align-items-center">
                <button
                  className="shadow fw-bold mx-3 btn-white"
                  variant=""
                  type="submit"
                  size="sm"
                  onClick={() => toggle("Login")}
                >
                  Login
                </button>
                <button
                  className="shadow fw-bold btn-blue"
                  variant=""
                  type="submit"
                  size="sm"
                  onClick={() => toggle("Register")}
                >
                  Register
                </button>
              </div>
            </div>
            <p
              className="shadow-lg mb-0 fw-bold text-white"
              style={{ fontSize: "3.5rem" }}
            >
              The Journey
            </p>
            <p
              className="shadow-lg fw-bold text-white"
              style={{ fontSize: "3.5rem" }}
            >
              you ever dreamed of.
            </p>
            <p
              className="shadow-lg mb-0 text-white"
              style={{ fontSize: "1.5rem" }}
            >
              We made a tool so you can easily keep & share your travel
              memories.
            </p>
            <p
              className="shadow-lg neonText text-white"
              style={{ fontSize: "1.5rem" }}
            >
              But there is a lot more.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
