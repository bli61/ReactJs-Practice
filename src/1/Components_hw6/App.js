import React, { Component } from "react";
import "./App.css";
const ToDoItem = props => {
    return (
        <li>
            {props.name} :{" "}
            <input
                type="checkbox"
                id={props.name}
                checked={props.checked}
                onClick={() => props.click(props.id)}
            />
        </li>
    );
};
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { textInput: "", authenticated: 0, checkInfo: [] };
    }
    handleInputChange = e => {
        this.setState({
            textInput: e.target.value
        });

        console.log(e.target.value);
    };

    handleSubmit = e => {
        let pendingItem = {
            name: this.state.textInput,
            checked: false
        };
        this.setState({
            checkInfo: [...this.state.checkInfo, pendingItem],
            textInput: ""
        });
    };

    allBtn = () => {
        this.setState({ authenticated: 0 });
    };

    activeBtn = () => {
        this.setState({ authenticated: 1 });
    };

    completeBtn = () => {
        this.setState({ authenticated: 2 });
    };

    handleClick = id => {
        let clickable = this.state.checkInfo.map((record, index) => {
            if (id === index) {
                if (record.checked) {
                    return { ...record, checked: false };
                } else {
                    return { ...record, checked: true };
                }
            } else {
                return record;
            }
        });
        this.setState({ checkInfo: clickable });
    };

    render() {
        const { authenticated } = this.state;
        return (
            <div className="border">
                <form>
                    <label>
                        Todo List
                        <input
                            type="text"
                            value={this.state.textInput}
                            onChange={this.handleInputChange}
                        />
                    </label>
                </form>
                <button onClick={this.handleSubmit}>Submit</button>

                <div>
                    <ul>
                        {authenticated === 0
                            ? this.state.checkInfo.map((record, index) => {
                                  return (
                                      <ToDoItem
                                          name={record.name}
                                          checked={record.checked}
                                          key={index}
                                          id={index}
                                          click={this.handleClick}
                                      />
                                  );
                              })
                            : authenticated === 1
                                ? this.state.checkInfo
                                      .filter(
                                          record => record.checked === false
                                      )
                                      .map((record, index) => {
                                          return (
                                              <ToDoItem
                                                  name={record.name}
                                                  checked={record.checked}
                                                  key={index}
                                                  id={index}
                                                  click={this.handleClick}
                                              />
                                          );
                                      })
                                : this.state.checkInfo
                                      .filter(record => record.checked === true)
                                      .map((record, index) => {
                                          return (
                                              <ToDoItem
                                                  name={record.name}
                                                  checked={record.checked}
                                                  key={index}
                                                  id={index}
                                                  click={this.handleClick}
                                              />
                                          );
                                      })}
                    </ul>
                </div>
                <button onClick={this.allBtn}>All</button>
                <button onClick={this.activeBtn}>Active</button>
                <button onClick={this.completeBtn}>Complete</button>
            </div>
        );
    }
}

export default App;
