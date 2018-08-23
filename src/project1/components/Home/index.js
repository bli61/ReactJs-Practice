import React from "react";
import { Link } from "react-router-dom";
import SearchInfo from "../../components/SearchInfo";
import ShowAllInfo from "../../components/ShowAllInfo";

const Home = () => {
    return (
        <div>
            <h2>Users</h2>
            <SearchInfo />
            <ShowAllInfo />

            <button>
                {" "}
                <Link to="/newUser">Create New Users</Link>{" "}
            </button>
        </div>
    );
};

export default Home;
