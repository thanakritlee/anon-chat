import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SendMessageForm.css'

class SendMessageForm extends Component {

  constructor() {
    super()
    this.state = {
      currentMessage: ""
    }
    this.handleMessageOnChange = this.handleMessageOnChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  componentDidMount() {
    this.props.inputRef(this);
  }

  handleMessageOnChange(messageEvent) {
    const currentMessage = messageEvent.target.value;
    this.setState({ currentMessage });
  }

  handleSendMessage(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.currentMessage);
    this.setState({ currentMessage: "" });
  }

  focusInput() {
    ReactDOM.findDOMNode(this.refs.inputRef).focus();
  }

  render() {
    return (
      <div >
        <form 
        onSubmit={this.handleSendMessage}>
            <input
              autoFocus={true}
              ref="inputRef"
              tabindex="0"
              onChange={this.handleMessageOnChange}
              value={this.state.currentMessage}
              placeholder="Type message here..."
              type="text" />
            <button onClick={this.handleSendMessage} >Send</button>
        </form>
      </div>
    );
  };
};

export default SendMessageForm;