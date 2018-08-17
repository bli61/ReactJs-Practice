import React, { Component } from "react";

let getPass = mydate => {
    let temp = "";
    temp =
        mydate.getFullYear().toString() +
        (mydate.getMonth() + 1 < 10
            ? "0" + (mydate.getMonth() + 1).toString()
            : (mydate.getMonth() + 1).toString()) +
        (mydate.getDate() < 10
            ? "0" + mydate.getDate().toString()
            : mydate.getDate().toString());
    return temp;
};

let today = new Date();
let tommorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
let yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const pwdList = [getPass(today), getPass(tommorrow), getPass(yesterday)];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: false, textUname: "", textPwd: "" };
    }

    handleUnameChange = e => {
        this.setState({ textUname: e.target.value });
        console.log(e.target.value);
    };

    handlePwdChange = e => {
        this.setState({ textPwd: e.target.value });
        console.log(e.target.value);
    };

    login = () => {
        if (
            this.state.textUname === "today" &&
            this.state.textPwd === pwdList[0]
        ) {
            this.setState({ authenticated: true });
        } else if (
            this.state.textUname === "tommorrow" &&
            this.state.textPwd === pwdList[1]
        ) {
            this.setState({ authenticated: true });
        } else if (
            this.state.textUname === "yesterday" &&
            this.state.textPwd === pwdList[2]
        ) {
            this.setState({ authenticated: true });
        } else {
            alert("Wrong Username or Password!");
        }
        console.log("The value in form are:", this.state);
    };

    logout = () => {
        this.setState({ authenticated: false });
    };

    render() {
        const { authenticated } = this.state;
        return (
            <div>
                <h1>{authenticated && "Welcome Back"}</h1>
                <h1>{!authenticated && "Please Login"}</h1>
                {!authenticated && (
                    <form>
                        <label>
                            UserName
                            <input
                                type="text"
                                value={this.state.textUname}
                                onChange={this.handleUnameChange}
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="text"
                                value={this.state.textPwd}
                                onChange={this.handlePwdChange}
                            />
                        </label>
                    </form>
                )}
                <button onClick={authenticated ? this.logout : this.login}>
                    {authenticated ? "logout" : "login"}
                </button>
            </div>
        );
    }
}

export default App;
