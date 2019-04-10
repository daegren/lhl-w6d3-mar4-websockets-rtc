import React from "react";

const MessageList = props => (
  <ul>
    {props.messages.map(({ message, id }) => (
      <li key={id}>{message}</li>
    ))}
  </ul>
);
export default MessageList;
