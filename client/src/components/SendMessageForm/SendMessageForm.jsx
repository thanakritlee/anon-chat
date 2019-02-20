import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';

class SendMessageForm extends Component {

  constructor() {
    super()
    this.state = {
      currentMessage: ""
    }
    this.handleMessageOnChange = this.handleMessageOnChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  handleMessageOnChange(messageEvent) {
    const currentMessage = messageEvent.target.value;
    this.setState({ currentMessage });
  }

  handleSendMessage(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.currentMessage);
    // this.ws.send(JSON.stringify(this.state.currentMessage));
    this.setState({ currentMessage: "" });
  }

  render() {
    return (
      <form 
      onSubmit={this.handleSendMessage}
      className="SendMessageForm" >
        <Row>
          <input
            onChange={this.handleMessageOnChange}
            value={this.state.currentMessage}
            placeholder="Type message here..."
            type="text" />
        </Row>
        <Row>
          <Button onClick={this.handleSendMessage} color="primary" outline >Send</Button>
        </Row>
      </form>
    );
  };
};

export default SendMessageForm;