import React from "react";
import Cardss from "../card/card";

const Cardslist = ({ results }) => {
  return (
    <div className="style">
      <div
        className="row"
        style={{ justifyContent: "space-evenly", width: "100%", margin: "0" }}
      >
        {results.map((result) => (
          <Cardss
            key={result.id}
            id={result.id}
            title={result.original_title}
            backdrop_path={result.backdrop_path}
            img={result.poster_path}
            overview={result.overview}
            original_language={result.original_language}
            vote_average={result.vote_average}
            release_date={result.release_date}
            genre={result.genre_ids}
          />
        ))}
      </div>
    </div>
  );
};
export default Cardslist;
