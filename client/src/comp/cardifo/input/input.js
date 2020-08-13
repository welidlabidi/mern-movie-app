import React from "react";

const Input = (props) => {
  return (
    <form>
      <input
        onChange={props.handle}
        type="text"
        name="movie"
        placeholder="Search for a Movie..."
      />
      <button className="search" type="submit" onClick={props.search}>
        Search
      </button>
    </form>
  );
};

export default Input;
