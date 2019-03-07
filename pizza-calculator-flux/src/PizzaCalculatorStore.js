import EventEmitter from 'events';
import AppDispatcher from './AppDispatcher';

let initialState = {
  numberOfPeople: 10,
  slicesPerPerson: 2
}

let calculator = { ...initialState };

class PizzaCalculatorStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register((action) => {
      if(action.type === 'UPDATE_NUMBER_OF_PEOPLE') {
        calculator.numberOfPeople = action.value;
        this.emit('change');
      }

      if(action.type === 'UPDATE_SLICES_PER_PERSON') {
        calculator.numberOfPeople = action.value;
        this.emit('change');
      }

      if(action.type === 'RESET') {
        calculator.numberOfPeople = { ...initialState };
        this.emit('change');
      }
    });
  }
}

export default new PizzaCalculatorStore();