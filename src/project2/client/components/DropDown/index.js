import React, { Component } from "react";

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = { manager: {} };
    }

    handleChange = e => {
        let value = this.props.users.filter(
            user => user._id === e.target.value
        );
        let pendding = {
            managerId: e.target.value,
            managerName: value[0].name
        };

        this.setState({ manager: { ...pendding } });
        this.props.handleClick(pendding);
        console.log("dd:", pendding);
    };

    render() {
        let users = this.props.users.filter(
            user => user.rank > this.props.rank
        );
        console.log("DropDown:", users);
        return (
            <select value={this.state.manager} onChange={this.handleChange}>
                {users.map((user, key) => (
                    <option key={key} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>
        );
    }
}

export default DropDown;
