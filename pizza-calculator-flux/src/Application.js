import React, { Component } from 'react';

import PizzaCalculatorStore from './PizzaCalculatorStore';
import * as actions from './actions';
import Title from './Title';
import Input from './Input';
import Result from './Result';

import calculatePizzasNeeded from './lib/calculate-pizzas-needed';

class PizzaCalculator extends Component {

  render() {
    const { numberOfPeople, numberOfPizzas, updateNumberOfPeople, updateSlicesPerPerson, slicesPerPerson, reset } = this.props; 
    return (
      <div className="Application">
        <Title />
        <Input
          label="Number of Guests"
          type="number"
          min={0}
          value={numberOfPeople}
          onChange={updateNumberOfPeople}
        />
        <Input
          label="Slices Per Person"
          type="number"
          min={0}
          value={slicesPerPerson}
          onChange={updateSlicesPerPerson}
        />
        <Result amount={numberOfPizzas} />
        <button className="full-width" onClick={reset}>
          Reset
        </button>
      </div>
    )
  }
}

export default class Application extends Component {
  state = PizzaCalculatorStore.getState();

  componentDidMount() {
    PizzaCalculatorStore.on('change', this.updateState);
  };

  componentWillUnmount() {
    PizzaCalculatorStore.off('change', this.updateState);
  };

  updateNumberOfPeople = event => {
    const numberOfPeople = parseInt(event.target.value, 10);
    actions.updateNumberOfPeople(numberOfPeople);
  };

  updateSlicesPerPerson = event => {
    const slicesPerPerson = parseInt(event.target.value, 10);
    actions.updateSlicesPerPerson(slicesPerPerson);
  };

  updateState = () => {
    this.setState(PizzaCalculatorStore.getState());
  };

  render() {
    const { numberOfPeople, slicesPerPerson } = this.state;
    const numberOfPizzas = calculatePizzasNeeded(
      numberOfPeople,
      slicesPerPerson,
    );

    return (
      <PizzaCalculator
        {...this.state}
        numberOfPizzas={numberOfPizzas}
        updateNumberOfPeople={this.updateNumberOfPeople}
        updateSlicesPerPerson={this.updateSlicesPerPerson}
        reset={actions.reset}
      />
    );
  };
};