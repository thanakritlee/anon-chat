import React, { Component } from 'react';
import { Container } from 'reactstrap';
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
      messages: []
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    var self = this;

    // GET Hello world.
    axios.get('http://localhost:8000/api/hello')
    .then(res => {
      const helloworld = res.data.message;
      this.setState({ helloworld });
    });

    // GET uuid username.
    axios.get("http://localhost:8000/api/username")
    .then(res => {
      const username = res.data.message;
      this.setState({ username });
    })

    // GET chat history.
    axios.get("http://localhost:8000/api/chat-history")
    .then(res => {
      const messages = res.data.messages;
      this.setState({ messages });
    })

    // Listen to websocket.
    this.ws = new WebSocket("ws://localhost:8000/api/ws");
    this.ws.addEventListener("message", (e) => {
      const msg = JSON.parse(e.data);
      const message = {username: msg.username, message: msg.message, timestamp: msg.timestamp};
      const messages = this.state.messages;
      messages.push(message);
      this.setState({ messages });
    });    
  }

  sendMessage(message) {
    const currentMessage = {username: this.state.username, message: message};
    this.ws.send(JSON.stringify(currentMessage));
  }

  render() {
    return (
      <div className="App">
        <Container fluid>
          <MessageList messages={this.state.messages} />
          <SendMessageForm sendMessage={this.sendMessage}/>
        </Container>
      </div>
    );
  }
}

export default App;
