import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ShowAllInfo from "../../components/ShowAllInfo";
import Button from "@material-ui/core/Button";
let filteredUsers = [];
let usersBeforeFilter = [];
let totalPage;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            autenticated: false,
            currentPage: 1
        };
    }

    componentDidMount() {
        this.props.getUserList();

        // console.log("home page", this.props.page);
    }

    handleInput = e => {
        this.setState({ input: e.target.value, autenticated: true });
    };
    setPage = pageNum => {
        this.setState({ currentPage: pageNum });
    };

    render() {
        let pageSize = this.props.page.numberPerPage;
        usersBeforeFilter = [...this.props.users.users];
        if (usersBeforeFilter.length % pageSize === 0) {
            totalPage = Math.floor(usersBeforeFilter.length / pageSize);
        } else {
            totalPage = Math.floor(usersBeforeFilter.length / pageSize) + 1;
        }
        let currentPage = this.state.currentPage;
        let startPage, endPage;

        if (totalPage <= 3) {
            startPage = 1;
            endPage = 3;
        } else {
            if (currentPage <= 2) {
                startPage = 1;
                endPage = 3;
            } else if (currentPage + 1 >= totalPage) {
                startPage = totalPage - 2;
                endPage = totalPage;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(
            startIndex + pageSize - 1,
            this.props.users.users.length - 1
        );

        console.log(startPage, currentPage, endPage);

        // usersBeforeFilter.slice(0,this.props.page.)
        console.log(startIndex, endIndex);

        console.log("users in Home", usersBeforeFilter);
        const { autenticated } = this.state;

        if (!autenticated || this.state.input.length === 0) {
            filteredUsers = [...this.props.users.users].slice(
                startIndex,
                endIndex + 1
            );
        } else {
            filteredUsers = [
                ...this.props.users.users
                    .slice(startIndex, endIndex + 1)
                    .filter(
                        user =>
                            user.FirstName.includes(this.state.input) ||
                            user.LastName.includes(this.state.input) ||
                            user.Sex.includes(this.state.input) ||
                            user.Age.toString().includes(this.state.input)
                    )
            ];
        }
        return (
            <div>
                <h2>Users</h2>
                <Button onClick={this.test}>test</Button>
                Search :{" "}
                <input
                    type="text"
                    value={this.state.input}
                    onChange={this.handleInput}
                />
                <ShowAllInfo users={filteredUsers} />
                <div
                    style={{
                        display: "flex",
                        width: "200px",
                        justifyContent: "space-around"
                    }}
                >
                    {this.state.currentPage > 2 && (
                        <a onClick={() => this.setPage(1)}>{"<<"}</a>
                    )}
                    {this.state.currentPage > 1 && (
                        <a
                            onClick={() =>
                                this.setPage(this.state.currentPage - 1)
                            }
                        >
                            {"<"}
                        </a>
                    )}
                    {this.state.currentPage > 1 && (
                        <a
                            onClick={() =>
                                this.setPage(this.state.currentPage - 1)
                            }
                        >
                            {this.state.currentPage - 1}
                        </a>
                    )}
                    <span style={{ color: "red" }}>
                        {this.state.currentPage}
                    </span>
                    {this.state.currentPage < totalPage && (
                        <a
                            onClick={() =>
                                this.setPage(this.state.currentPage + 1)
                            }
                        >
                            {this.state.currentPage + 1}
                        </a>
                    )}
                    {this.state.currentPage < totalPage - 1 && (
                        <a
                            onClick={() =>
                                this.setPage(this.state.currentPage + 1)
                            }
                        >
                            {">"}
                        </a>
                    )}
                    {this.state.currentPage < totalPage - 2 && (
                        <a onClick={() => this.setPage(totalPage)}>{">>"}</a>
                    )}
                </div>
                <Button
                    variant="contained"
                    color="default"
                    style={{ marginTop: 10 }}
                >
                    {" "}
                    <Link style={{ textDecoration: "none" }} to="/new">
                        Create New Users
                    </Link>{" "}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        users: state.users,
        page: state.page
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserList: () => {
            dispatch(actions.getUserList());
        },
        forward: () => {
            dispatch(actions.pageforward());
        },
        backward: () => {
            dispatch(actions.pagebackward());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
