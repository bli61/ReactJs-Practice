import React, { Component } from "react";
import Redirect from "react-router-dom/Redirect";
import Link from "react-router-dom/Link";
import validation from "../../helperfunction/Validation";

class CreateNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fn: "",
            ln: "",
            sex: "",
            age: "",
            pwd: "",
            rpt: ""
        };
    }

    handleChange = e => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value });
        console.log(this.state);
    };

    render() {
        const isDisabled = validation(
            this.state.fn,
            this.state.ln,
            this.state.sex,
            this.state.age,
            this.state.pwd,
            this.state.rpt
        );

        return (
            <div>
                <h1>Create New User:</h1>
                First Name:{" "}
                <input
                    type="text"
                    name="fn"
                    value={this.state.fn}
                    onChange={this.handleChange}
                    placeholder="First Name"
                />
                <br />
                Last Name:{" "}
                <input
                    type="text"
                    name="ln"
                    value={this.state.ln}
                    onChange={this.handleChange}
                    placeholder="Last Name"
                />
                <br />
                Sex :{" "}
                <input
                    type="text"
                    name="sex"
                    value={this.state.sex}
                    onChange={this.handleChange}
                    placeholder="Sex"
                />
                <br />
                Age :{" "}
                <input
                    type="text"
                    name="age"
                    value={this.state.age}
                    onChange={this.handleChange}
                    placeholder="Age"
                />
                <br />
                Password:{" "}
                <input
                    type="text"
                    name="pwd"
                    value={this.state.pwd}
                    onChange={this.handleChange}
                    placeholder="Password"
                />
                <br />
                Repeat:{" "}
                <input
                    type="text"
                    name="rpt"
                    value={this.state.rpt}
                    onChange={this.handleChange}
                    placeholder="Repeat Password"
                />
                <br />
                <button disabled={isDisabled}>Confirm</button>
                <button>
                    {" "}
                    <Link to="/">Cancel</Link>{" "}
                </button>
            </div>
        );
    }
}

export default CreateNew;
