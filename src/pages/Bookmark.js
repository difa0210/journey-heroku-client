import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import Bookmarked from "../images/bookmarked.png";

export default function Bookmark() {
  const [getBookmarks, setGetBookmarks] = useState();
  const navigate = useNavigate();

  const bookmarks = async () => {
    try {
      setAuthToken(localStorage.getItem("token"));
      const response = await API.get("/bookmarks");
      setGetBookmarks(response.data.bookmarks);
      console.log(response.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bookmarks();
  }, []);

  const handleDelete = async (e, id) => {
    try {
      e.preventDefault();

      await API.delete(`/bookmark/${id}`);
      await bookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#ececec" }}>
      <div className="container row mx-auto mb-5 fw-bold">
        <p className="" style={{ fontSize: "2.5rem" }}>
          My Bookmark
        </p>
      </div>

      <div className="container row mx-auto" style={{ width: "77rem" }}>
        {getBookmarks &&
          getBookmarks.map((item, index) => (
            <div key={index} className="col-3 my-3 mx-start px-0">
              <Card
                style={{ width: "16.5rem", borderRadius: "0.5rem" }}
                className="shadow mx-auto px-0"
              >
                <Card.Img
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/detailjourney/${item.journeyId}`);
                  }}
                  variant="top"
                  src={`http://localhost:5000/uploads/${item.Journey.image}`}
                />
                <span
                  onClick={(e) => handleDelete(e, item.id)}
                  style={{
                    cursor: "pointer",
                    background: "white",
                    borderRadius: "0.1rem",
                    margin: "0.5rem",
                  }}
                  className="shadow position-absolute top-0 end-0 py-2 px-1"
                >
                  <img
                    style={{
                      height: "1.5rem",
                    }}
                    src={Bookmarked}
                  />
                </span>

                <Card.Body>
                  <Card.Title className="text-truncate">
                    {item.Journey.title}
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
                    dangerouslySetInnerHTML={{
                      __html: item.Journey.description,
                    }}
                  ></Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
