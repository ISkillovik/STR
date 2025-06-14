import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import EventControle from "../components/EventContole";

type Props = {};

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
        <>
          <input
            value={email}
            type="mail"
            placeholder="Mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <input
            value={pass}
            type="password"
            placeholder="Pass"
            onChange={(e) => setPass(e.target.value)}
          ></input>
          <button onClick={() => handleLogin(email, pass)}>LOGIN</button>
        </>
      )}
    </>
  );
};

export default LoginStrAdm;
