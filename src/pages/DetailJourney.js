import { API } from "../config/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailJourney() {
  const { journeyId } = useParams();
  const [getJourney, setGetJourney] = useState([]);

  const journey = async () => {
    try {
      const response = await API.get(`/journey/${journeyId}`);
      setGetJourney(response.data.journey);
      console.log(response.data.journey);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    journey();
  }, []);

  return (
    <div className="container py-5" style={{ backgroundColor: "#ececec" }}>
      <div className="container d-flex mx-auto px-5 mb-2 fw-bold justify-content-between align-items-center">
        <p className="mb-0" style={{ fontSize: "2.5rem" }}>
          {getJourney.title}
        </p>
        <p className="mb-0 mx-4" style={{ fontSize: "1.5rem" }}>
          {getJourney.name}
        </p>
      </div>
      <div className="container row mx-auto px-5 mb-4">
        <p
          className="mb-0 p-0"
          style={{ color: "#3B97D3", fontSize: "1.2rem" }}
        >
          {new Date(getJourney.updatedAt).toDateString()}
        </p>
      </div>
      <div className="container">
        <div className="container row mx-auto mb-5 d-flex justify-content-center align-items-center">
          <img src={getJourney.image} />
        </div>
        <div
          className="mb-5 d-flex-row text-center"
          dangerouslySetInnerHTML={{ __html: getJourney.description }}
        ></div>
      </div>
    </div>
  );
}
