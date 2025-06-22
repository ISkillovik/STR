import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LiveEventNav from "../components/LiveEvent/LiveEventNav";
import { useNavigate } from "react-router-dom";
const LiveEventContain = styled.div`
  height: 100%;
`;

const LiveEventTitleDiv = styled.div`
  margin-top: 30px;
  h1 {
    color: white;
  }
`;

type Props = {};

const LiveEvents = (props: Props) => {
  const [event, setEvent] = useState<boolean | null>(null);
  const [eventTitle, setEventTitle] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (event === false) {
      navigate("/");
    }
  }, [event]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "Admin", "event"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setEvent(docSnapshot.data().event);
        setEventTitle(docSnapshot.data().title);
      } else {
        console.log("Document does not exist");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <LiveEventContain>
      {event ? (
        <>
          <LiveEventTitleDiv>
            <h1>{eventTitle}</h1>
          </LiveEventTitleDiv>
          <LiveEventNav />
        </>
      ) : null}
    </LiveEventContain>
  );
};

export default LiveEvents;
