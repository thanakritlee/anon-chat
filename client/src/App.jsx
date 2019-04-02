import React, { Component } from 'react';
import './App.css';

import SendMessageForm from './components/SendMessageForm/SendMessageForm';
import MessageList from './components/MessageList/MessageList'

import axios from 'axios';

class App extends Component {

  constructor() {
    // Must call super, if using a stateful component.
    super();
    this.state = {
      username: "",
      messages: [],
      colour: ""
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.focusForm = this.focusForm.bind(this);
  }

  componentDidMount() {

    // GET uuid username.
    axios.get(`/api/username`)
    .then(res => {
      const username = res.data.username;
      this.setState({ username });
    });

    // GET user colour.
    axios.get(`/api/colour`)
    .then(res => {
      const colour = res.data.colour;
      this.setState({ colour });
    });

    // GET chat history.
    axios.get(`/api/chat-history`)
    .then(res => {
      const messages = res.data.messages;
      this.setState({ messages });
    });

    // Listen to websocket.
    const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    let { host } = window.location; // nb: window location contains the port, so host will be localhost:3000 in dev
    this.ws = new WebSocket(`${protocolPrefix}//${host}/api/ws`); // dbstates is my websocket route

    // this.ws = new WebSocket(`/api/ws`);
    this.ws.addEventListener("message", (e) => {
      const msg = JSON.parse(e.data);
      const message = { username: msg.username, message: msg.message, timestamp: msg.timestamp, colour: msg.colour };
      const messages = this.state.messages;
      messages.push(message);
      this.setState({ messages });
    });    
  }

  sendMessage(message) {
    const currentMessage = { username: this.state.username, message: message, colour: this.state.colour };
    this.ws.send(JSON.stringify(currentMessage));
  }

  focusForm() {
    this.SendMessageFormComponent.focusInput();
  }

  render() {
    return (
      <div className="App">
        <div className="AppHeader">
          <h3>Anon Chat</h3>
          <img src="https://travis-ci.com/thanakritlee/anon-chat.svg?branch=master" alt="" style={{ paddingBottom:"1rem" }}
          />
        </div>
        <div className="AppHeader">
          
        </div>
          <MessageList messages={this.state.messages} username={this.state.username} focusForm={this.focusForm} />
          <SendMessageForm sendMessage={this.sendMessage} inputRef={ref => {this.SendMessageFormComponent = ref}} />
      </div>
    );
  }
}

export default App;
