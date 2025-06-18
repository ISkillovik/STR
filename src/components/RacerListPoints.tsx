import { useState, useEffect } from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
import { DataRacers } from "../models";
type Props = {};

const RacerDiv = styled.div`
  margin: 10px;
  background-color: black;
  border: solid 1px red;
  display: flex;
  justify-content: space-between;
  button {
    width: 100px;
  }
  input {
    width: 250px;
    height: 50px;
  }
`;

const RacerDivInfo = styled.div`
  padding: 5px;
  width: 70%;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 24px;
    color: aliceblue;
  }
`;

const RacerListPoints = (props: Props) => {
  const [point, setPoint] = useState<{ [key: string]: number | undefined }>({});
  const [data, setData] = useState<DataRacers>();

  const handleChange = (key: string, newValue: string) => {
    setPoint((prev) => ({
      ...prev,
      [key]: newValue === "" ? undefined : Number(newValue),
    }));
  };

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

  return (
    <div>
      {data
        ? Object.entries(data).map(([key, value]) => (
            <RacerDiv key={key}>
              <RacerDivInfo>
                <p>{key}</p>
                <p>{value.racerName}</p>
                <p>{value.carMark}</p>
                <p>{value.motor}</p>
                <p>{value.point}</p>
              </RacerDivInfo>

              <input
                type="number"
                value={point[key] ?? ""}
                placeholder="SET POINT"
                onChange={(e) => handleChange(key, e.target.value)}
              />
              <button>SET</button>
            </RacerDiv>
          ))
        : "load"}
    </div>
  );
};

export default RacerListPoints;
