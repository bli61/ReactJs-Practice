import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as actions from "../../actions";
import Button from "@material-ui/core/Button";
import axios from "axios";
import DropdownEdit from "../DropdownEdit";
class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: "",
            file: null,
            tempFile: null,
            url: "",
            name: "",
            title: "",
            sex: "",
            startDate: "",
            email: "",
            sms: "",
            officePhone: "",
            manager: {},
            employees: [],
            authenticated: false
        };
    }

    componentDidMount() {
        const {
            index,
            url,
            name,
            title,
            sex,
            startDate,
            email,
            sms,
            officePhone,
            manager,
            employees
        } = this.props.location.state;
        this.setState({
            index: index,
            url: url,
            name: name,
            title: title,
            sex: sex,
            startDate: startDate,
            email: email,
            sms: sms,
            officePhone: officePhone,
            manager: { ...manager },
            employees: [...employees]
        });
        console.log("in edit user componentdidmount", index);
        this.props.getValidUser(index);
    }

    handleClick = obj => {
        this.setState({ manager: { ...obj } });
        console.log("cn in click", obj);
    };

    handleChange = e => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value });
        console.log("EditUser:", this.state);
    };

    handleChangeFile = e => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
            tempFile: e.target.files[0]
        });
    };

    handleSubmit = e => {
        if (this.state.file !== null) {
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
                    console.log(res);
                    this.setState({ imageUrl: res.data.secure_url });
                    let pendingUser = {
                        imageUrl: this.state.imageUrl,
                        name: this.state.name,
                        sex: this.state.sex,
                        title: this.state.title,
                        startDate: this.state.startDate,
                        employees: this.state.employees,
                        manager: this.state.manager,
                        officePhone: this.state.officePhone,
                        sms: this.state.sms,
                        email: this.state.email,
                        index: this.state.index
                    };
                    const { index } = this.props.location.state;
                    this.props.updateUser(index, pendingUser);
                    this.setState({
                        index: "",
                        file: "",
                        url: "",
                        name: "",
                        title: "",
                        sex: "",
                        startDate: "",
                        email: "",
                        sms: "",
                        officePhone: "",
                        manager: {},
                        employees: [],
                        authenticated: true
                    });
                });
        } else {
            let pendingUser = {
                imageUrl: this.state.imageUrl,
                name: this.state.name,
                sex: this.state.sex,
                title: this.state.title,
                employees: this.state.employees,
                manager: this.state.manager,
                officePhone: this.state.officePhone,
                sms: this.state.sms,
                email: this.state.email,
                index: this.state.index
            };
            const { index } = this.props.location.state;
            this.props.updateUser(index, pendingUser);
            this.setState({
                index: "",
                file: "",
                url: "",
                name: "",
                title: "",
                sex: "",
                startDate: "",
                email: "",
                sms: "",
                officePhone: "",
                manager: {},
                employees: []
            });
        }
    };

    render() {
        console.log("in edit user, all valid", this.props.dropdownInfo);
        console.log("in edit user, all info:", this.props.users);
        return (
            <div className="content">
                {this.props.users.message === "SUCCESS_UPDATE" &&
                    this.setState({ authenticated: true })}
                {this.state.authenticated === true && (
                    <Redirect
                        to={{ pathname: "/", state: { from: "/edit" } }}
                    />
                )}
                <h1 style={{ textAlign: "center" }}>Edit User:</h1>
                <div className="spanL">
                    <p>
                        Prev:{" "}
                        <img
                            style={{ width: 100, height: 100 }}
                            src={this.state.url}
                            alt="Prev"
                        />{" "}
                    </p>

                    <p>
                        New:{" "}
                        <img
                            style={{ width: 100, height: 100 }}
                            src={this.state.file}
                            alt="New"
                        />
                    </p>
                    <div className="nameField">Avatar: </div>
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
                    <div className="nameField">Start Date: </div>
                    <div className="inputField">
                        <input
                            type="date"
                            name="startDate"
                            value={this.state.startDate}
                            onChange={this.handleChange}
                            required={true}
                        />
                    </div>
                </div>

                <div className="spanL">
                    <div className="nameField">New Manager: </div>

                    <DropdownEdit
                        handleClick={this.handleClick}
                        users={this.props.dropdownInfo.data}
                        manager={this.state.manager}
                        index={this.state.index}
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
    console.log(state);
    return {
        users: state.users,
        dropdownInfo: state.dropdown
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserList: () => {
            dispatch(actions.getUserList());
        },
        deleteUser: id => {
            dispatch(actions.deleteUser(id));
        },
        getOneUser: id => {
            dispatch(actions.getOneUserById(id));
        },
        updateUser: (id, newInfo) => {
            dispatch(actions.updateUser(id, newInfo));
        },
        getValidUser: id => {
            dispatch(actions.getDropDown(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser);
