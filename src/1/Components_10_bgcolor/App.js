import React, { Component } from "react";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { Rvalue: 50, Gvalue: 50, Bvalue: 50, Avalue: 0.5 };
    }

    // red change
    handleRvalue = e => {
        this.setState({ Rvalue: e.target.value });
        console.log(this.state.Rvalue);
    };
    // green change
    handleGvalue = e => {
        this.setState({ Gvalue: e.target.value });
        console.log(this.state.Gvalue);
    };
    // blue change
    handleBvalue = e => {
        this.setState({ Bvalue: e.target.value });
        console.log(this.state.Bvalue);
    };
    //alpha change
    handleAvalue = e => {
        this.setState({ Avalue: e.target.value });
        console.log(this.state.Avalue);
    };

    render() {
        return (
            <div
                className="container"
                style={{
                    backgroundColor: `rgba(${this.state.Rvalue}, ${
                        this.state.Gvalue
                    }, ${this.state.Bvalue}, ${this.state.Avalue})`
                }}
            >
                <br />
                <div
                    className="outer"
                    style={{
                        backgroundColor: `rgba(${this.state.Rvalue}, ${
                            this.state.Gvalue
                        }, ${this.state.Bvalue}, ${this.state.Avalue})`
                    }}
                >
                    <div className="inner">
                        <div
                            className="screen"
                            style={{
                                backgroundColor: `rgba(${this.state.Rvalue}, ${
                                    this.state.Gvalue
                                }, ${this.state.Bvalue}, ${this.state.Avalue})`
                            }}
                        />
                        <div className="slider">
                            <p className="special">
                                rgba(
                                {this.state.Rvalue},{this.state.Gvalue},
                                {this.state.Bvalue},{this.state.Avalue} )
                            </p>
                            <input
                                type="range"
                                defaultValue={this.state.Rvalue}
                                onChange={this.handleRvalue}
                                step={1}
                                min={0}
                                max={255}
                            />
                            <p>red: {this.state.Rvalue}</p>

                            <input
                                type="range"
                                defaultValue={this.state.Gvalue}
                                onChange={this.handleGvalue}
                                step={1}
                                min={0}
                                max={255}
                            />
                            <p>green: {this.state.Gvalue}</p>

                            <input
                                type="range"
                                defaultValue={this.state.Bvalue}
                                onChange={this.handleBvalue}
                                step={1}
                                min={0}
                                max={255}
                            />
                            <p>blue: {this.state.Bvalue}</p>

                            <input
                                type="range"
                                defaultValue={this.state.Avalue}
                                onChange={this.handleAvalue}
                                step={0.01}
                                min={0.0}
                                max={1.0}
                            />
                            <p>alpha: {this.state.Avalue}</p>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default App;
