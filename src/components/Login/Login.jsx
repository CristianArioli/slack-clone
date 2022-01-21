import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { LoginContainer, LoginInnerContainer } from "./Login.styled";

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>Se conecte ao Servidor do Clone Slack</h1>
        <p><a href="https://github.com/CristianArioli/slack-clone" target="_blank">Link do Projeto no GitHub</a></p>

        <Button onClick={signIn}> Entrar com o Google </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;
