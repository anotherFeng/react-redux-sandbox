import React, { Component } from 'react';

import PizzaCalculatorStore from './PizzaCalculatorStore';
import * as actions from './actions';
import Title from './Title';
import Input from './Input';
import Result from './Result';

import calculatePizzasNeeded from './lib/calculate-pizzas-needed';

const initialState = {
  numberOfPeople: 10,
  slicesPerPerson: 2,
};

  // Container.displayName = `WithPizzaCalculations(${ WrappedComponent.displayName || WrappedComponent.name })`;
  // return Container;
class PizzaCalculator extends Component {

  render() {
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

const PizzaContainer = WithPizzaCalculation(PizzaCalculator);

export default class Application extends Component {
  state = PizzaCalculatorStore.getState();

  componentDidMount() {
    PizzaCalculatorStore.on('change', this.updateState);
  }

  componentWillUnmount() {
    PizzaCalculatorStore.off('change', this.updateState);
  }

  updateNumberOfPeople = event => {
    const numberOfPeople = parseInt(event.target.value, 10);
    actions.updateNumberOfPeople(numberOfPeople);
  };

  updateSlicesPerPerson = event => {
    const slicesPerPerson = parseInt(event.target.value, 10);
    actions.updateSlicesPerPerson(slicesPerPerson);
  };

  updateState() {
    this.setState(PizzaCalculatorStore.getState());
  }

  render() {
    const { numberOfPeople, slicesPerPerson } = this.state;
    const numberOfPizzas = calculatePizzasNeeded(
      numberOfPeople,
      slicesPerPerson,
    );

    return (
      <PizzaCalculator
        {...this.state}
        updateNumberOfPeople={this.updateNumberOfPeople}
        updateSlicesPerPerson={this.updateSlicesPerPerson}
        reset={actions.reset}
      />
    );
  }
}