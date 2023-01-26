// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import "../../../pages/Home/chat.css";
// import Profilemenu from "../../../assets/images/Profilemenu.png";
// import calls from "../../../assets/images/calls.png";
// import deleteChat from "../../../assets/images/deleteChat.png";
// import Mute from "../../../assets/images/Mute.png";
// import Search from "../../../assets/images/Search.png";
// import Moment from "react-moment";

// const ChatBody = ({ messages, src, name }) => {
//   const navigate = useNavigate();
//   //   const [detailChat, setDetailChat] = useState({});
//   const [profileMenu, setProfileMenu] = useState(false);

//   const handleChatMenu = () => {
//     setProfileMenu(!profileMenu);
//   };

//   const handleLeaveChat = () => {
//     localStorage.removeItem("username");
//     navigate("/home");
//     window.location.reload();
//   };

//   return (
//     <>
//       <header className="chat__mainHeader">
//         {/* <p>Hangout with Colleagues</p>
//         <button className="leaveChat__btn" onClick={handleLeaveChat}>
//           LEAVE CHAT
//         </button> */}

//         <div className="header-chat-message">
//           <div className="header-chat-profile d-flex">
//             <img
//               src={src}
//               alt="user pict"
//               width="64"
//               height="64"
//               style={{ borderRadius: "25px" }}
//             />
//             <div className="ms-3">
//               <h2>{name}</h2>
//               <p>Online</p>
//             </div>
//             <div className="profile-menu-message">
//               <img
//                 className="profile-menu"
//                 src={Profilemenu}
//                 alt="profile-menu"
//                 width="20"
//                 height="19"
//                 onClick={handleChatMenu}
//               />
//               {profileMenu === false ? (
//                 ""
//               ) : (
//                 <>
//                   <div className="chat-menu">
//                     <div className="d-flex">
//                       <img src={calls} alt="calls" width="22" height="22" />
//                       <p>Call</p>
//                     </div>
//                     <div className="d-flex">
//                       <img
//                         src={deleteChat}
//                         alt="deleteChat"
//                         width="22"
//                         height="22"
//                       />
//                       <p>Delete chat history</p>
//                     </div>
//                     <div className="d-flex">
//                       <img src={Mute} alt="Mute" width="22" height="22" />
//                       <p>Mute notification</p>
//                     </div>
//                     <div className="d-flex">
//                       <img src={Search} alt="Search" width="22" height="22" />
//                       <p>Search</p>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="message__container">
//         {messages.map((item, index) =>
//           item.name === localStorage.getItem("username") ? (
//             <>
//               <div
//                 className="sender d-flex justify-content-end align-items-start"
//                 key={index}
//               >
//                 <p>
//                   <Moment format="DD/MM/LT">{item.post_at}</Moment>
//                 </p>
//                 <div className="chat-message-from ">
//                   <div>{item.text}</div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <div
//                 className="receive d-flex justify-content-start align-items-end"
//                 key={index}
//               >
//                 <div className="chat-message-to ">
//                   <div>{item.text}</div>
//                 </div>
//                 <p>
//                   <Moment format="DD/MM/LT">{item.post_at}</Moment>
//                 </p>
//               </div>
//             </>
//           )
//         )}
//       </div>
//     </>
//   );
// };

// export default ChatBody;
