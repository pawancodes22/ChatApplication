import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { endpoints } from "../utils/endpoints";
import { host } from "../utils/endpoints";
import axios from "axios";
import Contacts from "../components/Contacts";
import { getAuthDetails } from "../utils/authDetails";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import { useRef } from "react";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();
  const socket = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const authData = getAuthDetails();
    if (!authData) {
      navigate("/login");
    } else {
      setCurrentUser(authData);
    }
  }, [navigate]);
  useEffect(() => {
    const fetchAllUsersData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const allUsersData = await axios.get(
            `${endpoints.allUsersEndpoint}/${currentUser._id}`
          );
          setContacts(allUsersData?.data?.users);
        } else {
          navigate("/setAvatar");
        }
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
    };
    fetchAllUsersData();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          handleChatChange={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  color: white;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
