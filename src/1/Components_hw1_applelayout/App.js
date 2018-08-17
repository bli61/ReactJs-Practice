import React, { Component } from "react";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div>
                <div className="App-header">
                    <h1 className="center">header</h1>
                </div>
                <div className="flex-container">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>
                <div className="flex-container">
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                </div>
                <div className="flex-container">
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div>12</div>
                </div>
                <div className="App-footer">
                    <div className="footer-div">Ex1</div>
                    <div className="footer-div">Ex2</div>
                    <div className="footer-div">Ex3</div>
                    <div className="footer-div">Ex4</div>
                </div>
            </div>
        );
    }
}

export default App;
