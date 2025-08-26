import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";

export default function ChatInput({ handleSendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (emoji, event) => {
    console.log("emoji is", emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    handleSendMessage(msg);
    setMsg("");
  };

  return (
    <Container>
      <div className="button">
        <div className="emoji" onClick={handleEmojiPickerHideShow}>
          <BsEmojiSmile />
          {showEmojiPicker && (
            <div onClick={(e) => e.stopPropagation()}>
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder={"Type your message here"}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0.2rem;
  padding-bottom: 0.3rem;
  .button {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #f0f70c;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -470px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .epr-emoji-category-label {
          background-color: gray;
          color: white;
        }
        .epr-search-container {
          input {
            background-color: transparent;
          }
        }
        .epr-body {
          &::-webkit-scrollbar {
            width: 6px;
          }
          &::-webkit-scrollbar-thumb {
            background: #9186f3;
            border-radius: 10px;
          }
        }
        .epr-btn:hover {
          background: #9186f3;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      outline: none;
      &::selection {
        background-color: #9186f3;
      }
    }
    button {
      transition: 0.2s ease-in-out;
      cursor: pointer;
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9186f3;
      border: none;
      svg {
        color: white;
        font-size: 2rem;
      }
      &:hover {
        filter: brightness(140%) saturate(200%);
      }
    }
  }
`;
