import React, { Component } from "react";
import "./App.css";

const Button = props => {
    return (
        <span className="btn">
            <span className="btnInfo">{props.name}</span>
            <span className="btndel" onClick={() => props.delBtn(props.id)}>
                x
            </span>
        </span>
    );
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { textInput: "", data: [] };
    }

    handleInputChange = e => {
        this.setState({ textInput: e.target.value });
    };

    // handleSubmit = () => {
    //     this.setState({
    //         data: [...this.state.data, this.state.textInput],
    //         textInput: ""
    //     });
    //     console.log(this.state.data);
    // };

    onKeyDown = e => {
        if (e.keyCode === 13) {
            this.setState({
                data: [...this.state.data, this.state.textInput],
                textInput: ""
            });
            console.log(this.state.data);
        }
    };

    handleDel = id => {
        this.setState({
            data: [
                ...this.state.data.slice(0, id),
                ...this.state.data.slice(id + 1)
            ]
        });
    };

    render() {
        return (
            <div>
                {this.state.data.map((item, index) => (
                    <Button
                        key={index}
                        delBtn={this.handleDel}
                        name={item}
                        id={index}
                    />
                ))}
                <input
                    type="text"
                    placeholder="Add a tag"
                    value={this.state.textInput}
                    onChange={this.handleInputChange}
                    onKeyDown={this.onKeyDown}
                />
                <hr />
            </div>
        );
    }
}

export default App;
