import React from "react";

const Detail = props => {
    return (
        <div>
            <div className="Rough">
                <h2>
                    {props.subject}{" "}
                    <span className="layoutPR">
                        <button
                            onClick={() => {
                                props.handleDel(props.index);
                            }}
                        >
                            X
                        </button>
                    </span>
                </h2>
                <p>
                    <span className="layoutPL">{props.from}</span>{" "}
                    <span className="layoutPR">{props.time}</span>
                </p>
            </div>
            <p>{props.message}</p>
        </div>
    );
};

export default Detail;
