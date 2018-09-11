import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as actions from "../../actions";
import Button from "@material-ui/core/Button";

class DetailUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            err: "",
            deleteFlag: false
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
            employees,
            err
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
            employees: [...employees],
            err: err
        });
    }

    render() {
        console.log("in delete", this.props.users);
        console.log("Detailuser:", this.state);
        let employeeList = this.state.employees.map(item => {
            return item.employeeName;
        });
        let regexp = /[\d-]*T/;
        return (
            <div>
                {this.state.err && <p>{this.state.err}</p>}
                <div className="content">
                    <img
                        style={{ width: 200, height: 200 }}
                        src={this.state.url}
                        alt="avatar"
                    />
                    <ul>
                        <li>Name : {this.state.name}</li>
                        <li>Title : {this.state.title}</li>

                        <li>Sex : {this.state.sex}</li>
                        <li>
                            Start Date : {this.state.startDate.match(regexp)}
                        </li>
                        <li>
                            Email :{" "}
                            <a href={"mailto:" + this.state.email}>
                                {this.state.email}
                            </a>{" "}
                        </li>
                        <li>
                            Sms :{" "}
                            <a
                                style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}
                                href={"sms:" + this.state.sms}
                            >
                                {this.state.sms}
                            </a>
                        </li>
                        <li>
                            OfficePhone :{" "}
                            <a
                                style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}
                                href={"tel:" + this.state.sms}
                            >
                                {this.state.officePhone}
                            </a>
                        </li>
                        <li>
                            Manager:
                            <Link
                                style={{ textDecoration: "none" }}
                                to={{
                                    pathname: "/manager",
                                    state: {
                                        index: this.state.manager.managerId
                                    }
                                }}
                            >
                                {this.state.manager.managerName}
                            </Link>
                        </li>
                        <li>Employees: {JSON.stringify(employeeList)}</li>
                    </ul>
                    <Button
                        variant="contained"
                        color="default"
                        aria-label="Edit"
                    >
                        <Link
                            style={{ textDecoration: "none" }}
                            to={{
                                pathname: "/edit",
                                state: {
                                    url: this.state.url,
                                    name: this.state.name,
                                    sex: this.state.sex,
                                    title: this.state.title,
                                    employees: this.state.employees,
                                    manager: this.state.manager,
                                    startDate: this.state.startDate,
                                    officePhone: this.state.officePhone,
                                    sms: this.state.sms,
                                    email: this.state.email,
                                    index: this.state.index
                                }
                            }}
                        >
                            edit
                        </Link>
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        aria-label="Delete"
                        onClick={() => {
                            this.props.deleteUser(this.state.index);
                            if (this.props) {
                                this.setState({ deleteFlag: true });
                            }
                        }}
                    >
                        Delete
                    </Button>
                    <Button variant="contained" color="primary">
                        <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to="/"
                        >
                            Go Back
                        </Link>{" "}
                    </Button>
                    {this.state.deleteFlag && (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: "/detail" }
                            }}
                        />
                    )}
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
)(DetailUser);
