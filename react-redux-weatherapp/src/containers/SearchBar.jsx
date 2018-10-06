import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWeather} from '../actions/ActionsIndex';

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state={
      term: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(e){
    console.log(e.target.value);
    this.setState({
      term: e.target.value,
    })
  }

  handleFormSubmit(e){
    e.preventDefault();
    this.props.fetchWeather(this.state.term);
    this.setState({term:''});
  }

  render(){
    return(
      <form onSubmit={this.handleFormSubmit} className="input-group">
        <input 
        placeholder="Get a five-day forecast in your favorite cities"
        className="form-control"
        value={this.state.term}
        onChange={this.handleInputChange}/>
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return bindActionCreators({fetchWeather}, dispatch);
} 

export default connect(null,mapDispatchToProps)(SearchBar);