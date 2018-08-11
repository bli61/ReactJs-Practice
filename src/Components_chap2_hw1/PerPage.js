import React, { Component } from "react";
import axios from "axios";

const Detail = props => {
    return (
        <div>
            <h1>Detail</h1>
            <ul>
                <li>name :{props.name}</li>
                <li>location : {props.location}</li>
                <li>following: {props.following}</li>
                <li>followers: {props.followers}</li>
            </ul>
        </div>
    );
};

class PerPage extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }
    componentDidMount() {
        axios
            .get(this.props.url)
            .then(res => {
                console.log(res);
                this.setState({ user: res.data });
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    render() {
        return <Detail {...this.state.user} />;
    }
}

export default PerPage;
