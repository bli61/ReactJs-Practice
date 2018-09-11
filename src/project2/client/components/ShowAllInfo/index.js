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
            per: 5,
            page: 1,
            totalPages: null,
            scrolling: false,
            index: 0,
            contacts: []
        };
    }

    componentWillMount() {
        this.loadContacts();
        this.scrollListener = window.addEventListener("scroll", e => {
            this.handleScroll(e);
        });
    }

    handleScroll = () => {
        const { scrolling, totalPages, page } = this.state;
        if (scrolling) return;
        if (totalPages <= page) return;
        var elem = document.getElementsByTagName("tr")[this.state.per];
        var lastLi = elem.lastChild;
        var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        var pageOffset = window.pageYOffset + window.innerHeight;
        var bottomOffset = 200;
        if (pageOffset > lastLiOffset - bottomOffset) {
            this.loadMore();
        }
        console.log(lastLi);
        console.log("lastLiOffset", lastLiOffset);
        console.log("pageOffset", pageOffset);
    };

    loadContacts = () => {
        const { per, contacts, index } = this.state;
        this.setState({
            contacts: [
                ...contacts,
                ...this.props.users.slice(index, index + per)
            ],
            scrolling: false,
            totalPages: this.props.users.length / per
        });
    };

    loadMore = () => {
        console.log("im in");
        setTimeout(() => {
            this.setState(
                prevState => ({
                    index: prevState.index + this.state.per,
                    page: prevState.page + 1,
                    scrolling: true
                }),
                this.loadContacts
            );
        }, 500);
    };

    sortName = () => {
        if (this.state.flag === 0 && !this.state.colName) {
            this.setState({ colName: "name", flag: 1 });
        } else if (this.state.flag === 1) {
            this.setState({ colName: "name", flag: 2 });
        } else {
            this.setState({ colName: "name", flag: 1 });
        }
    };

    sortTitle = () => {
        if (this.state.flag === 0 && !this.state.colName) {
            this.setState({ colName: "title", flag: 1 });
        } else if (this.state.flag === 1) {
            this.setState({ colName: "title", flag: 2 });
        } else {
            this.setState({ colName: "title", flag: 1 });
        }
    };

    sortEmployee = () => {
        if (this.state.flag === 0 && !this.state.colName) {
            this.setState({ colName: "employee", flag: 1 });
        } else if (this.state.flag === 1) {
            this.setState({ colName: "employee", flag: 2 });
        } else {
            this.setState({ colName: "employee", flag: 1 });
        }
    };

    // sortManager = () => {
    //     if (this.state.flag === 0 && !this.state.colName) {
    //         this.setState({ colName: "manager", flag: 1 });
    //     } else if (this.state.flag === 1) {
    //         this.setState({ colName: "manager", flag: 2 });
    //     } else {
    //         this.setState({ colName: "manager", flag: 1 });
    //     }
    // };

    render() {
        const { flag } = this.state;
        console.log(this.state);

        if (flag === 0) {
            sortedUsers = [...this.state.contacts];
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
                        <CustomTableCell>Avatar</CustomTableCell>
                        <CustomTableCell onClick={this.sortName}>
                            Name
                        </CustomTableCell>
                        <CustomTableCell onClick={this.sortTitle}>
                            Title
                        </CustomTableCell>
                        <CustomTableCell onClick={this.sortEmployee}>
                            Employee
                        </CustomTableCell>
                        <CustomTableCell>Manager</CustomTableCell>
                        <CustomTableCell>Detail</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedUsers.map(user => (
                        <UserInfo
                            id={user._id}
                            key={user._id}
                            url={user.imageUrl}
                            name={user.name}
                            title={user.title}
                            employees={user.employees}
                            manager={user.manager}
                            sex={user.sex}
                            startDate={user.startDate}
                            officePhone={user.officePhone}
                            sms={user.sms}
                            email={user.email}
                            err={this.props.users.err}
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
