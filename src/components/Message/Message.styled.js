import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  flex: 1;
  word-wrap: break-word;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;
  flex: 0.8;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;

const DeleteMessageContainer = styled.div`
  display: flex;
  flex: 0.2;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;

  > .MuiSvgIcon-root {
    color: #c70000;
    cursor: pointer;
  }
`;

export { MessageContainer, MessageInfo, DeleteMessageContainer };