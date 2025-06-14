import { useState, useEffect } from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

type Props = {};

interface DataRacers {
  number: {
    carColor: string;
    carHp: string;
    carMark: string;
    carNum: string;
    group: string;
    motor: string;
    point: number;
    racerName: string;
  };
}

const RacerListPoints = (props: Props) => {
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

  return (
    <div>
      {data
        ? Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <p>{key}</p>
              <br />
              <p>{`${value.age}`}</p>
            </div>
          ))
        : "load"}
    </div>
  );
};

export default RacerListPoints;
