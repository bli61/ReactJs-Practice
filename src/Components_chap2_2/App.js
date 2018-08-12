import React, { Component } from "react";
import {
    BrowserRouter,
    Route,
    Link,
    Switch,
    withRouter,
    Redirect
} from "react-router-dom";
import "./App.css";
import axios from "axios";
import PerPage from "./PerPage";
import Users from "./Users";
import Login from "./Login";

const getPass = mydate => {
    let temp = "";
    temp =
        mydate.getFullYear().toString() +
        (mydate.getMonth() + 1 < 10
            ? "0" + (mydate.getMonth() + 1).toString()
            : (mydate.getMonth() + 1).toString()) +
        (mydate.getDate() < 10
            ? "0" + mydate.getDate().toString()
            : mydate.getDate().toString());
    return temp;
};

let today = new Date();
let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
let yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const pwdList = [getPass(today), getPass(tomorrow), getPass(yesterday)];

const Home = props => {
    if (!props.authenticated) {
        return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
        <div>
            <h1>This is HomePage</h1>
            <button onClick={props.logout}>Logout</button>
        </div>
    );
};

const Button = props => {
    return (
        <button
            onClick={() => {
                props.history.push("/users");
            }}
        >
            Back
        </button>
    );
};

const WithRouterButton = withRouter(Button);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUser: [],
            authenticated: false,
            textUname: "",
            textPwd: ""
        };
    }

    componentDidMount() {
        axios
            .get("https://api.github.com/users?per_page=100")
            .then(res => {
                console.log(res);
                this.setState({ allUser: res.data });
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    handleUnameChange = e => {
        this.setState({ textUname: e.target.value });
        console.log(e.target.value);
    };

    handlePwdChange = e => {
        this.setState({ textPwd: e.target.value });
        console.log(e.target.value);
    };

    handleLogin = () => {
        this.setState({ authenticated: true });
    };

    login = () => {
        if (
            this.state.textUname === "today" &&
            this.state.textPwd === pwdList[0]
        ) {
            this.setState({ authenticated: true, textUname: "", textPwd: "" });
        } else if (
            this.state.textUname === "tomorrow" &&
            this.state.textPwd === pwdList[1]
        ) {
            this.setState({ authenticated: true, textUname: "", textPwd: "" });
        } else if (
            this.state.textUname === "yesterday" &&
            this.state.textPwd === pwdList[2]
        ) {
            this.setState({ authenticated: true, textUname: "", textPwd: "" });
        } else if (
            (this.state.textUname !== "yesterday" || "today" || "tomorrow") &&
            (this.state.textPwd === pwdList[0] || pwdList[1] || pwdList[2])
        ) {
            alert("Wrong Username!");
        } else if (
            (this.state.textUname === "yesterday" || "today" || "tomorrow") &&
            (this.state.textPwd !== pwdList[0] || pwdList[1] || pwdList[2])
        ) {
            alert("Wrong Password!");
        } else {
            alert("Username and Password not match!");
        }
        console.log("The value in form are:", this.state);
    };

    logout = () => {
        this.setState({ authenticated: false });
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route
                            exact={true}
                            path="/"
                            render={() => (
                                <Home
                                    logout={this.logout}
                                    authenticated={this.state.authenticated}
                                />
                            )}
                        />
                        <Route
                            path="/login"
                            render={() => (
                                <Login
                                    login={this.login}
                                    textUname={this.state.textUname}
                                    handleUnameChange={this.handleUnameChange}
                                    textPwd={this.state.textPwd}
                                    handlePwdChange={this.handlePwdChange}
                                    authenticated={this.state.authenticated}
                                    handleLogin={this.handleLogin}
                                />
                            )}
                        />

                        <Route
                            exact={true}
                            path="/users"
                            render={() => (
                                <Users
                                    allUser={this.state.allUser}
                                    authenticated={this.state.authenticated}
                                />
                            )}
                        />
                        <Route
                            path="/users/:login"
                            render={props => (
                                <div>
                                    <PerPage
                                        authenticated={this.state.authenticated}
                                        url={
                                            "https://api.github.com/users/" +
                                            props.match.params.login
                                        }
                                    />
                                    <WithRouterButton />
                                </div>
                            )}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
