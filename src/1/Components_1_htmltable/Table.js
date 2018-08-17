import React, { Component } from "react";
import "./Table.css";

class Table extends Component {
    render() {
        return (
            <table>
                <tr>
                    <td>{this.props.data[0]}</td>
                    <td>{this.props.data[1]}</td>
                    <td>{this.props.data[2]}</td>
                    <td>{this.props.data[3]}</td>
                    <td>{this.props.data[4]}</td>
                </tr>
            </table>
        );
    }
}
export default Table;
