import React from "react";
import ReactDOM  from 'react-dom';
import axios from 'axios';
import App from './App'
import {BrowserRouter} from 'react-router-dom';

axios.defaults.baseURL = 'https://fonebuk.herokuapp.com';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
    document.getElementById('root')
  )