import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import axios from 'axios';

axios.interceptors.request.use((req) => {
  if(localStorage.getItem("user")){
    req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`;
    console.log("it works")
  }
  return req;

})

ReactDOM.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);