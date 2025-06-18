import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { DataRacers } from "../../models";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
const RacerDiv = styled(motion.div)`
  margin: 10px;
  padding: 5px;
  background-color: black;
  border: solid 1px red;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 24px;
    color: aliceblue;
  }
`;

type Props = {};

const LiveEventScore = (props: Props) => {
  const [data, setData] = useState<DataRacers>();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "Admin", "event"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        return setData(docSnapshot.data().eventRacers);
      } else {
        console.log("Document does not exist");
      }
    });

    return () => unsubscribe();
  }, []);

  const sortedEntries = data
    ? Object.entries(data).sort((a, b) => b[1].point - a[1].point)
    : [];

  return (
    <div>
      {data ? (
        <AnimatePresence>
          {sortedEntries.map(([key, value]) => (
            <RacerDiv
              key={key}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p>{key}</p>
              <p>{value.racerName}</p>
              <p>{value.carMark}</p>
              <p>{value.motor}</p>
              <p>{value.point}</p>
            </RacerDiv>
          ))}
        </AnimatePresence>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default LiveEventScore;
