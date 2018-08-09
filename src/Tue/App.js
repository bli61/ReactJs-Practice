import React, { Component } from "react";
import VoterList from "./VoterList";
import "./App.css";

class VoterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      items: [
        {
          title: "test",
          desc: "haha",
          countPositive: 25,
          countNegative: 12
        },
        {
          title: "another",
          desc: "hoho",
          countPositive: 1,
          countNegative: 7
        }
      ]
    };
  }

  handleChange = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    let pendingItem = {
      title: this.state.title,
      desc: this.state.desc,
      countPositive: 0,
      countNegative: 0
    };
    console.log(pendingItem);
    this.setState(prevState => ({
      items: [...prevState.items, pendingItem],
      title: "",
      desc: ""
    }));
  };

  handleAdd = id => {
    let updatedItems = this.state.items.map((item, idx) => {
      if (idx === id) {
        return { ...item, countPositive: item.countPositive + 1 };
      } else {
        return item;
      }
    });
    this.setState({ items: updatedItems });
  };

  handleMinus = id => {
    let updatedItems = this.state.items.map((item, idx) => {
      if (idx === id) {
        return { ...item, countNegative: item.countNegative + 1 };
      } else {
        return item;
      }
    });
    this.setState({ items: updatedItems });
  };

  render() {
    return (
      <div className="container">
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="desc"
          value={this.state.desc}
          onChange={this.handleChange}
          placeholder="Description"
        />
        <button onClick={this.handleSubmit}>Add</button>
        <div className="border">
          <VoterList
            items={this.state.items}
            handleAdd={this.handleAdd}
            handleMinus={this.handleMinus}
          />
        </div>
      </div>
    );
  }
}

export default VoterPage;
