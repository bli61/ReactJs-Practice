import React, { Component } from "react";
import UserInfo from "../UserInfo";
import { connect } from "react-redux";
import * as actions from "../../actions";
import * as sortF from "../../helperfunction/Sort";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const CustomTableCell = withStyles(theme => ({
    head: {
        fontSize: "110%",
        backgroundColor: "grey",
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

let sortedUsers = [];
class ShowAllInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: 0,
            colName: "",
            orderUser: []
        };
    }

    sortFn = () => {
        if (this.state.flag === 0 && !this.state.colName) {
            this.setState({ colName: "FirstName", flag: 1 });
        } else if (this.state.flag === 1) {
            this.setState({ colName: "FirstName", flag: 2 });
        } else {
            this.setState({ colName: "FirstName", flag: 1 });
        }
    };

    sortLn = () => {
        if (this.state.flag === 0 && !this.state.colName) {
            this.setState({ colName: "LastName", flag: 1 });
        } else if (this.state.flag === 1) {
            this.setState({ colName: "LastName", flag: 2 });
        } else {
            this.setState({ colName: "LastName", flag: 1 });
        }
    };

    sortSex = () => {
        if (this.state.flag === 0 && !this.state.colName) {
            this.setState({ colName: "Sex", flag: 1 });
        } else if (this.state.flag === 1) {
            this.setState({ colName: "Sex", flag: 2 });
        } else {
            this.setState({ colName: "Sex", flag: 1 });
        }
    };

    sortAge = () => {
        if (this.state.flag === 0 && !this.state.colName) {
            this.setState({ colName: "Age", flag: 1 });
        } else if (this.state.flag === 1) {
            this.setState({ colName: "Age", flag: 2 });
        } else {
            this.setState({ colName: "Age", flag: 1 });
        }
    };

    render() {
        const { flag } = this.state;

        console.log(this.state);
        if (flag === 0) {
            sortedUsers = [...this.props.users];
        } else if (flag === 1) {
            let ascSort = [...this.props.users];
            sortF.sortFuncAsc(ascSort, this.state.colName);
            sortedUsers = [...ascSort];
        } else {
            let desSort = [...this.props.users];
            sortF.sortFuncDes(desSort, this.state.colName);
            sortedUsers = [...desSort];
        }
        return (
            <Table style={{ marginTop: 10, marginBottom: 10 }}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>Edit</CustomTableCell>
                        <CustomTableCell>Delete</CustomTableCell>
                        <CustomTableCell onClick={this.sortFn}>
                            First Name
                        </CustomTableCell>
                        <CustomTableCell onClick={this.sortLn}>
                            Last Name
                        </CustomTableCell>
                        <CustomTableCell onClick={this.sortSex}>
                            Sex
                        </CustomTableCell>
                        <CustomTableCell onClick={this.sortAge}>
                            Age
                        </CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedUsers.map(user => (
                        <UserInfo
                            id={user._id}
                            del={this.props.deleteUser}
                            getOne={this.props.getOneUser}
                            updateOne={this.props.updateUser}
                            key={user._id}
                            FirstName={user.FirstName}
                            LastName={user.LastName}
                            Sex={user.Sex}
                            Age={user.Age}
                        />
                    ))}
                </TableBody>
            </Table>
        );
    }
}

// const mapStateToProps = state => {
//     console.log(state);
//     return {
//         users: state.users
//     };
// };

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
    null,
    mapDispatchToProps
)(ShowAllInfo);
