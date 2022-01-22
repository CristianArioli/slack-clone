import styled from "styled-components";

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
  }

  > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 100px;
`;

const NoRoomSelectedContainer = styled.div`
  display: grid;
  place-items: center;
  height: 87vh;
  text-align: center;
  padding: 30px;
  color: var(--slack-color);

  > div > p {
    font-size: 14px;
  }
`;

export {
  ChatContainer,
  Header,
  HeaderLeft,
  HeaderRight,
  ChatMessages,
  ChatBottom,
  NoRoomSelectedContainer,
};
