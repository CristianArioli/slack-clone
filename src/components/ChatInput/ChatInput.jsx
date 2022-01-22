import React, { useRef } from "react";
import { db, firebase, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@material-ui/core";
import { ChatInputContainer } from "./ChatInput.styled";

function ChatInput({ channelName, channelId }) {
  const inputRef = useRef(null);
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    inputRef.current.value = "";
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          ref={inputRef}
          type="text"
          placeholder={`Mensagem #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          ENVIAR
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;
