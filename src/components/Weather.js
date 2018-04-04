import React from "react";

const Weather = props => {
    console.log(props);
    return (
        <div className="weather__info">
            {
                props.country && props.city && <p className="weather__key">Location: 
                <span className="weather__value"> {props.country} , {props.city} </span></p>
            }
            {
                props.temperature && <p className="weather__key">Tempreture: 
                <span className="weather__value"> {props.temperature}</span></p>
            }
            {
                props.humidity && <p className="weather__key">Humidity: 
                <span className="weather__value"> {props.humidity}</span></p>
            }
            {
                props.description && <p className="weather__key">Decription: 
                <span className="weather__value"> {props.description}</span></p>
            }
            {
                props.error && <p>Error: {props.error}</p>
            }
        </div>
    )
}

export default Weather;