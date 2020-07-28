import React, { Component } from "react";
import "../chat.css";
import { connect } from "react-redux";
import io from "socket.io-client";

class chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typedMessage: "",
    };

    this.socket = io.connect("http://54.237.158.65:5000");
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setUpConnection();
    }
  }
  setUpConnection = () => {
    const socketConnection = this.socket;
    const self = this;
    this.socket.on("connect", function () {
      console.log("Connection Established");
      socketConnection.emit("join_room", {
        user_email: this.userEmail,
        chatroom: "codeial",
      });
      socketConnection.on("user_joined", function (data) {
        console.log("New User Joined", data);
        console.log("Inside the function", this);
      });
    });
    this.socket.on("receive_message", function (data) {
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;
      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }
      self.setState({
        messages: [...messages, messageObject],
        typedMessage: "",
      });
    });
  };
  handleSubmit = () => {
    // Set-Cookie: flavor=choco; SameSite=None; Secure;
    console.log("Inside the Chat Function handleSubmit");
    const { typedMessage } = this.state;
    if (typedMessage && this.userEmail) {
      this.socket.emit("send_message", {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: "codeial",
      });
    }
  };
  render() {
    const { typedMessage, messages } = this.state;
  
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://image.flaticon.com/icons/svg/982/982629.svg"
            alt=""
            height={17}
          />
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

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(chat);
