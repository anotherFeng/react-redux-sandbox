import React, { Component } from 'react';
import Counter from './Counter';

export default class CounterContainer extends Component {
  state = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  }

  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  handleReset = () => {
    this.setState({ count: 0 });
  }

  render() {
    return (
      <Counter 
        count={this.state.count}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
        onReset={this.handleReset}
        />
    );
  }
}
