import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LiveEventNav from "../components/LiveEvent/LiveEventNav";
const LiveEventContain = styled.div`
  height: 92vh;
`;

const LiveEventTitleDiv = styled.div`
  margin-top: 30px;
`;

type Props = {};

const LiveEvents = (props: Props) => {
  const [event, setEvent] = useState<boolean | null>(null);
  const [eventTitle, setEventTitle] = useState<string>("");

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
      ) : (
        <div> no event</div>
      )}
    </LiveEventContain>
  );
};

export default LiveEvents;
