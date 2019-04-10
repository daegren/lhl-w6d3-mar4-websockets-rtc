import React, { Component } from "react";
import "./App.css";
import MessageList from "./Components/MessageList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: ""
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://172.46.3.137:8080");
    this.socket.onopen = () => console.log("Client connected to socket server");
    this.socket.onmessage = this._handleServerMessage;
  }

  render() {
    return (
      <div className="App">
        <header>
          <input
            type="text"
            value={this.state.newMessage}
            onChange={this._handleTextChange}
          />
          <button onClick={this._sendMessage}>Send</button>
        </header>
        <div>
          <MessageList messages={this.state.messages} />
        </div>
      </div>
    );
  }

  _sendMessage = () => {
    if (this.state.newMessage) {
      const message = { msg: this.state.newMessage };
      this.socket.send(JSON.stringify(message));

      this.setState({ newMessage: "" });
    }
  };

  _handleTextChange = e => {
    this.setState({ newMessage: e.target.value });
  };

  _handleServerMessage = e => {
    // TODO: Handle message from server
    const message = JSON.parse(e.data);

    this.setState({ messages: [message, ...this.state.messages] });
    // this.setState(prevState => ({
    //   ...prevState,
    //   messages: [message, ...prevState.messages]
    // }));
  };
}

export default App;
