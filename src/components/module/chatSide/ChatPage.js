// import React, { useEffect, useState } from "react";
// import ChatBar from "./ChatBar";
// import ChatBody from "./ChatBody";
// import ChatFooter from "./ChatFooter";
// import user from "../../../assets/images/user.png";
// import axios from "axios";

// const ChatPage = ({ socket }) => {
//   const [messages, setMessages] = useState([]);
//   const [detailChat, setDetailChat] = useState({});
//   const [chat, setChat] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChat = (data) => {
//     setChat(true);
//   };
//   const chooseFriend = (item) => {
//     setDetailChat(item);
//   };
//   const token = localStorage.getItem("token");

//   const tokennya = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   useEffect(() => {
//     const Url = process.env.REACT_APP_TEKTOK_API;
//     console.log(Url);
//     console.log(detailChat.id);
//     axios.get(`${Url}message/${detailChat.id}`, tokennya).then((res) => {
//       const data = res.data.data;
//       setMessage(data);
//       console.log(data);
//     });
//   }, [detailChat]);

//   useEffect(() => {
//     socket.on("messageResponse", (data) => setMessages([...messages, data]));
//   }, [socket, messages]);

//   return (
//     <div className="chatroom">
//       <div className="row">
//         <ChatBar
//           socket={socket}
//           onClick={() => chooseFriend(detailChat)}
//           handleChat={() => handleChat()}
//         />
//         <div className="col aside-right">
//           {chat === false ? (
//             <h1>start chat</h1>
//           ) : (
//             <>
//               <div className="aside-chatting">
//                 <ChatBody
//                   messages={messages}
//                   src={detailChat.image ? detailChat.image : "user"}
//                   name={detailChat.name ? detailChat.name : "friend"}
//                 />
//                 <ChatFooter socket={socket} />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
