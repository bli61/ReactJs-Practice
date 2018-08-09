import React, { Component } from 'react';

const VoterItem = (props) => {
  return (
    <li>
      <button onClick={() => props.handleAdd(props.id)}>+</button>
      <span>{props.countPositive - props.countNegative}</span>
      <button onClick={() => props.handleMinus(props.id)}>-</button>
      <p>{props.title}</p>
      <p>{props.desc}</p>
    </li>
  );
};

class VoterList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, idx) => (
          <VoterItem
            {...item}
            key={idx}
            id={idx}
            handleAdd={this.props.handleAdd}
            handleMinus={this.props.handleMinus}
          />
        ))}
      </ul>
    );
  }
}

export default VoterList;
