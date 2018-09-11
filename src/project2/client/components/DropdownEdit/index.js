import React, { Component } from "react";

class DropDownEdit extends Component {
    constructor(props) {
        super(props);
        this.state = { manager: { managerId: "", managerName: "" } };
    }
    componentDidMount() {
        this.setState({ manager: { ...this.props.manager } }, () => {
            console.log("in edit dropdown", this.props.manager);
        });
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
        console.log("in edit", this.props.manager);
        let users = [...this.props.users];
        console.log("in edit dropdown state", this.state.manager);
        let optionTemplate = users.map((user, key) => (
            <option value={user._id} key={key}>
                {user.name}
            </option>
        ));
        return (
            <select
                style={{ width: 50, height: 20 }}
                value={this.state.manager.managerName}
                onChange={this.handleChange}
            >
                <option value={this.state.manager.managerName}>
                    {this.props.manager.managerName}
                </option>
                {optionTemplate}
            </select>
        );
    }
}

export default DropDownEdit;
