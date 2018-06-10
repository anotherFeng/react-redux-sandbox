import React, {Component} from 'react';
import {connect} from 'react-redux';
import WeatherChart from '../components/WeatherChart';
import GoogleMap from '../components/GoogleMap';

class WeatherList extends Component{
  
  renderWeather(data){
    const name = data.city.name;
    const temps = data.list.map(weather=> (1.8*(weather.main.temp-273)) +32);
    const pressures = data.list.map(weather=>weather.main.pressure);
    const humidities = data.list.map(weather=>weather.main.humidity);
    const {lon, lat} = data.city.coord;

    return (
      <tr key={name}>
        <td>
          <GoogleMap lon={lon} lat={lat}/>
        </td>
        <td>
          <WeatherChart data={temps} color='red' units="F"/>
        </td>
        <td>
          <WeatherChart data={pressures} color='grey' units="hPa"/>
        </td>
        <td>
          <WeatherChart data={humidities} color='blue' units="%"/>
        </td>
      </tr>
    )

  }

  render(){
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (F)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {console.log(this.props)}
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = ({weather}) => { //data is this.props.weather.weather, desctruct it for cleaner code
  return { weather }; //same as {weather: state.weather}
}

export default connect(mapStateToProps)(WeatherList);