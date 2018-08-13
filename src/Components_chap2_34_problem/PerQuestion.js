import React, { Component } from "react";
import axios from "axios";

class PerQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = { question: {} };
    }

    componentDidMount() {
        axios
            .get(this.props.url)
            .then(res => {
                console.log(res);
                this.setState({ question: res.data.question });
            })
            .catch(err => {
                console.log(err);
                alert("Cannot connect to server!");
            });
    }
    render() {
        return (
            <div>
                <h2>{this.state.question.title}</h2>
                <p>{this.state.question.content}</p>
            </div>
        );
    }
}

export default PerQuestion;
