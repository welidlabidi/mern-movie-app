import React, { useState, useContext } from "react";
import "./register.scss";
import { AiOutlineEye } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Buttons from "../buttons/buttons";
import usercontext from "../context/context";
import Validation from "../validation/validation";

const Register = () => {
  const [seePassword, setSeePassword] = useState(true);
  const seePasswordtoggle = () => setSeePassword(!seePassword);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordconfirm, setPasswordConfirm] = useState();
  const [displayName, setDisplayName] = useState();
  const { setUserData } = useContext(usercontext);
  const history = useHistory();
  const [error, setError] = useState("");

  const log = () => history.push("/login");

  const submit = async (e) => {
    try {
      e.preventDefault();
      const newUser = { email, password, passwordconfirm, displayName };
      await Axios.post("/users/register", newUser);

      const loginRes = await Axios.post("/users/login", {
        email,
        password,
      });
      console.log(loginRes);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/app");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="bkregister">
      <header>
        <div className="registerheader">
          <h4>Register here</h4>
          <Buttons clicked={log} input="Login" />
        </div>
      </header>
      <div className="wrapperregister">
        <div className="register">
          <form onSubmit={submit} className="registerform">
            <h6>Register</h6>
            <input
              className="inputsg"
              type="text"
              name="Fname"
              placeholder="Firstname"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              className="inputsg"
              type="text"
              name="lName"
              placeholder="Lastname"
            />
            <input
              className="inputsg"
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <p>*{error.email}</p>}
            <input
              className="inputsg"
              type={seePassword ? "password" : "text"}
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <p>*{error.password}</p>}
            <div className="div">
              <input
                className="confirmpassword"
                type={seePassword ? "password" : "text"}
                name="passwordconfirm"
                placeholder="Confirmpassword"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <AiOutlineEye onClick={seePasswordtoggle} className="eye" />
              {error && <Validation error={error} />}
            </div>
            <div className="btnsignup">
              <button className="signupbutton" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
