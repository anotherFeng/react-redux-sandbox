import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';

import './Application.css';

const defaultState = [
  { value: 'Pants', id: uniqueId(), packed: false },
  { value: 'Jacket', id: uniqueId(), packed: false },
  { value: 'iPhone Charger', id: uniqueId(), packed: false },
  { value: 'MacBook', id: uniqueId(), packed: false },
  { value: 'Sleeping Pills', id: uniqueId(), packed: true },
  { value: 'Underwear', id: uniqueId(), packed: false },
  { value: 'Hat', id: uniqueId(), packed: false },
  { value: 'T-Shirts', id: uniqueId(), packed: false },
  { value: 'Belt', id: uniqueId(), packed: false },
  { value: 'Passport', id: uniqueId(), packed: true },
  { value: 'Sandwich', id: uniqueId(), packed: true },
];

class Application extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.setState({items:defaultState});
  }

  addItem = (item) => {
    this.setState({ items: [item, ...this.state.items]});
  }

  removeItem = (itemToRemove) => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemToRemove.id)
    })
  }

  // How are we going to manipulate the state?
  // Ideally, users are going to want to add, remove,
  // and check off items, right?

  render() {
    const { items } = this.state;
    const packedItems = [], unpackedItems = [];
    items.forEach((item) => item.packed ? packedItems.push(item) : unpackedItems.push(item));
    console.log(packedItems, unpackedItems)
    return (
      <div className="Application">
        <NewItem onSubmit={this.addItem}/>
        <CountDown />
        <Items title="Unpacked Items" items={unpackedItems} onRemove={this.removeItem}/>
        <Items title="Packed Items" items={packedItems} onRemove={this.removeItem}/>
        <button className="button full-width">Mark All As Unpacked</button>
      </div>
    );
  }
}

export default Application;