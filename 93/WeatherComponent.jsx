
import React, { Component } from 'react';

class WeatherComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    
    const zipCode = '10001';
    const apiKey = 'f0919bb175394ebd82c151955240301'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
       
        this.setState({ weather: data, isLoading: false });
      })
      .catch(error => {
        
        this.setState({ error: error.message, isLoading: false });
      });
  }

  render() {
    const { weather, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h2>Current Weather</h2>
        <p>City: {weather.name}</p>
        <p>Temperature: {weather.main.temp}</p>
        <p>Weather: {weather.weather[0].main}</p>
      </div>
    );
  }
}

export default WeatherComponent;
