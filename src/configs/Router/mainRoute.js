import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import Chat from "../../pages/Home/ChatMain";
import Profile from "../../pages/profile";
import io from "socket.io-client";
import Auth from "../../components/base/Auth";
// import ChatPage from "../../components/module/chatSide/ChatPage";

function App() {
  // const socket = io.connect("http://localhost:4000");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!socket && token) {
      //heroku
      const resultSocket = io(process.env.REACT_APP_TEKTOK_API, {
        query: {
          token: token,
        },
        transports: ["websocket", "polling"],
      });
      setSocket(resultSocket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setSocket={setSocket} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setSocket={setSocket} />} />
        {/* <Route path="/chat" element={<ChatPage socket={socket} />}></Route> */}
        <Route
          path="/home"
          element={
            <Auth>
              {" "}
              <Chat socket={socket} />{" "}
            </Auth>
          }
        />
        <Route
          path="/profile"
          element={
            <Auth>
              <Profile />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
