import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { enterRoom } from "../../features/appSlice";
import {
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons/";
import { SidebarOptionContainer, SidebarOptionChannel } from "./SidebarOption.styled";

function SidebarOption({
  IconProps,
  titleProps,
  actionOption,
  id,
  isHidden,
  setIsHidden,
}) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const [channels] = useCollection(db.collection("rooms"));
  
  const [title, setTitle] = useState(titleProps);
  const [Icon, setIcon] = useState(IconProps);

  const addChannel = () => {
    const channelName = prompt("Digite o nome do canal a ser inserido");

    if (channelName) {
      const channelExists = channels?.docs.find((doc) => {
        const { name } = doc.data();
        return name.toLowerCase() === channelName.toLowerCase();
      });

      if (!channelExists) {
        db.collection("rooms").add({
          name: channelName.trim(),
          admin: user.displayName,
        }).then(docRef => dispatch(
          enterRoom({
            roomId: docRef.id,
          })
        ));
      } else {
        alert("Nome já utilizado em outro canal");
      }
    }
  };

  const removeChannel = async () => {
    const channelName = prompt("Digite o nome do canal a ser removido");

    let channelId;
    let channelAdmin;

    if (channelName) {
      const channelExists = channels?.docs.find((doc) => {
        const { name, admin } = doc.data();
        if (name.toLowerCase() === channelName.toLowerCase()) {
          channelId = doc.id;
          channelAdmin = admin;
          return true;
        }
      });

      if (channelAdmin === user.displayName && channelExists && channelId) {
        db.collection("rooms").doc(channelId).delete();
        dispatch(
          enterRoom({
            roomId: null,
          })
        );
      } else if( channelAdmin !== user.displayName ) {
        alert("Você não é dono desse canal");
      } else{
        alert("Nome de canal não existente")
      };
    }
  };

  const collapseSidebarOptions = () => {
    isHidden ? setTitle("Mostrar Menos") : setTitle("Mostrar Mais");
    isHidden ? setIcon(ExpandLess) : setIcon(ExpandMore);
    setIsHidden(!isHidden);
  };

  const selectChannel = () => {
    if (id) {
      let channelAdmin;

      channels?.docs.find((doc) => {
        const { admin } = doc.data();
        if (doc.id === id) {
          channelAdmin = admin;
          return true;
        }
      });
      
      dispatch(
        enterRoom({
          roomId: id,
          roomAdmin: channelAdmin,
        })
      );
    }
  };

  return (
    <SidebarOptionContainer
      actionOption={actionOption}
      isHidden={isHidden}
      onClick={() => {
        switch (actionOption) {
          case "add":
            addChannel();
            break;

          case "remove":
            removeChannel();
            break;

          case "collapse":
            collapseSidebarOptions();
            break;

          default:
            selectChannel();
            break;
        }
      }}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

export default SidebarOption;
