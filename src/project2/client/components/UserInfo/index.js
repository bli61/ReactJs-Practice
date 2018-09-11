import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { TableRow } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import * as actions from "../../actions";

const CustomTableCell = withStyles(theme => ({
    body: {
        fontSize: 12
    }
}))(TableCell);

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { manager: {} };
    }

    static defaultProps = {
        employees: [],
        manager: { managerId: "", managerName: "" }
    };

    render() {
        // managerName = {
        //     ...this.props.users.users.filter(
        //         user => user._id === this.props.manager
        //     )[0]
        // };

        return (
            <TableRow>
                <CustomTableCell>
                    <img
                        style={{ width: 25, height: 25 }}
                        src={this.props.url}
                        alt="avatar"
                    />
                </CustomTableCell>
                <CustomTableCell>{this.props.name}</CustomTableCell>
                <CustomTableCell>{this.props.title}</CustomTableCell>
                <CustomTableCell>{this.props.employees.length}</CustomTableCell>
                <CustomTableCell>
                    <Link
                        style={{ textDecoration: "none" }}
                        to={{
                            pathname: "/manager",
                            state: {
                                index: this.props.manager.managerId
                            }
                        }}
                    >
                        {this.props.manager.managerName}
                    </Link>
                </CustomTableCell>

                <CustomTableCell>
                    <Button
                        variant="contained"
                        color="default"
                        aria-label="Edit"
                    >
                        <Link
                            style={{ textDecoration: "none" }}
                            to={{
                                pathname: "/detail",
                                state: {
                                    url: this.props.url,
                                    name: this.props.name,
                                    sex: this.props.sex,
                                    title: this.props.title,
                                    employees: this.props.employees,
                                    manager: this.props.manager,
                                    startDate: this.props.startDate,
                                    officePhone: this.props.officePhone,
                                    sms: this.props.sms,
                                    email: this.props.email,
                                    index: this.props.id,
                                    err: this.props.err
                                }
                            }}
                        >
                            Detail
                        </Link>
                    </Button>
                </CustomTableCell>
            </TableRow>
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
)(UserInfo);
