import React from "react";

import Card from "react-bootstrap/Card";
const Actors = (props) => {
  return (
    <div>
      <Card className="cardactors">
        <Card.Img
          variant="top"
          src={`http://image.tmdb.org/t/p/w185/` + props.img}
          alt="no image found"
        />
        <p className="name">{props.name}</p>
        <p className="character">
          <i>{props.character}</i>
        </p>
      </Card>
    </div>
  );
};

export default Actors;
