import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WeatherDetails from './WeatherDetails';

class App extends Component {
  state = {
    zip: ''
  };

  handleZipChange = (e) => {
    const zip = e.target.value;
    this.setState({ zip });
    if (zip.length === 5) {
      this.fetchWeather(zip);
    }
  };

  fetchWeather = (zip) => {
    // Simulated fetchWeather function, replace with actual API call
    console.log("Fetching weather for zip: ", zip);
  };

  render() {
    return (
      <div>
        <h1>Weather App</h1>
        <input
          type="text"
          value={this.state.zip}
          onChange={this.handleZipChange}
          placeholder="Enter ZIP code"
        />
        <WeatherDetails />
      </div>
    );
  }
}

export default App;