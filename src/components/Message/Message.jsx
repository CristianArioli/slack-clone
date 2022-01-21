import React from "react";
import { useSelector } from "react-redux";
import { selectRoomId, selectRoomAdmin } from "../../features/appSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { Delete } from "@material-ui/icons/";
import {
  MessageContainer,
  MessageInfo,
  DeleteMessageContainer,
} from "./Message.styled";

function Message({ messageId, message, timestamp, user, userImage }) {
  const [userLogged] = useAuthState(auth);

  const roomId = useSelector(selectRoomId);
  const roomAdmin = useSelector(selectRoomAdmin);

  const deleteMessage = () => {
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .doc(messageId)
      .delete();
  };

  return (
    <MessageContainer>
      <img src={userImage} alt="" />
      <MessageInfo>
        <h4>
          {user}
          <span>
            {new Date(timestamp?.toDate()).toLocaleString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
      {(userLogged.displayName === user || userLogged.displayName === roomAdmin) && (
        <DeleteMessageContainer>
          <Delete onClick={deleteMessage} />
        </DeleteMessageContainer>
      )}
    </MessageContainer>
  );
}

export default Message;
