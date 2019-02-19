import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { NavLink, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/home/home';
import About from './pages/about/about';

class App extends Component {

  state = {
    helloworld: "",
    username: "",
    messages: [],
    currentMessage: ""
  };

  componentDidMount() {
    var self = this;

    // GET Hello world.
    axios.get('http://localhost:8000/api/hello')
    .then(res => {
      const helloworld = res.data.message;
      this.setState({ helloworld });
    });

    // GET uuid username.
    axios.get("http://localhost:8000/api/uuid")
    .then(res => {
      const username = res.data.message;
      this.setState({ username });
    })

    // Listen to websocket.
    this.ws = new WebSocket("ws://localhost:8000/api/ws");
    this.ws.addEventListener("message", (e) => {
      const msg = JSON.parse(e.data);
      const message = {username: msg.username, message: msg.message};
      const messages = this.state.messages;
      messages.push(message);
      console.log(messages);
      this.setState({ messages });
    });
    this.toggleSendMessage = this.toggleSendMessage.bind(this);
    this.messageOnChange = this.messageOnChange.bind(this);
  }

  messageOnChange(message) {
    message = message.currentTarget.value;
    const currentMessage = {username: this.state.username, message: message};
    this.setState({ currentMessage });
  }

  toggleSendMessage() {
    this.ws.send(JSON.stringify(this.state.currentMessage));
    this.setState({ currentMessage: {} });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.helloworld}
          <br/>
          {this.state.username}
          <br/>
          <NavLink exact to="/home">Home</NavLink>
          <br/>
          <NavLink exact to="/about">About</NavLink>
          <br/>
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <br/>
          <input type="text" name="message" onChange={this.messageOnChange}/>
          <br/>
          <button onClick={this.toggleSendMessage}>Send</button>
        </header>
      </div>
    );
  }
}

export default App;
