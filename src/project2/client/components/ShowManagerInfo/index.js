import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class ShowManagerInfo extends Component {
    componentDidMount() {
        const { index } = this.props.location.state;
        console.log("index in showinfo", index);
        this.props.getOneUser(index);
    }

    render() {
        console.log("showinfo", this.props.users);
        let managerInfo = "";
        if (this.props.users.user.manager === undefined) {
            managerInfo = "None";
        } else {
            managerInfo = this.props.users.user.manager.managerName;
        }
        let employeeList = [];
        if (this.props.users.user.employees === undefined) {
            employeeList = [];
        } else {
            employeeList = this.props.users.user.employees.map(item => {
                return item.employeeName;
            });
        }

        return (
            <div className="content">
                <img src={this.props.users.user.imageUrl} alt="avatar" />
                <ul>
                    <li>Name : {this.props.users.user.name}</li>
                    <li>Title : {this.props.users.user.title}</li>

                    <li>Sex : {this.props.users.user.sex}</li>
                    <li>Start Date : {this.props.users.user.startDate}</li>
                    <li>
                        Email :{" "}
                        <a href={"mailto:" + this.props.users.user.email}>
                            {this.props.users.user.email}
                        </a>{" "}
                    </li>
                    <li>
                        Sms :{" "}
                        <a
                            style={{
                                textDecoration: "none",
                                color: "black"
                            }}
                            href={"sms:" + this.props.users.user.sms}
                        >
                            {this.props.users.user.sms}
                        </a>
                    </li>
                    <li>
                        OfficePhone :{" "}
                        <a
                            style={{
                                textDecoration: "none",
                                color: "black"
                            }}
                            href={"tel:" + this.props.users.user.sms}
                        >
                            {this.props.users.user.officePhone}
                        </a>
                    </li>
                    <li>
                        Manager:
                        {managerInfo}
                    </li>
                    <li>Employees: {JSON.stringify(employeeList)}</li>
                </ul>
                <Button variant="contained" color="primary">
                    <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/"
                    >
                        Go Back
                    </Link>{" "}
                </Button>
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
)(ShowManagerInfo);
