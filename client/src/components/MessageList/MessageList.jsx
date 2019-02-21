import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './MessageList.css'

class MessageList extends Component {

  componentDidMount() {
    if (this.props.messages.length !== 0) {
      ReactDOM.findDOMNode(this.refs.lastestMessage).focus();
      this.props.focusForm();
    }
  }

  componentDidUpdate() {
    if (this.props.messages.length !== 0) {
      ReactDOM.findDOMNode(this.refs.lastestMessage).focus();
      this.props.focusForm();
    }
  }
  render() {
    return (
      <ul className="MessagesList">
        {this.props.messages.map((message, index) => {
          const className = message.username === this.props.username ? "Message CurrentUser" : "Message";
          if (index === (this.props.messages.length - 1)) {
            return (
              <li className={className} key={message.id}>
                <div>
                  <span
                    className="UserColour"
                    style={{backgroundColor: message.colour}}
                  />  
                </div>
                <div className="MessageContent" ref="lastestMessage" tabindex="0">
                  <div className="Username" >
                    {message.username}
                  </div>
                  <div className="MessageText" >
                    {message.message}
                  </div>
                  <div className="MessageTime" >
                    {new Date(message.timestamp * 1000).toLocaleString('en-GB')}
                  </div>
                </div>
              </li>
            )
          } else {
            return (
              <li className={className} key={message.id}>
                <span
                  className="UserColour"
                  style={{backgroundColor: message.colour}}
                />
                <div className="MessageContent" >
                  <div className="Username" >
                    {message.username}
                  </div>
                  <div className="MessageText" >
                    {message.message}
                  </div>
                  <div className="MessageTime" >
                    {new Date(message.timestamp * 1000).toLocaleString('en-GB')}
                  </div>
                </div>
              </li>
            )
          }
          
        })}
      </ul>
    );
  }
};

export default MessageList;