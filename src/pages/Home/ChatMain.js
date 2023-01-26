import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./chat.css";
import Assets from "../../images";
import Moment from "react-moment";
import "moment-timezone";
import SettingChat from "../../components/module/Chat/Setting/Profile";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { userProfile } from "../../configs/redux/action/user";
import { useDispatch } from "react-redux";

function ChatList({ socket }) {
  // console.log(socket);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [createChannel, setCreateChannel] = useState(false);
  const [createOption, setcreateOption] = useState(false);
  const [chat, setChat] = useState(false);
  const [icondown, setIcondown] = useState(false);
  const [setting, setSetting] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({});
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    phone: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const Url = process.env.REACT_APP_TEKTOK_API;
    axios
      .get(`${Url}users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const users = res.data.data;
        setFriends(users);
      });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.off("newMessage");
      socket.on("newMessage", (message) => {
        setMessages((current) => [...current, message]);
        console.log(message);
      });
    }
  }, [socket]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const Url = process.env.REACT_APP_TEKTOK_API;
    axios
      .get(`${Url}message/${friend.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const messages = res.data.data;
        setMessages(messages);
      });
  }, [friend]);

  useEffect(() => {
    dispatch(userProfile()).then((res) => {
      setProfile(res);
    });
  }, [dispatch]);

  // Create Channel
  const handleCreateChannel = () => {
    setCreateChannel(!createChannel);
    setcreateOption(false);
  };
  const handleCreateChannelGruop = () => {
    alert("on proccess");
  };
  // create option
  const handleOptionMenu = () => {
    setcreateOption(!createOption);
    setCreateChannel(false);
  };
  const handleSetting = () => {
    setSetting(true);
  };
  const handleBack = () => {
    setSetting(false);
    setcreateOption(false);
  };
  // edit chat
  const handleEditChat = () => {
    setIcondown(!icondown);
  };
  // create chat
  const handleChat = (data) => {
    setChat(true);
  };

  // chat menu
  const handleChatMenu = () => {
    setProfileMenu(!profileMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSendMessage = () => {
    if (socket && message) {
      // console.log(socket);
      console.log("mulai");
      socket.emit(
        "sendMessage",
        {
          idReceiver: friend.id,
          idSender: socket.userId,
          messageBody: message,
        },
        (message) => {
          setMessages((current) => [...current, message]);
        }
      );
      console.log("berhasil send message");
    }
    setMessage("");
  };
  const chooseFriend = (friend) => {
    setFriend(friend);
  };

  return (
    <div className="chatroom">
      <div className="row">
        <div className="col-lg-4 col-12 aside-left">
          {setting === false ? (
            <div>
              <div className="header-chat d-flex justify-content-between">
                {createChannel === false ? (
                  <h1 onClick={handleCreateChannel}>TalagramChat</h1>
                ) : (
                  <div
                    className="create-channel d-flex justify-content-between"
                    onClick={handleCreateChannel}
                  >
                    <img
                      onClick={handleCreateChannelGruop}
                      alt="create channel"
                      src={Assets.newGroup}
                      width="31"
                      height="22"
                    />
                    <img
                      src={Assets.SecretChat}
                      alt="create channel"
                      width="14"
                      height="22"
                    />
                    <img
                      src={Assets.NewChannel}
                      alt="create channel"
                      width="20"
                      height="22"
                    />
                  </div>
                )}
                <div className="option">
                  <div className="hamburger">
                    <img
                      onClick={handleOptionMenu}
                      src={Assets.iconHumberger}
                      alt="option"
                      width="22"
                      height="18"
                    />
                  </div>
                  {createOption === true ? (
                    <div className="option-menu">
                      <div className="d-flex mb-4" onClick={handleSetting}>
                        <img
                          src={Assets.Settings}
                          alt="option"
                          width="22"
                          height="22"
                        />
                        <p>Setting</p>
                      </div>
                      <div className="d-flex mb-4">
                        <img
                          src={Assets.Contacts}
                          alt="contact"
                          width="22"
                          height="22"
                        />
                        <p>Contact</p>
                      </div>
                      <div className="d-flex mb-4">
                        <img
                          src={Assets.calls}
                          alt="calls"
                          width="22"
                          height="22"
                        />
                        <p>Calls</p>
                      </div>
                      <div className="d-flex mb-4">
                        <img
                          src={Assets.SaveMessage}
                          alt="SaveMessage"
                          width="22"
                          height="22"
                        />
                        <p>Save messages</p>
                      </div>
                      <div className="d-flex mb-4">
                        <img
                          src={Assets.Invitefriends}
                          alt="Invitefriends"
                          width="22"
                          height="20"
                        />
                        <p>Invite Friends</p>
                      </div>
                      <div className="d-flex mb-4 ">
                        <img
                          src={Assets.FAQ}
                          alt="FAQ"
                          width="22"
                          height="22"
                        />
                        <p>Telegram FAQ</p>
                      </div>
                      <div className="d-flex " onClick={handleLogout}>
                        <img
                          src={Assets.FAQ}
                          alt="FAQ"
                          width="22"
                          height="22"
                        />
                        <p>Logout</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="d-flex flex-column">
                <div className="d-flex justify-content-center ">
                  <img
                    src={profile.image}
                    alt="profile"
                    width={150}
                    height={150}
                    style={{ borderRadius: "100%" }}
                  />
                </div>
                <h5 className="d-flex justify-content-center mt-2">
                  <b>{profile.name}</b>
                </h5>
                <p
                  className="d-flex justify-content-center mt-2"
                  style={{ color: "grey" }}
                >
                  @{profile.username}
                </p>
              </div>

              <div className="p-5 d-flex justify-content-between" width="100%">
                <form className="search my-4  ">
                  <input type="text" placeholder="Type your message..." />
                </form>
                <img
                  src={Assets.plus}
                  alt="plus"
                  height={30}
                  width={30}
                  className="d-flex align-self-center mx-5 "
                />
              </div>
              <div className="all-list-chatting">
                {friends.length > 1
                  ? friends.map((item, index) => {
                      //  console.log(item);
                      return (
                        <>
                          <div
                            className="list-chatting d-flex"
                            key={index}
                            onClick={() => handleChat()}
                          >
                            <img
                              src={item.image ? item.image : Assets.user}
                              alt="user pict"
                              width="64"
                              height="64"
                              style={{ borderRadius: "25px" }}
                            />
                            <div className="ms-3">
                              <h1 onClick={() => chooseFriend(item)}>
                                {item.name}
                              </h1>
                              <p className="last-message">
                                {item.username ? `@${item.username} ` : "..."}
                              </p>
                            </div>
                            <div className="detail-time-delivered">
                              <p>12.50</p>
                              <div className="icon-notification-delivered d-flex">
                                <span className="fa fa-check" />
                                <div>
                                  <span
                                    className="fa fa-angle-down icon-down"
                                    onClick={handleEditChat}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : ""}
              </div>
            </div>
          ) : (
            <>
              <SettingChat back={handleBack} />
            </>
          )}
        </div>

        {/* aside right */}
        <div className="col aside-right ">
          {chat === false ? (
            <h1>start messaging</h1>
          ) : (
            <>
              <div className="aside-chatting">
                <div className="header-chat-message">
                  <div className="header-chat-profile d-flex">
                    <img
                      src={friend.image ? friend.image : Assets.user}
                      alt="user pict"
                      width="64"
                      height="64"
                      style={{ borderRadius: "25px" }}
                    />
                    <div className="ms-3">
                      <h2>{friend.name ? friend.name : "friend"}</h2>
                      <p>Online</p>
                    </div>
                    <div className="profile-menu-message">
                      <img
                        className="profile-menu"
                        src={Assets.Profilemenu}
                        alt="profile-menu"
                        width="20"
                        height="19"
                        onClick={handleChatMenu}
                      />
                      {profileMenu === false ? (
                        ""
                      ) : (
                        <>
                          <div className="chat-menu">
                            <div className="d-flex">
                              <img
                                src={Assets.calls}
                                alt="calls"
                                width="22"
                                height="22"
                              />
                              <p>Call</p>
                            </div>
                            <div className="d-flex">
                              <img
                                src={Assets.deleteChat}
                                alt="deleteChat"
                                width="22"
                                height="22"
                              />
                              <p>Delete chat history</p>
                            </div>
                            <div className="d-flex">
                              <img
                                src={Assets.Mute}
                                alt="Mute"
                                width="22"
                                height="22"
                              />
                              <p>Mute notification</p>
                            </div>
                            <div className="d-flex">
                              <img
                                src={Assets.Search}
                                alt="Search"
                                width="22"
                                height="22"
                              />
                              <p>Search</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* isi chat */}
                <div className="messages-user ">
                  {messages.map((item, index) =>
                    item.receiver_id === friend.id ? (
                      <>
                        <div
                          className="sender d-flex justify-content-end align-items-start"
                          key={index}
                        >
                          <p>
                            <Moment format="DD/MM/LT">{item.post_at}</Moment>
                          </p>
                          <div className="chat-message-from ">
                            <div>{item.message}</div>
                          </div>
                        </div>
                      </>
                    ) : item.receiver_id !== friend.id ? (
                      <>
                        <div
                          className="receive d-flex justify-content-start align-items-end"
                          key={index}
                        >
                          <div className="chat-message-to ">
                            <div>{item.message}</div>
                          </div>
                          <p>
                            <Moment format="DD/MM/LT">{item.post_at}</Moment>
                          </p>
                        </div>
                      </>
                    ) : (
                      ""
                    )
                  )}
                </div>

                <div className="footer-chat-message d-flex">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    name="chat"
                    id="chat"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="icon-chat d-flex">
                    {/* <i className="fa fa-plus" />
                                    <i className="fa fa-grin-alt" /> */}
                    {/* <img src={inputchat} alt="inputchat" /> */}
                  </div>
                  <div className="send-message">
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: "10px",
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatList;
