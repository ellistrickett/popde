import React from 'react';

const Message = ({ message }) => {

  return (
    // isSentByCurrentUser
    // ? (
    //   <div className="messageContainer justifyEnd">
    //     <p className="sentText pr-10">User</p>
    //     <div className="messageBox backgroundBlue">
    //       <p className="messageText colorWhite">{text}</p>
    //     </div>
    //   </div>
    // ) 
    // : (
      <div className="messageContainer justifyStart ">
      <p className="sentText">User</p>
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message}</p>
      </div>
      <p className="sentText pl-10">User</p>
    </div>
    // )
  )
}

export default Message;