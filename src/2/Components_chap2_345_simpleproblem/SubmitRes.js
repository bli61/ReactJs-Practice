import React, { Component } from "react";

class SubmitRes extends Component {
  constructor(props) {
    super(props);
    this.stata = { answer: "" };
  }

  handleAnswer = e => {
    this.setState({ answer: e.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.answer}
          onChange={this.handleAnswer}
        />
      </div>
    );
  }
}

export default SubmitRes;
