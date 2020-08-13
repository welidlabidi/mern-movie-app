import React from "react";
import Carousel from "react-bootstrap/Carousel";

const MainImage = ({ topImage }) => {
  return (
    <div>
      <Carousel>
        {topImage.map((topImage) => (
          <Carousel.Item key={topImage.id}>
            <img
              className="d-block w-100"
              src={"https://image.tmdb.org/t/p/w1280/" + topImage.backdrop_path}
              alt=""
            />
            <Carousel.Caption>
              <h3>{topImage.original_title}</h3>
              <p>{topImage.overview.substring(0, 100)}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MainImage;
