import React, { Component } from "react";
import "./Weather.css";
import axios from "axios";

class Weather extends Component {
  state = {
    city: "",
    cityToDisplay: "",
    degree: "",
    description: "",
    icon: "",
  };

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;

        const apiKey = "ff0a51a98f894bffa50bc6c6c9dac73a";

        const api = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&units=M&lat=${lat}&lon=${lon}`;

        axios
          .get(api)
          .then((response) => {
            return response;
          })
          .then((data) => {
            // console.log(data);

            const { city_name, temp } = data.data.data[0];
            const { description, icon } = data.data.data[0].weather;
            this.setState({
              cityToDisplay: city_name,
              degree: temp,
              description: description,
              icon: icon,
            });
          });
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  clickHandler = () => {
    this.setState({
      city: this.state.city,
    });
    // console.log(this.state.city);
    const apiKey = "ff0a51a98f894bffa50bc6c6c9dac73a";
    const api = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${this.state.city}`;

    axios
      .get(api)
      .then((response) => {
        return response;
      })
      .then((data) => {
        // console.log(data.data.data[0].city_name);
        if (data.data) {
          const { city_name, temp } = data.data.data[0];
          const { description, icon } = data.data.data[0].weather;
          this.setState({
            cityToDisplay: city_name,
            degree: temp,
            description: description,
            icon: icon,
          });
        } else {
          this.setState({
            cityToDisplay: "City Not Found",
            degree: "",
            description: "",
          });
        }
        // console.log(this.state.city);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            onChange={this.handleChange}
            vlaue={this.state.city}
          />
          <button onClick={this.clickHandler}>SEARCH</button>
        </div>
        <div className="location">
          <h1>{this.state.cityToDisplay}</h1>
          {this.state.cityToDisplay === "City Not Found" ? null : (
            <img
              alt=""
              src={
                this.state.icon
                  ? `https://www.weatherbit.io/static/img/icons/${this.state.icon}.png`
                  : ""
              }
            />
          )}
        </div>
        <div className="temp">
          <div className="temp-degree">
            <h2>{this.state.degree}</h2>
            <p>{this.state.degree ? "C" : null}</p>
          </div>
          <div className="temp-description">
            <p>{this.state.description}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Weather;
