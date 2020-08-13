import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Actors from "../actors/actors";
import Trailer from "../trailers/trailers";
import { MdLanguage } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

const Cardss = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [trailerKey, setTrailerKey] = useState([]);
  const [cast, setCast] = useState([]);
  const apiKey = "fac34116c639f3e75cd5205251be421c";
  const trailer = `https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=${apiKey}&append_to_respone=videos`;
  const credit = `https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=${apiKey}`;
  const Open = () => setShowPopup(true);
  const Close = () => setShowPopup(false);
  const [actors, setActor] = useState(false);

  const actorsToggle = () => setActor(!actors);

  useEffect(() => {
    axios(trailer).then(({ data }) => {
      setTrailerKey(data.results);
    });
  }, [trailer]);

  let trailerMovie = "";

  for (let i = 0; i < trailerKey.length; i++) {
    let name = trailerKey[i].name.toLowerCase().split(" ");
    for (let a = 0; a < name.length; a++) {
      if (name[a] === "official" && name[a] === "trailer") {
        trailerMovie = trailerKey[i].key;
        name = trailerKey[i].name;
      }
      if (name[a] === "trailer") {
        trailerMovie = trailerKey[i].key;
        name = trailerKey[i].name;
      }
    }
  }

  useEffect(() => {
    axios(credit).then(({ data }) => {
      const actors = data.cast.slice(0, 8);
      setCast(actors);
    });
  }, [credit]);

  return (
    <div>
      <Card className="movie" style={{ width: "14rem" }} onClick={Open}>
        <button className="buttoncard">
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w185/` + props.img}
            alt="no image found"
          />
        </button>
      </Card>
      <Modal show={showPopup} onHide={Close} centered size="lg">
        <div className="popup">
          <Modal.Header>
            <Modal.Title>
              <div className="titlemovie">{props.title}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <div className="discription">
                <div className="row">
                  <div className="modalimg">
                    <img
                      src={"https://image.tmdb.org/t/p/w185/" + props.img}
                      alt="ok"
                    />
                  </div>
                  <div className="text">
                    <div className="data">
                      <p className="p-app"> IMBd:{props.vote_average}</p>
                      <p className="p-app"> IMBd:{props.release_date}</p>
                      <p className="p-app">
                        <MdLanguage className="earth" />
                        {props.original_language}
                      </p>
                    </div>
                    <h5> {props.overview}</h5>
                  </div>
                </div>
              </div>
            </div>
            <Trailer trailer={trailerMovie} />
            <button onClick={actorsToggle}> show cast</button>
            {actors ? (
              <div className="actors">
                <div className="row" style={{ justifyContent: "space-evenly" }}>
                  {cast.map((cast) => (
                    <Actors
                      key={cast.id}
                      name={cast.name}
                      character={cast.character}
                      img={cast.profile_path}
                    />
                  ))}
                </div>
              </div>
            ) : (
              true
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={Close}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};
export default Cardss;
