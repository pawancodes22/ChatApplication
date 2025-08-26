import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { endpoints } from "../utils/endpoints";
import { ToastContainer, toast, Bounce } from "react-toastify";
import loader from "../assets/loader.gif";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messagesData, setMessagesData] = useState();
  const [didMessagesLoad, setMessagesLoad] = useState(false);
  useEffect(() => {
    const el = msgBar.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesData]);
  const msgBar = useRef(null);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };
  const handleSendMessage = async (msg) => {
    const sendMsgJSON = {
      from: currentUser._id,
      to: currentChat._id,
      msg,
    };
    const response = await axios.post(
      endpoints.addMessageEndpoint,
      sendMsgJSON
    );
    socket.current.emit("send-msg", sendMsgJSON);
    if (response.data.status) {
      // toast.success(response.data.msg, toastOptions);
      getMessagesData();
    } else {
      toast.error("Couldnt send msg!", toastOptions);
    }
  };
  useEffect(() => {
    const messageHandler = (msg) => {
      getMessagesData();
    };
    const currentSocket = socket.current;
    if (currentSocket) {
      currentSocket.on("msg-recieve", messageHandler);
    }
    return () => {
      if (currentSocket) {
        currentSocket.off("msg-recieve", messageHandler);
      }
    };
  }, []);
  const getMessagesData = async () => {
    setMessagesLoad(false);
    const messagesData = await axios.get(
      `${endpoints.getMessagesEndpoint}?senderId=${currentUser._id}&recieverId=${currentChat._id}`
    );
    setMessagesData(messagesData.data);
    setMessagesLoad(true);
  };
  useEffect(() => {
    getMessagesData();
  }, [currentChat]);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={currentChat.avatarImage} alt="" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <Messages
        currentChat={currentChat}
        currentUser={currentUser}
        messagesData={messagesData}
        msgBar={msgBar}
      />
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  height: 100%;
  overflow: auto;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
        .username {
          h3 {
            color: white;
          }
        }
      }
    }
  }
`;
