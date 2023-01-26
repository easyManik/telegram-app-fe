// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // css
// import "../../../pages/Home/chat.css";
// import user from "../../../assets/images/user.png";
// import iconHumberger from "../../../assets/images/Menu.png";
// import newGroup from "../../../assets/images/Newgroup.png";
// import SecretChat from "../../../assets/images/SecretChat.png";
// import NewChannel from "../../../assets/images/Newchannel.png";
// import Settings from "../../../assets/images/Settings.png";
// import Contacts from "../../../assets/images/Contacts.png";
// import calls from "../../../assets/images/calls.png";
// import SaveMessage from "../../../assets/images/SaveMessage.png";
// import Invitefriends from "../../../assets/images/Invitefriends.png";
// import FAQ from "../../../assets/images/FAQ.png";
// import "moment-timezone";

// import SettingChat from "../../../components/module/Chat/Setting/Profile";

// const ChatBar = ({ socket, onClick, handleChat }) => {
//   const [users, setUsers] = useState([]);
//   const [setting, setSetting] = useState(false);
//   const [createChannel, setCreateChannel] = useState(false);
//   const [createOption, setcreateOption] = useState(false);
//   const [icondown, setIcondown] = useState(false);
//   const navigate = useNavigate();
//   //   const [listChat, setListChat] = useState([]);

//   // Create Channel
//   const handleCreateChannel = () => {
//     setCreateChannel(!createChannel);
//     setcreateOption(false);
//   };
//   const handleCreateChannelGruop = () => {
//     alert("on proccess");
//   };
//   // create option
//   const handleOptionMenu = () => {
//     setcreateOption(!createOption);
//     setCreateChannel(false);
//   };
//   const handleSetting = () => {
//     setSetting(true);
//   };
//   const handleBack = () => {
//     setSetting(false);
//     setcreateOption(false);
//   };
//   // edit chat
//   const handleEditChat = () => {
//     setIcondown(!icondown);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   useEffect(() => {
//     // const data = token.data;
//     // setLogin(token);
//     const Url = process.env.REACT_APP_TEKTOK_API;
//     axios
//       .get(`${Url}users/all`)
//       .then((res) => {
//         const users = res.data.data;
//         setUsers(users);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, []);

//   useEffect(() => {
//     socket.on("newUserResponse", (data) => setUsers(data));
//   }, [socket, users]);

//   return (
//     <div className="chat__sidebar">
//       {/* <h2>Open Chat</h2>
//       <div>
//         <h4 className="chat__header">ACTIVE USERS</h4>
//         <div className="chat__users">
//           {users.map((user) => (
//             <p key={user.socketID}>{user.userName}</p>
//           ))}
//         </div>
//       </div> */}
//       <div className="col-lg-4 col-12 aside-left">
//         {setting === false ? (
//           <div>
//             <div className="header-chat d-flex justify-content-between">
//               {createChannel === false ? (
//                 <h1 onClick={handleCreateChannel}>Telegram</h1>
//               ) : (
//                 <div
//                   className="create-channel d-flex justify-content-between"
//                   onClick={handleCreateChannel}
//                 >
//                   <img
//                     onClick={handleCreateChannelGruop}
//                     alt="create channel"
//                     src={newGroup}
//                     width="31"
//                     height="22"
//                   />
//                   <img
//                     src={SecretChat}
//                     alt="create channel"
//                     width="14"
//                     height="22"
//                   />
//                   <img
//                     src={NewChannel}
//                     alt="create channel"
//                     width="20"
//                     height="22"
//                   />
//                 </div>
//               )}
//               <div className="option">
//                 <div className="hamburger">
//                   <img
//                     onClick={handleOptionMenu}
//                     src={iconHumberger}
//                     alt="option"
//                     width="22"
//                     height="18"
//                   />
//                 </div>
//                 {createOption === true ? (
//                   <div className="option-menu">
//                     <div className="d-flex mb-4" onClick={handleSetting}>
//                       <img src={Settings} alt="option" width="22" height="22" />
//                       <p>Setting</p>
//                     </div>
//                     <div className="d-flex mb-4">
//                       <img
//                         src={Contacts}
//                         alt="contact"
//                         width="22"
//                         height="22"
//                       />
//                       <p>Contact</p>
//                     </div>
//                     <div className="d-flex mb-4">
//                       <img src={calls} alt="calls" width="22" height="22" />
//                       <p>Calls</p>
//                     </div>
//                     <div className="d-flex mb-4">
//                       <img
//                         src={SaveMessage}
//                         alt="SaveMessage"
//                         width="22"
//                         height="22"
//                       />
//                       <p>Save messages</p>
//                     </div>
//                     <div className="d-flex mb-4">
//                       <img
//                         src={Invitefriends}
//                         alt="Invitefriends"
//                         width="22"
//                         height="20"
//                       />
//                       <p>Invite Friends</p>
//                     </div>
//                     <div className="d-flex mb-4 ">
//                       <img src={FAQ} alt="FAQ" width="22" height="22" />
//                       <p>Telegram FAQ</p>
//                     </div>
//                     <div className="d-flex " onClick={handleLogout}>
//                       <img src={FAQ} alt="FAQ" width="22" height="22" />
//                       <p>Logout</p>
//                     </div>
//                   </div>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             </div>
//             <div className="fitur-search d-flex">
//               <form className="search">
//                 <span className="fa fa-search icon-search" />
//                 <input type="text" placeholder="Type your message..." />
//               </form>
//               <i className="fa fa-plus icon-plus" />
//             </div>
//             <div className="button-sorting d-flex ">
//               <button className="active" type="submit">
//                 All
//               </button>
//               <button type="submit">Important</button>
//               <button type="submit">Unread</button>
//             </div>
//             <div className="all-list-chatting">
//               {users.map((item, index) => {
//                 //  console.log(item);
//                 return (
//                   <>
//                     <div
//                       className="list-chatting d-flex"
//                       key={item.sender_id}
//                       onClick={handleChat}
//                     >
//                       <img
//                         src={item.image ? item.image : user}
//                         alt="user pict"
//                         width="64"
//                         height="64"
//                         style={{ borderRadius: "25px" }}
//                       />
//                       <div className="ms-3">
//                         <h1 onClick={onClick}>{item.name}</h1>
//                         <p className="last-message">{item.email}</p>
//                       </div>
//                       <div className="detail-time-delivered">
//                         <p>13:02</p>
//                         <div className="icon-notification-delivered d-flex">
//                           <span className="fa fa-check" />
//                           <div>
//                             <span
//                               className="fa fa-angle-down icon-down"
//                               onClick={handleEditChat}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 );
//               })}
//             </div>
//           </div>
//         ) : (
//           <>
//             <SettingChat back={handleBack} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatBar;
