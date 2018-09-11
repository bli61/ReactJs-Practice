import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ShowAllInfo from "../../components/ShowAllInfo";
import Button from "@material-ui/core/Button";

let filteredUsers = [];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            autenticated: false
        };
    }

    static defaultProps = {
        manager: { managerId: "", managerName: "" }
    };
    componentDidMount() {
        this.props.getUserList();

        // console.log("home page", this.props.page);
    }

    handleInput = e => {
        this.setState({ input: e.target.value, autenticated: true });
    };

    render() {
        console.log("users in Home", this.props.users);
        const { autenticated } = this.state;

        if (!autenticated || this.state.input.length === 0) {
            filteredUsers = [...this.props.users.users];
        } else {
            filteredUsers = [
                ...this.props.users.users.filter(
                    user =>
                        user.name.includes(this.state.input) ||
                        user.title.includes(this.state.input) ||
                        user.manager.managerName.includes(this.state.input)
                )
            ];
        }
        return (
            <div>
                <h2>Employee</h2>
                Search :{" "}
                <input
                    type="text"
                    value={this.state.input}
                    onChange={this.handleInput}
                />
                <ShowAllInfo users={filteredUsers} />
                <Button
                    variant="contained"
                    color="default"
                    style={{ marginTop: 10 }}
                >
                    {" "}
                    <Link style={{ textDecoration: "none" }} to="/new">
                        Create New User
                    </Link>{" "}
                </Button>
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
