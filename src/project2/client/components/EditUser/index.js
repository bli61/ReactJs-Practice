import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import validation from "../../helperfunction/Validation";
import * as actions from "../../actions";
import Button from "@material-ui/core/Button";
import axios from "axios";

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank: 0,
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
            manager: "",
            employees: [],
            authenticated: false
        };
    }

    componentDidMount() {
        const {
            rank,
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
            rank: rank,
            index: index,
            url: url,
            name: name,
            title: title,
            sex: sex,
            startDate: startDate,
            eamil: email,
            sms: sms,
            officePhone: officePhone,
            manager: manager,
            employees: [...employees]
        });
    }

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
                        rank: this.state.rank,
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
                        rank: "",
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
                        manager: "",
                        employees: [],
                        authenticated: true
                    });
                });
        } else {
            let pendingUser = {
                rank: this.state.rank,
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
                rank: "",
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
                manager: "",
                employees: [],
                authenticated: true
            });
        }
    };

    render() {
        console.log(this.props.users.user);
        const { user } = this.props.users;
        console.log(user);
        // const isDisabled = validation(
        //     this.state.fn,
        //     this.state.ln,
        //     this.state.sex,
        //     this.state.age,
        //     this.state.pwd,
        //     this.state.rpt
        // );
        return (
            <div className="content">
                {this.state.authenticated === true && (
                    <Redirect
                        to={{ pathname: "/", state: { from: "/edit" } }}
                    />
                )}
                <h1>Edit User:</h1>
                <div className="spanL">
                    <div className="nameField">Avatar: </div>
                    <p>Prev</p>
                    <img
                        style={{ width: 100, height: 100 }}
                        src={this.state.url}
                        alt="Prev"
                    />
                    <p>New</p>
                    <img
                        style={{ width: 100, height: 100 }}
                        src={this.state.file}
                        alt="New"
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
                    <div className="nameField">Rank : </div>

                    <div className="inputField">
                        <input
                            type="text"
                            name="rank"
                            value={this.state.rank}
                            onChange={this.handleChange}
                            required={true}
                            placeholder="Rank"
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
        users: state.users
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser);
