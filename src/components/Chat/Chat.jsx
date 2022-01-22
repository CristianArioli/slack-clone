import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectRoomId } from "../../features/appSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import ChatInput from "../ChatInput/ChatInput";
import Message from "../Message/Message";
import Spinner from "react-spinkit";
import {
  ChatContainer,
  Header,
  HeaderLeft,
  HeaderRight,
  ChatMessages,
  ChatBottom,
  NoRoomSelectedContainer,
} from "./Chat.styled";

function Chat() {
  const [user] = useAuthState(auth);

  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);

  const [roomIdHasChanged, setRoomIdHasChanged] = useState(false);

  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  const renderWelcomeOrSpinner = () => {
    if (!roomIdHasChanged) {
      return (
        <NoRoomSelectedContainer>
          <div>
            <h2>Bem-Vindo(a) {user.displayName}</h2>
            <p>Para começar, selecione ou crie um novo canal!</p>
            <p>Ah, o chat funciona em tempo real! 😉</p>
          </div>
        </NoRoomSelectedContainer>
      );
    }
    return (
      <NoRoomSelectedContainer>
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </NoRoomSelectedContainer>
    );
  };

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading, roomMessages]);

  useEffect(() => {
    roomId ? setRoomIdHasChanged(true) : setRoomIdHasChanged(false);
  }, [roomId]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages ? (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  messageId={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      ) : (
        renderWelcomeOrSpinner()
      )}
    </ChatContainer>
  );
}

export default Chat;
