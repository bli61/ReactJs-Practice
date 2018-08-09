import React, { Component } from "react";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { number: 0, timestarted: false };
    }

    addOne = () => {
        this.setState({ number: this.state.number + 1 });
    };

    startTime = () => {
        this.var = setInterval(this.addOne, 1000);
        this.setState({ timestarted: true });
    };
    stopTime = () => {
        clearInterval(this.var);
        this.setState({ timestarted: false });
    };
    resetTime = () => {
        this.setState({ number: 0 });
    };
    render() {
        return (
            <div>
                <div className="center">
                    <h1>{this.state.number}</h1>
                </div>
                <div className="App-footer">
                    <button
                        className="btn"
                        onClick={
                            this.state.timestarted
                                ? this.stopTime
                                : this.startTime
                        }
                    >
                        {this.state.timestarted ? "Stop" : "Start"}
                    </button>
                    <button className="btn" onClick={this.resetTime}>
                        Reset
                    </button>
                </div>
            </div>
        );
    }
}
export default App;
