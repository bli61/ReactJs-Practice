import React from "react";
import { Link, Redirect } from "react-router-dom";

const Users = props => {
    if (!props.authenticated) {
        return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
        <div className="divpart1">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>username</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {props.allUser.map((item, index) => {
                        return <List key={item.id} {...item} />;
                    })}
                </tbody>
            </table>
        </div>
    );
};

const List = props => {
    const imageStyle = { width: 50, height: 50 };
    return (
        <tr>
            <td>{props.id}</td>

            <td>
                <Link to={`/users/${props.login}`}>{props.login}</Link>
            </td>
            <td>
                <img
                    style={imageStyle}
                    src={props.avatar_url}
                    alt={props.avatar_url}
                />
            </td>
        </tr>
    );
};

export default Users;
