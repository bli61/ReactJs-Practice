import React from "react";

const Trash = props => {
    return (
        <div>
            <div className="Rough">
                <h2>{props.subject} </h2>
                <p>
                    <span className="layoutPL">{props.from}</span>{" "}
                    <span className="layoutPR">{props.time}</span>
                </p>
            </div>
            <p>{props.message}</p>
        </div>
    );
};

export default Trash;
