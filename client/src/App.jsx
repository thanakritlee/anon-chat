import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { NavLink, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/home/home';
import About from './pages/about/about';

class App extends Component {

  state = {
    message: ""
  };

  componentDidMount() {
    axios.get('http://localhost:8000/api/hello')
      .then(res => {
        console.log(res);
        const message = res.data.message;
        this.setState({ message });
      })
  }

  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
          <div>
            {this.state.message}
          </div>
          <NavLink exact to="/home">Home</NavLink>
          <br/>
          <NavLink exact to="/about">About</NavLink>
          <br/>
            <div>
              <Route exact path="/home" component={Home} />
              <Route exact path="/about" component={About} />
            </div>
      </div>
    );
  }
}

export default App;
