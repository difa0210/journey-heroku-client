import { useEffect, useState, useContext } from "react";
import { InputGroup, FormControl, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

export default function Home() {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  console.log(user);
  const [allJourney, setAllJourney] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const search = async (e, q, userId) => {
    e.preventDefault();
    try {
      const response = await API.get(`/journey-search?title=${q}`);
      setAllJourney(
        response.data.journeys.map((x) => ({
          ...x,
          isBookmark: x.Bookmark.find((x) => x.userId === userId)
            ? true
            : false,
        }))
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const journeys = async (userId) => {
    try {
      const response = await API.get("/journeys");
      setAllJourney(
        response.data.journeys.map((x) => ({
          ...x,
          isBookmark: x.Bookmark.find((x) => x.userId === userId)
            ? true
            : false,
        }))
      );

      console.log(response.data.journeys.map((x) => x.Bookmark));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      journeys(user.id);
    } else {
      journeys();
    }
  }, [user]);

  return (
    <div className="container py-5" style={{ backgroundColor: "#ececec" }}>
      <div className="container row mx-auto mb-5 fw-bold">
        <p className="" style={{ fontSize: "2.5rem" }}>
          Journey
        </p>
      </div>
      <div className="container row mx-auto" style={{ width: "68rem" }}>
        <form
          className="mb-5"
          onSubmit={(e) => search(e, searchQuery, user?.id)}
        >
          <InputGroup>
            <FormControl
              className="shadow"
              style={{ background: "white", borderWidth: 0 }}
              placeholder="Find Journey"
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              className="btn-blue shadow fw-bold"
              variant=""
              type="submit"
              id=""
              onClick={(e) => search(e, searchQuery, user?.id)}
            >
              Search
            </button>
          </InputGroup>
        </form>
      </div>
      <div className="container row mx-auto" style={{ width: "77rem" }}>
        {allJourney &&
          allJourney.map((item, index) => (
            <div className="col-3 my-3 mx-start" key={index}>
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
                  src={`http://localhost:5000/uploads/${item.image}`}
                />
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
