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
    // const IP = process.env.IP;
    const IP = "localhost";

    // GET uuid username.
    axios.get("http://" + IP + ":3001/api/username")
    .then(res => {
      const username = res.data.username;
      this.setState({ username });
    });

    // GET user colour.
    axios.get("http://" + IP + ":3001/api/colour")
    .then(res => {
      const colour = res.data.colour;
      this.setState({ colour });
    });

    // GET chat history.
    axios.get("http://" + IP + ":3001/api/chat-history")
    .then(res => {
      const messages = res.data.messages;
      this.setState({ messages });
    });

    // Listen to websocket.
    this.ws = new WebSocket("ws://" + IP + ":3001/api/ws");
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
        </div>
          <MessageList messages={this.state.messages} username={this.state.username} focusForm={this.focusForm} />
          <SendMessageForm sendMessage={this.sendMessage} inputRef={ref => {this.SendMessageFormComponent = ref}} />
      </div>
    );
  }
}

export default App;
