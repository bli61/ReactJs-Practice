import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import * as actions from "../../actions";
import Button from "@material-ui/core/Button";
import Dropdown from "../DropDown";
import axios from "axios";

class CreateNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            tempFile: null,
            imageUrl: "",
            name: "",
            sex: "",
            title: "",
            manager: {},
            startDate: "",
            officePhone: "",
            sms: "",
            email: "",
            index: "",
            authenticated: false
        };
    }

    handleChange = e => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value });
        console.log(this.state);
    };
    handleClick = obj => {
        this.setState({ manager: { ...obj } });
        console.log("cn in click", obj);
    };
    handleChangeFile = e => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
            tempFile: e.target.files[0]
        });
    };
    handleSubmit = e => {
        const data = new FormData();
        data.append("file", this.state.tempFile);
        data.append("upload_preset", "mfq7uscb");
        data.append("api_key", "461517781558162");

        axios
            .post(
                "https://api.cloudinary.com/v1_1/ksssint/image/upload",
                data,
                { headers: { "X-Requested-With": "XMLHttpRequest" } }
            )
            .then(res => {
                this.setState({ imageUrl: res.data.secure_url });
                let pendingUser = {
                    imageUrl: this.state.imageUrl,
                    name: this.state.name,
                    sex: this.state.sex,
                    title: this.state.title,
                    manager: { ...this.state.manager },
                    officePhone: this.state.officePhone,
                    sms: this.state.sms,
                    email: this.state.email,
                    index: this.state.index
                };
                console.log("createUser before insert:", pendingUser);
                this.props.createNew(pendingUser);
                console.log("in create to find");
                this.setState({
                    file: null,
                    tempFile: null,
                    imageUrl: "",
                    name: "",
                    sex: "",
                    title: "",
                    manager: {},
                    officePhone: "",
                    sms: "",
                    email: "",
                    index: ""
                });
            });

        // window.location.reload();
    };

    render() {
        // const isDisabled = validation(
        //     this.state.fn,
        //     this.state.ln,
        //     this.state.sex,
        //     this.state.age,
        //     this.state.pwd,
        //     this.state.rpt
        // );

        // const { users } = this.props.users;
        // let filterUsers = [];
        // if (this.state.rank === 0) {
        //     filterUsers = [...users];
        // } else {
        //     filterUsers = [users.filter(user => user.rank > this.state.rank)];
        // }

        // console.log(filterUsers);
        console.log("in create", this.props.users);
        console.log("in create", this.state.authenticated);
        return (
            <div className="content">
                {this.props.users.message === "SUCCESS_ADD_EMPLOYEE" &&
                    this.setState({ authenticated: true })}
                {this.state.authenticated === true && (
                    <Redirect to={{ pathname: "/", state: { from: "/new" } }} />
                )}
                <h1 style={{ textAlign: "center" }}>Create New User:</h1>
                <div className="spanL">
                    <div className="nameField">Avatar: </div>
                    <img
                        style={{ width: 100, height: 100 }}
                        src={this.state.file}
                        alt="Avatar"
                    />
                    <div className="inputField">
                        <input
                            type="file"
                            name="file"
                            onChange={this.handleChangeFile}
                        />
                    </div>
                </div>
                <div className="spanL">
                    <div className="nameField"> Name: </div>
                    <div className="inputField">
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required={true}
                            placeholder="Name"
                        />
                    </div>
                </div>
                <div className="spanL">
                    <div className="nameField">Sex: </div>
                    <div className="inputField">
                        <input
                            type="text"
                            name="sex"
                            value={this.state.sex}
                            onChange={this.handleChange}
                            required={true}
                            placeholder="Sex"
                        />
                    </div>
                </div>
                <div className="spanL">
                    <div className="nameField">Title : </div>

                    <div className="inputField">
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            required={true}
                            placeholder="Title"
                        />
                    </div>
                </div>

                <div className="spanL">
                    <div className="nameField"> OfficePhone : </div>
                    <div className="inputField">
                        <input
                            type="text"
                            name="officePhone"
                            value={this.state.officePhone}
                            onChange={this.handleChange}
                            required={true}
                            placeholder="OfficePhone"
                        />
                    </div>
                </div>
                <div className="spanL">
                    <div className="nameField">Sms: </div>
                    <div className="inputField">
                        <input
                            type="text"
                            name="sms"
                            value={this.state.sms}
                            onChange={this.handleChange}
                            required={true}
                            placeholder="Sms"
                        />
                    </div>
                </div>

                <div className="spanL">
                    <div className="nameField">Email: </div>
                    <div className="inputField">
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required={true}
                            placeholder="Email"
                        />
                    </div>
                </div>
                <div className="spanL">
                    <div className="nameField">Manager: </div>

                    <Dropdown
                        handleClick={this.handleClick}
                        users={this.props.users.users}
                    />
                </div>

                <div className="btn">
                    <Button
                        style={{ padding: 20 }}
                        variant="extendedFab"
                        color="secondary"
                        onClick={this.handleSubmit}
                    >
                        Confirm
                    </Button>
                    <Button
                        style={{ padding: 20 }}
                        variant="extendedFab"
                        color="secondary"
                    >
                        <Link style={{ textDecoration: "none" }} to="/">
                            Cancel
                        </Link>{" "}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserList: () => {
            dispatch(actions.getUserList());
        },
        createNew: user => {
            dispatch(actions.createNew(user));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNew);
