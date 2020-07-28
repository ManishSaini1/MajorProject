import React, { Component } from "react";
import "../chat.css";

class chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typedMessage: "",
    };
  }
  render() {
    const { typedMessage, messages } = this.state;
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img src="https://image.flaticon.com/icons/svg/982/982629.svg" alt="" height={17} />
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? "chat-bubble self-chat"
                  : "chat-bubble other-chat"
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            placeholder="Type here..."
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}></button>
        </div>
      </div>
    );
  }
}

export default chat;
