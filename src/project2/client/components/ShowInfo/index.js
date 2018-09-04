import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

class ShowInfo extends Component {
    componentDidMount() {
        this.props.getOneUser(this.props.index);
    }

    render() {
        console.log("showinfo", this.props.users);
        return (
            <div className="content">
                <img src={this.props.users.user.url} alt="avatar" />

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
)(ShowInfo);
