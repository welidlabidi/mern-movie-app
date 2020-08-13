import React, { useState, useContext, useEffect } from "react";
import MainImage from "../mainimage/mainimage";
import axios from "axios";
import Input from "../input/input";
import Cardslist from "../cardslist/cardslist";
import Buttons from "../../datainfo/buttons/buttons";
import usercontext from "../../datainfo/context/context";
import "./app.scss";
import { useHistory } from "react-router-dom";

const App = () => {
  const apiKey = "fac34116c639f3e75cd5205251be421c";
  const api = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&genre_id=28`;
  const latestMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
  const [topImage, setTopImage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [btn, setBtn] = useState("Load More...");
  const [backbtn, setBackBtn] = useState("Back");
  const [lm, setLm] = useState("Latest Movies");
  const [movies, setMovies] = useState({
    query: "",
    result: [],
  });
  const { setUserData } = useContext(usercontext);
  const history = useHistory();
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  useEffect(() => {
    axios(latestMovies).then(({ data }) => {
      let result = data.results;
      setTopImage(data.results.slice(0, 5));

      setMovies((prevState) => {
        return { ...prevState, result: result };
      });
    });
  }, [latestMovies]);

  const handle = (e) => {
    let s = e.target.value;
    setMovies((prevState) => {
      return { ...prevState, query: s };
    });
  };

  const search = (e) => {
    axios(api + `&query=` + movies.query).then(({ data }) => {
      let result = data.results;
      setMovies((prevState) => {
        return { ...prevState, result: result };
      });
    });
    e.preventDefault();
    setLm();
    setBtn();
    setBackBtn();
  };

  useEffect(() => {
    const newPage = latestMovies;
    fetchNewPage(newPage);
  }, [latestMovies]);

  const fetchNewPage = (path) => {
    axios(path).then(({ data }) => {
      let result = data.results;
      setMovies((prevState) => {
        return { ...prevState, result: result };
      });
      setCurrentPage(data.page);
    });
  };

  const load = () => {
    const newPage = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage +
      1}`;
    fetchNewPage(newPage);
  };
  const back = () => {
    const newPage = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage -
      1}`;
    fetchNewPage(newPage);
  };
  return (
    <div className="bkapp">
      <header>
        <div className="islogdheader">
          <h5>Welcome</h5>
          <Buttons input="Logout" clicked={logout} />
        </div>
      </header>
      <div className="top" style={{ width: "100%" }}>
        <MainImage key={topImage.id} topImage={topImage} />
      </div>

      <div className="header">
        <div
          className="row"
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            margin: "0",
          }}
        >
          <h1>Quarantine Movies</h1>
          <Input handle={handle} search={search} />
        </div>
      </div>

      <div className="">
        <div className="latestM">
          <p className="latest">{lm}</p>
        </div>
        <div>
          <Cardslist
            key={movies.id}
            genre={movies.genre}
            results={movies.result}
          />
        </div>

        <div className="loadbutton">
          <div className="loadmoreback" onClick={back}>
            {backbtn}
          </div>
          <div className="loadmore" onClick={load}>
            {btn}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
