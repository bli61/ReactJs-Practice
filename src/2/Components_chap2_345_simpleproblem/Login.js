import React from "react";
import { Redirect, Link } from "react-router-dom";
import { loadState } from "./LocalStorage";

const Login = props => {
  console.log(props.authenticated);
  if (loadState()) {
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return (
      <div>
        <h2>Login Page</h2>
        <form>
          <label>
            UserName
            <input
              type="text"
              value={props.textUname}
              onChange={props.handleUnameChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={props.textPwd}
              onChange={props.handlePwdChange}
            />
          </label>
        </form>
        <Link to="/">
          {" "}
          <button onClick={props.handleLogin}>Login</button>{" "}
        </Link>
      </div>
    );
  }
};

export default Login;
