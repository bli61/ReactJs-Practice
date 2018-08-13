import React from "react";
import { Link, Redirect } from "react-router-dom";
const Problems = props => {
    if (!props.authenticated) {
        return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
        <div className="btn">
            <Link to={`/problems/${props.id}`}>{props.eachTitle}</Link>
        </div>
    );
};

export default Problems;
