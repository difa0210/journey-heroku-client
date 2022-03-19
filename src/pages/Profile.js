import { Card } from "react-bootstrap";
import { API, setAuthToken } from "../config/api";
import imageProfile from "../images/profile2.png";
import trash from "../images/trash.png";
import edit from "../images/edit.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

export default function Profile() {
  const [user] = useContext(UserContext);
  const navigate = useNavigate();
  const [getJourney, setGetJourney] = useState();

  const myJourney = async () => {
    try {
      setAuthToken(localStorage.getItem("token"));
      const response = await API.get("my-journeys");
      setGetJourney(response.data.data.allprofile);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    myJourney();
  }, []);

  const handleDelete = async (e, id) => {
    try {
      e.preventDefault();

      await API.delete(`/deletejourney/${id}`);
      await myJourney();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#ececec" }}>
      <div className="container d-flex mx-auto px-5 mb-2 fw-bold justify-content-between align-items-center">
        <p className="" style={{ fontSize: "2.5rem" }}>
          My Profile
        </p>

        <button
          className="shadow fw-bold btn-blue rounded"
          style={{ width: "8.5rem" }}
          variant=""
          type="submit"
          size="sm"
          onClick={() => {
            navigate(`/editprofile/${user.id}`);
          }}
        >
          Edit Profile
        </button>
      </div>

      <div className="">
        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center">
          <img
            style={{ width: "13rem" }}
            src={user && user.image}
            alt="profile"
          />
        </div>
        <div className="mx-auto mb-5 d-flex-row text-center fs-2">
          {user && user.name}
          <p className="mt-1" style={{ fontSize: "1.2rem" }}>
            {user && user.email}
          </p>
        </div>
      </div>
      <div className="container row mx-auto" style={{ width: "77rem" }}>
        {getJourney &&
          getJourney.map((item, index) => (
            <div key={index} className="col-3 my-3 mx-start">
              <Card
                style={{ width: "16.5rem", borderRadius: "0.5rem" }}
                className="shadow mx-auto"
              >
                <Card.Img
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/detailjourney/${item.id}`);
                  }}
                  variant="top"
                  src={item.image}
                />
                <span
                  onClick={(e) => handleDelete(e, item.id)}
                  style={{
                    cursor: "pointer",
                    background: "white",
                    borderRadius: "0.2rem",
                    margin: "0.5rem",
                  }}
                  className="fw-bold shadow-lg position-absolute top-55 end-0 px-2 py-1"
                >
                  <img src={trash} alt="" />
                </span>

                <span
                  onClick={() => navigate(`/editjourney/${item.id}`)}
                  style={{
                    cursor: "pointer",
                    background: "white",
                    borderRadius: "0.2rem",
                    margin: "0.5rem",
                  }}
                  className="fw-bold shadow-lg position-absolute top-55 end-0 px-2 py-1 me-5"
                >
                  <img
                    style={{
                      width: "1.2rem",
                    }}
                    src={edit}
                    alt=""
                  />
                </span>
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {item.title}
                  </Card.Title>
                  <p className="opacity-50" style={{ fontSize: "0.8rem" }}>
                    {new Date(item.updatedAt).toDateString()}
                  </p>
                  <Card.Text
                    className="text-truncate"
                    style={{
                      fontSize: "0.9rem",
                      minHeight: "2.5rem",
                      maxHeight: "2.5rem",
                    }}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
