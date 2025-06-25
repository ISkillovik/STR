import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { DataRacers } from "../../models";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery, useTheme } from "@mui/material";

const ExtraContent = styled(motion.div)`
  width: 100%;
  background: #1a1a1a;
  border-radius: 6px;
  padding: 10px 20px;
  margin-top: 8px;
  color: white;
  font-size: 16px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const RacerDiv = styled(motion.div)`
  align-items: center;
  width: 100%;
  margin: 5px 0;
  padding: 5px 0;
  background-color: #00000081;
  border-radius: 6px;
  border: solid 2px #000000;
  display: flex;
  justify-content: space-between;
`;

const RacersListUL = styled.ul`
  counter-reset: item;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 5px 0;
  }

  li::before {
    padding-top: 8px;
    margin-left: 5px;
    counter-increment: item;
    content: counter(item) ".";
    position: absolute;
    left: -35px;
    font-weight: bold;
    font-size: 22px;
    color: white;
  }
`;

const ExampDetails = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px red;
  padding: 10px 0;
  margin-bottom: 5px;
`;

const Column = styled.p`
  font-size: 20px;
  color: aliceblue;
  width: 18%;
  text-align: center;
  margin: 0;
  white-space: nowrap; /* Чтобы не переносились слова */

  @media (max-width: 600px) {
    font-size: 16px; /* Немного меньше шрифт */
    width: 22%; /* Уменьшим ширину колонок для мобильных */
    padding: 0 4px;
  }
`;

type Props = {};

const LiveEventScore = (props: Props) => {
  const [data, setData] = useState<DataRacers>();
  const [dataType, setDataType] = useState<string>();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const checkEventPointsType = () => {
    if (dataType && dataType === "drag") {
      return <Column>Best Time</Column>;
    } else {
      return <Column>Points</Column>;
    }
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "Admin", "event"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        return setDataType(docSnapshot.data().rules);
      } else {
        console.log("Document does not exist");
      }
    });

    return () => unsubscribe();
  }, []);

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

  const toggleOpen = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };
  return (
    <div style={{ width: "95%", margin: "0 auto", minHeight: "500px" }}>
      {isMobile ? (
        <ExampDetails>
          <Column>No</Column>
          <Column>Name</Column>

          {checkEventPointsType()}
        </ExampDetails>
      ) : (
        <ExampDetails>
          <Column>No</Column>
          <Column>Name</Column>
          <Column>Car</Column>
          <Column>Engin</Column>
          {checkEventPointsType()}
        </ExampDetails>
      )}

      {data ? (
        <AnimatePresence>
          <RacersListUL>
            {isMobile
              ? sortedEntries.map(([key, value]) => (
                  <li key={key}>
                    <RacerDiv
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => toggleOpen(key)}
                    >
                      <Column>{key}</Column>
                      <Column>{value.racerName}</Column>
                      <Column>{value.point}</Column>
                    </RacerDiv>

                    <AnimatePresence>
                      {openKey === key && (
                        <ExtraContent
                          layout
                          key="extra"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p>
                            <strong>Цвет:</strong> {value.carColor}
                          </p>
                          <p>
                            <strong>Номер:</strong> {value.carNum}
                          </p>
                          <p>
                            <strong>Группа:</strong> {value.group}
                          </p>
                        </ExtraContent>
                      )}
                    </AnimatePresence>
                  </li>
                ))
              : sortedEntries.map(([key, value]) => (
                  <li key={key}>
                    <RacerDiv
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => toggleOpen(key)}
                    >
                      <Column>{key}</Column>
                      <Column>{value.racerName}</Column>
                      <Column>{value.carMark}</Column>
                      <Column>{value.motor}</Column>
                      <Column>{value.point}</Column>
                    </RacerDiv>

                    <AnimatePresence>
                      {openKey === key && (
                        <ExtraContent
                          layout
                          key="extra"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p>
                            <strong>Цвет:</strong> {value.carColor}
                          </p>
                          <p>
                            <strong>Номер:</strong> {value.carNum}
                          </p>
                          <p>
                            <strong>Группа:</strong> {value.group}
                          </p>
                        </ExtraContent>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
          </RacersListUL>
        </AnimatePresence>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default LiveEventScore;
