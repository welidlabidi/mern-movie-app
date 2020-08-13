import React from "react";
import { useHistory } from "react-router-dom";
import Buttons from "../buttons/buttons";
import "./landingpage.scss";

const Landingpage = () => {
  const history = useHistory();

  const reg = () => history.push("/register");
  const log = () => history.push("/login");

  return (
    <section className="bklandingpage">
      <div className="landingpageheader">
        <h1 className="title">Quarantine Movies</h1>
        <div className="landingpagebutton">
          <Buttons clicked={log} input="login" />
          <Buttons clicked={reg} input="Register" />
        </div>
      </div>
      <div className="wrapperlandingpage">
        <section className="backgroundtext">
          <div>
            <article className="textabout">
              <h3 className="warningtext">WARNING!!</h3>
              <p>
                {" "}
                Welcome at Quarantine Movies !!
                <br />
                Notice this is not a real movie site. You can only watch
                overviews and trailers.
                <br />
                This is just a Web Developer project. If you still want to
                continue, go to Register or Login. Thank you and enjoy.
              </p>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Landingpage;
