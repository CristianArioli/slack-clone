import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  FiberManualRecord,
  Create,
  InsertComment,
  Drafts,
  BookmarkBorder,
  PeopleAlt,
  Apps,
  FileCopy,
  ExpandLess,
  Add,
  Remove,
} from "@material-ui/icons/";
import SidebarOption from "../SidebarOption/SidebarOption";
import { SidebarContainer, SidebarHeader, SidebarInfo } from "./Sidebar.styled";

function Sidebar() {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);

  const [isHidden, setIsHidden] = useState(false);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Slack Clone</h2>
          <h3>
            <FiberManualRecord />
            {user.displayName}
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>

      <SidebarOption IconProps={Apps} titleProps="Apps" />
      <SidebarOption IconProps={InsertComment} titleProps="Conversas" />
      <SidebarOption
        IconProps={Drafts}
        titleProps="Itens Salvos"
        isHidden={isHidden}
      />
      <SidebarOption
        IconProps={BookmarkBorder}
        titleProps="Seletor de Canais"
        isHidden={isHidden}
      />
      <SidebarOption
        IconProps={PeopleAlt}
        titleProps="Pessoas e Grupos"
        isHidden={isHidden}
      />
      <SidebarOption
        IconProps={FileCopy}
        titleProps="Explorador de Arquivos"
        isHidden={isHidden}
      />
      <SidebarOption
        IconProps={ExpandLess}
        actionOption={"collapse"}
        titleProps="Mostrar Menos"
        isHidden={isHidden}
        setIsHidden={setIsHidden}
      />
      <hr />
      <SidebarOption
        IconProps={Add}
        actionOption={"add"}
        titleProps="Adicionar Canal"
      />
      <SidebarOption
        IconProps={Remove}
        actionOption={"remove"}
        titleProps="Remover Canal"
      />

      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} titleProps={doc.data().name} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;
