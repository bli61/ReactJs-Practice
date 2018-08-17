import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import Problems from "./Problems";
import PerQuestion from "./PerQuestion";
import { loadState, saveState, removeState } from "./LocalStorage";

import "./App.css";

const Home = props => {
  if (!loadState()) {
    return <Redirect to={{ pathname: "/login" }} />;
  }
  return (
    <div>
      <h1>This is HomePage</h1>
      <nav>
        <ul>
          <li>
            <Link to="/problems">Problems</Link>
          </li>
        </ul>
      </nav>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
};

const Button = props => {
  return (
    <button
      onClick={() => {
        props.history.push("/problems");
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
      textUname: "",
      textPwd: "",
      title: [],
      authenticated: false
    };
  }

  componentDidMount() {
    axios
      .get("http://api.haochuan.io/oj/problems")
      .then(res => {
        console.log(res);
        this.setState({ title: res.data.questions });
      })
      .catch(err => {
        console.log(err);
        alert("Cannot reach server");
      });
    loadState();
  }

  handleUnameChange = e => {
    this.setState({ textUname: e.target.value });
    console.log(this.state.textUname);
  };

  handlePwdChange = e => {
    this.setState({ textPwd: e.target.value });
    console.log(this.state.textPwd);
  };

  handleLogin = () => {
    axios
      .post("http://api.haochuan.io/login", {
        username: this.state.textUname,
        password: this.state.textPwd
      })
      .then(res => {
        console.log(res);
        if (
          res.data.username === this.state.textUname &&
          res.data.password === this.state.textPwd
        ) {
          this.setState({
            textUname: "",
            textPwd: ""
          });
          saveState(!this.state.authenticated);
        } else if (res.username === "today") {
          alert("Wrong password!");
        } else {
          alert("Username and Password are not matched!");
        }
      })
      .catch(err => {
        console.log("err");
      });

    console.log(this.state.title);
  };
  handleLogout = () => {
    this.setState({ authenticated: false });
    removeState();
  };

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => (
                <Home
                  logout={this.handleLogout}
                  authenticated={authenticated}
                />
              )}
            />
            <Route
              path="/login"
              render={() => (
                <Login
                  textUname={this.state.textUname}
                  handleUnameChange={this.handleUnameChange}
                  textPwd={this.state.textPwd}
                  handlePwdChange={this.handlePwdChange}
                  authenticated={authenticated}
                  handleLogin={this.handleLogin}
                />
              )}
            />
            <Route
              exact={true}
              path="/problems"
              render={() => (
                <div className="flex-container">
                  <div style={{ flexGrow: "2" }}>
                    {this.state.title.map((item, index) => (
                      <Problems
                        id={item.id}
                        eachTitle={item.title}
                        authenticated={authenticated}
                        key={index}
                      />
                    ))}
                  </div>
                  <div style={{ flexGrow: "7" }}>
                    <Link to="/">Home</Link>
                  </div>
                </div>
              )}
            />

            <Route
              path="/problems/:id"
              render={props => (
                <div>
                  <PerQuestion
                    url={
                      "http://api.haochuan.io/oj/problems/" +
                      props.match.params.id
                    }
                  />
                  <br />
                  <br />
                  <WithRouterButton />
                </div>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
