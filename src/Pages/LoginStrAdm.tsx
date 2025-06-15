import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import EventControle from "../components/EventContole";
import styled from "styled-components";

type Props = {};

const LogContain = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const LogINput = styled.input`
  padding: 5px;
  font-size: 16px;
  margin: 20px 0;
  height: 40px;
  width: 300px;
`;

const LogBtn = styled.button`
  margin: 20px 0;
  height: 40px;
  width: 300px;
`;

const LoginStrAdm = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [userAuth, setUserAuth] = useState<boolean>(false);

  const handleLogin = (email: string, password: string): void => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user, localStorage.getItem("Admin"));
      })
      .catch((error) => {
        console.log("err");

        console.log(userAuth);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Пользователь авторизован:", user.email);
        setUserAuth(true);
      } else {
        console.log("Пользователь не авторизован");
        setUserAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {userAuth ? (
        <EventControle />
      ) : (
        <LogContain>
          <LogINput
            value={email}
            type="mail"
            placeholder="Mail"
            onChange={(e) => setEmail(e.target.value)}
          ></LogINput>

          <LogINput
            value={pass}
            type="password"
            placeholder="Pass"
            onChange={(e) => setPass(e.target.value)}
          ></LogINput>
          <LogBtn onClick={() => handleLogin(email, pass)}>LOGIN</LogBtn>
        </LogContain>
      )}
    </>
  );
};

export default LoginStrAdm;
