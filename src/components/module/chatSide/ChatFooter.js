// import React, { useState } from "react";

// const ChatFooter = ({ socket }) => {
//   const [message, setMessage] = useState("");

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim() && localStorage.getItem("username")) {
//       socket.emit("message", {
//         text: message,
//         name: localStorage.getItem("username"),
//         id: `${socket.id}${Math.random()}`,
//         socketID: socket.id,
//       });
//     }
//     setMessage("");
//   };
//   return (
//     <div className="chat__footer">
//       <form
//         className="form footer-chat-message d-flex"
//         onSubmit={handleSendMessage}
//       >
//         <input
//           type="text"
//           placeholder="Type your message..."
//           //   className="message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <div className="send-message">
//           <button type="submit">
//             <i className="fa fa-paper-plane send-message" />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatFooter;
