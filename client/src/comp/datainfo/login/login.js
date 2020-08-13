import React, { useState, useContext } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Buttons from "../buttons/buttons";
import usercontext from "../context/context";
import "./login.scss";
import Validation from "../validation/validation";

const Login = () => {
  const [seePassword, setSeePassword] = useState(true);
  const seePasswordtoggle = () => setSeePassword(!seePassword);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUserData } = useContext(usercontext);
  const history = useHistory();
  const [error, setError] = useState("");
  const reg = () => history.push("/register");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "https://localhost:4000/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/app");
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className="bklogin">
      <header>
        <div className="loginheader">
          <h4>Login here</h4>
          <Buttons clicked={reg} input="Register" />
        </div>
      </header>
      <div className="wrapperlogin">
        <div className="login">
          <form onSubmit={submit} className="loginform">
            <h6>login</h6>
            <input
              className="inputsg"
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <input
                className="password"
                type={seePassword ? "password" : "text"}
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiOutlineEye onClick={seePasswordtoggle} className="eye" />
            </div>
            {error && <Validation error={error} />}
            <div className="btnsignin">
              <button className="signinbutton">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
