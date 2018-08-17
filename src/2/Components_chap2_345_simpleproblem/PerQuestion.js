import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class PerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { question: {}, answer: "", flag: false };
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

  onKeyDown = e => {
    if (e.keyCode === 13) {
      axios
        .post(this.props.url + "/solution", {
          pass: this.state.answer
        })
        .then(res => {
          console.log(this.state.answer);
          console.log(res);
          if (String(res.data.pass) === this.state.answer) {
            this.setState({ answer: "" });
            alert("Goog Job!");
            this.setState({ flag: true });
          } else {
            alert("Wrong Answer! Try Again.");
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  handleAnswer = e => {
    this.setState({ answer: e.target.value });
  };

  render() {
    return (
      <div>
        <h2 className="center">{this.state.question.title}</h2>
        <p className="center">{this.state.question.content}</p>
        <hr />
        <p className="center">Type your answer here: (Enter key to submit)</p>
        <input
          className="inputbox"
          type="text"
          value={this.state.answer}
          onChange={this.handleAnswer}
          onKeyDown={this.onKeyDown}
          placeholder="true/false"
        />
        {this.state.flag && <Redirect to={{ pathname: "/problems" }} />}
      </div>
    );
  }
}

export default PerQuestion;
