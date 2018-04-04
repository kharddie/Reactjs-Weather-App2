import React from "react";
import ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css'

import "./App.css";

import App from "./App";

console.log(process.env.NODE_ENV);//working
console.log(ENVPROD);//working



const app = document.getElementById('app');
ReactDOM.render( <App> </App>,app);

