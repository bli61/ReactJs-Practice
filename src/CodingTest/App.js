import React, { Component } from "react";

const Filter = props => {
  if (Number(props.value)) {
    let len = props.value.length;
    if (props.value[len - 1] === "1") {
      return props.value + "st";
    } else if (props.value[len - 1] === "2") {
      return props.value + "nd";
    } else if (props.value[len - 1] === "3") {
      return props.value + "rd";
    } else {
      return props.value + "th";
    }
  } else {
    return props.value;
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleInput}
        />
        <p>
          <Filter value={this.state.input} />
        </p>
      </div>
    );
  }
}

export default App;
