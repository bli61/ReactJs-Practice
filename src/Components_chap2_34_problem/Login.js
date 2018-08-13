import React from "react";
import { Redirect } from "react-router-dom";

const Login = props => {
    if (props.authenticated) {
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
                            type="text"
                            value={props.textPwd}
                            onChange={props.handlePwdChange}
                        />
                    </label>
                </form>
                <button onClick={props.handleLogin}>Login</button>
            </div>
        );
    }
};

export default Login;
