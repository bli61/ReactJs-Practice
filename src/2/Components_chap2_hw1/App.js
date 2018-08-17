import React, { Component } from "react";
import {
    BrowserRouter,
    Route,
    Link,
    Switch,
    withRouter
} from "react-router-dom";
import "./App.css";
import axios from "axios";
import PerPage from "./PerPage";

const Home = () => (
    <div>
        <h1>This is HomePage</h1>
    </div>
);

const Users = props => {
    return (
        <div className="divpart1">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>username</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {props.allUser.map((item, index) => {
                        return <List key={item.id} {...item} />;
                    })}
                </tbody>
            </table>
        </div>
    );
};

const List = props => {
    const imageStyle = { width: 50, height: 50 };
    return (
        <tr>
            <td>{props.id}</td>

            <td>
                <Link to={`/users/${props.login}`}>{props.login}</Link>
            </td>
            <td>
                <img
                    style={imageStyle}
                    src={props.avatar_url}
                    alt={props.avatar_url}
                />
            </td>
        </tr>
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
        this.state = { allUser: [] };
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
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route
                            exact={true}
                            path="/users"
                            render={() => (
                                <Users allUser={this.state.allUser} />
                            )}
                        />
                        <Route
                            path="/users/:login"
                            render={props => (
                                <div>
                                    <PerPage
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
