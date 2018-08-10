import React, { Component } from "react";
import Modal from "react-modal";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: false, btnTitle: "", textInput: "" };
    }
    componentWillMount() {
        Modal.setAppElement("body");
    }

    modalOpen = () => {
        this.setState({ authenticated: true });
    };

    modalClose = e => {
        this.setState({ authenticated: false, textInput: "" });
    };

    handleInputChange = e => {
        this.setState({ textInput: e.target.value });
    };

    saveChange = e => {
        this.setState({ btnTitle: this.state.textInput });
        console.log(this.state.btnTitle);
    };
    render() {
        return (
            <div>
                <h1>Using modal to modify button title.</h1>
                <button className="btn" onClick={this.modalOpen}>
                    {this.state.btnTitle}
                </button>
                <Modal
                    div
                    className="window"
                    isOpen={this.state.authenticated}
                    contentLable="Button Title Change"
                >
                    <h2>Modal Title</h2>
                    <form>
                        <input
                            style={{ width: 400, height: 75 }}
                            type="text"
                            value={this.state.textInput}
                            onChange={this.handleInputChange}
                        />
                    </form>
                    <button className="btn2" onClick={this.saveChange}>
                        Save Change
                    </button>
                    <button className="btn1" onClick={this.modalClose}>
                        Close
                    </button>
                </Modal>
            </div>
        );
    }
}

export default App;
