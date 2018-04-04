import React from "react";
import Titles from "../components/Titles";
import Form from "../components/Form";
import Weather from "../components/Weather";



require("babel-core/register");
require("babel-polyfill");

const API_Key = "3967b27adcfa9ab3b6d0d6fd2433df1d";

class App extends React.Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }
    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        try {
            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`);
            const data = await api_call.json();

            if (city && country) {
                this.setState({
                    temperature: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    error: "",
                });
            }else{
                this.setState({
                    temperature: undefined,
                    city: undefined,
                    country: undefined,
                    humidity: undefined,
                    description: undefined,
                    error: "Please enter values",
                });
            }

        } catch (e) {
            this.setState({
                err: e.message
            })
        }
    }


    render() {
        return ( 
          <div>
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-5 title-container">
                                <Titles/>
                            </div>   
                            <div className="col-7 form-container">
                            <Form getWeather={this.getWeather}/>
                                <Weather
                                    temperature={this.state.temperature}
                                    city={this.state.city}
                                    country={this.state.country}
                                    humidity={this.state.humidity}
                                    description={this.state.description}
                                    error={this.error}
                                    />
                            </div>                       
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
      }

};

export default App;




