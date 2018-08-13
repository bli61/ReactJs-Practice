import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Rough from "./Rough";
import Detail from "./Detail";
import Sent from "./Sent";
import Drafts from "./Drafts";
import Trash from "./Trash";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inboxData: [],
            trashData: [],
            tempData: [],
            authenticated: 0
        };
    }

    componentDidMount = () => {
        axios
            .get("http://api.haochuan.io/emails")
            .then(res => {
                console.log(res);
                this.setState({ inboxData: res.data.emailData });
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    };

    handleInbox = () => {
        this.setState({ authenticated: 0 });
    };

    handleSent = () => {
        this.setState({ authenticated: 1 });
    };
    handleDrafts = () => {
        this.setState({ authenticated: 2 });
    };
    handleTrash = () => {
        this.setState({ authenticated: 3, tempData: [] });
    };

    handleDel = id => {
        this.setState({
            inboxData: [
                ...this.state.inboxData.slice(0, id),
                ...this.state.inboxData.slice(id + 1)
            ],
            trashData: [...this.state.trashData, this.state.inboxData[id]],
            tempData: []
        });
        console.log(this.state.trashData);
    };

    showOneEmailInbox = id => {
        let temp = {
            ...this.state.inboxData[id],
            index: id
        };
        this.setState({ tempData: temp });
        console.log(temp);
    };

    showOneEmailTrash = id => {
        let temp = {
            ...this.state.trashData[id],
            index: id
        };
        this.setState({ tempData: temp });
        console.log(temp);
    };

    render() {
        const { authenticated } = this.state;
        return (
            <div className="flex-container">
                <div
                    style={{
                        flexGrow: "1",
                        backgroundColor: "black",
                        color: "white"
                    }}
                >
                    <div className="btnhead">
                        <p>Compose</p>
                    </div>
                    <div className="btnLoc">
                        <p onClick={this.handleInbox}>
                            Inbox{" "}
                            <span style={{ float: "right" }}>
                                {this.state.inboxData.length}
                            </span>{" "}
                        </p>
                        <p onClick={this.handleSent}>Sent</p>
                        <p onClick={this.handleDrafts}>Drafts</p>
                        <p onClick={this.handleTrash}>
                            Trash{" "}
                            <span style={{ float: "right" }}>
                                {this.state.trashData.length}
                            </span>
                        </p>
                    </div>
                </div>
                <div style={{ flexGrow: "3" }}>
                    {authenticated === 0 ? (
                        this.state.inboxData.length !== 0 ? (
                            this.state.inboxData.map((item, index) => (
                                <Rough
                                    showOneEmail={this.showOneEmailInbox}
                                    key={index}
                                    idx={index}
                                    {...item}
                                />
                            ))
                        ) : (
                            <p>Nothing in Inbox folder</p>
                        )
                    ) : authenticated === 1 ? (
                        <Sent />
                    ) : authenticated === 2 ? (
                        <Drafts />
                    ) : this.state.trashData.length !== 0 ? (
                        this.state.trashData.map((item, index) => (
                            <Rough
                                showOneEmail={this.showOneEmailTrash}
                                key={index}
                                idx={index}
                                {...item}
                            />
                        ))
                    ) : (
                        <p>Nothing in Trash folder</p>
                    )}
                </div>
                <div style={{ flexGrow: "6" }}>
                    {authenticated === 0 && this.state.tempData.length !== 0 ? (
                        <Detail
                            {...this.state.tempData}
                            handleDel={this.handleDel}
                        />
                    ) : authenticated === 3 ? (
                        <Trash {...this.state.tempData} />
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
