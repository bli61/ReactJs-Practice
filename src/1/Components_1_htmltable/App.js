import React, { Component } from "react";
import "./App.css";
import Table from "./Table";
// import Row from "./Row";

const data = {
    header: ["", "Knocky", "Flor", "Ella", "Juan"],
    row0: ["Breed", "Jack Russell", "Poodle", "Streetdog", "Cocker Spaniel"],
    row1: ["Age", "16", "9", "10", "5"],
    row2: ["Owner", "Mother-in-law", "Me", "Me", "Sister-in-law"],
    row3: [
        "Eating Habits",
        "Eats everyone's leftovers",
        "Nibbles at food",
        "Hearty eater",
        "Will eat till he explodes"
    ]
};
class App extends Component {
    render() {
        return (
            <div>
                <Table data={data.header} />
                <Table data={data.row0} />
                <Table data={data.row1} />
                <Table data={data.row2} />
                <Table data={data.row3} />
            </div>
        );
    }
}

export default App;
