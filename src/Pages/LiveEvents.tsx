import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import styled from "styled-components";

const LiveEventContain = styled.div`
  height: 92vh;
`;

type Props = {};

const LiveEvents = (props: Props) => {
  const [event, setEvent] = useState<boolean | null>(null);
  const [eventTitle, setEventTitle] = useState<string>("");
  const unsubscribe = onSnapshot(doc(db, "Admin", "event"), (docSnapshot) => {
    if (docSnapshot.exists()) {
      setEvent(docSnapshot.data().event);
      setEventTitle(docSnapshot.data().title);
    } else {
      console.log("Document does not exist");
    }
  });

  return (
    <LiveEventContain>
      {event ? (
        <div>
          <h1>{eventTitle}</h1>
        </div>
      ) : (
        <div> no event</div>
      )}
    </LiveEventContain>
  );
};

export default LiveEvents;
