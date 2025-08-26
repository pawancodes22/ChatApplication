import React from "react";
import styled from "styled-components";

export default function Messages({
  messagesData,
  currentChat,
  currentUser,
  msgBar,
}) {
  return (
    <Container ref={msgBar}>
      {messagesData?.map((item) => {
        const didSend = item.sender === currentUser._id;

        return (
          <MessagerDiv key={item._id} didSend={didSend}>
            <div>
              <p>{item.message.text}</p>
            </div>
          </MessagerDiv>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  height: 80%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #9186f3;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #bbb2f7;
  }
`;

const MessagerDiv = styled.div`
  display: flex;
  justify-content: ${(props) => (props.didSend ? "end" : "start")};
  div {
    background-color: #0a1752;
    padding: 10px;
    border-radius: 5px;
    max-width: 50%;
    line-height: 1.4rem;
  }
`;
