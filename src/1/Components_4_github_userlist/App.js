import React, { Component } from "react";
import "./App.css";
import axios from "axios";

const List = props => {
    const imageStyle = { width: 50, height: 50 };
    return (
        <tr>
            <td>{props.id}</td>
            <td>
                <a onClick={props.showOneUser(props.url)}>{props.login}</a>
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

const PerPage = props => {
    return (
        <ul>
            <li>name :{props.name}</li>
            <li>location : {props.location}</li>
            <li>following: {props.following}</li>
            <li>followers: {props.followers}</li>
        </ul>
    );
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { allUser: [], user: {} };
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
    showOneUser = url => () => {
        axios
            .get(url)
            .then(res => this.setState({ user: res.data }))
            .catch(err => {
                console.log(err);
                alert(err);
            });
    };

    render() {
        return (
            <div>
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
                            {this.state.allUser.map((item, index) => {
                                return (
                                    <List
                                        key={item.id}
                                        {...item}
                                        showOneUser={this.showOneUser}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="divpart2">
                    <PerPage {...this.state.user} />
                </div>
            </div>
        );
    }
}

export default App;
