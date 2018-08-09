import React, { Component } from "react";
import "./App.css";
import minus from "./minus.png";
import plus from "./plus.png";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { number: 1 };
    }
    addOne = () => {
        this.setState({ number: this.state.number + 1 });
    };
    minusOne = () => {
        this.setState({ number: this.state.number - 1 });
    };
    render() {
        return (
            <div>
                <div className="center">
                    <h1>{this.state.number}</h1>
                </div>
                <div className="App-footer">
                    <button className="btn" onClick={this.addOne}>
                        <img className="pic-left" src={plus} alt="plus" />
                    </button>
                    <button className="btn" onClick={this.minusOne}>
                        <img className="pic-right" src={minus} alt="minus" />
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
