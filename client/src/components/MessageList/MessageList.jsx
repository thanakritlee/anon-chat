import React, { Component } from 'react';

class MessageList extends Component {
  render() {
    return (
      <ul className="MessageList">
        {this.props.messages.map(message => {
          return (
            <li key={message.id}>
              <div>
                {message.username}
              </div>
              <div>
                {new Date(message.timestamp * 1000).toLocaleString('en-GB')}
              </div>
              <div>
                {message.message}
              </div>
            </li>
          )
        })}
      </ul>
    );
  }
};

export default MessageList;