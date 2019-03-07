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

  removeItem = (itemId) => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId)
    })
  }

  toggleItem = (itemId) => {
    const items = this.state.items.map(item => {
      if(item.id === itemId) {
        return { ...item, packed: !item.packed };
      }
      return item;
    })
    this.setState({
      items
    })
  }

  markAllAsUnpacked = () => {
    const items = this.state.items.map(item => {
      return { ...item, packed: false };
    });
    this.setState({ items });
  }

  // How are we going to manipulate the state?
  // Ideally, users are going to want to add, remove,
  // and check off items, right?

  render() {
    const { items } = this.state;
    const packedItems = [], unpackedItems = [];
    items.forEach((item) => item.packed ? packedItems.push(item) : unpackedItems.push(item));
    return (
      <div className="Application">
        <NewItem onSubmit={this.addItem}/>
        <CountDown />
        <Items title="Unpacked Items" items={unpackedItems} onRemove={this.removeItem} onToggle={this.toggleItem}/>
        <Items title="Packed Items" items={packedItems} onRemove={this.removeItem} onToggle={this.toggleItem}/>
        <button className="button full-width" onClick={this.markAllAsUnpacked}>Mark All As Unpacked</button>
      </div>
    );
  }
}

export default Application;
