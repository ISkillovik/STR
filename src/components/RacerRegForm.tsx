import { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const PilotContain = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-around;
`;

const InputAdm = styled.input`
  font-size: 20px;
  margin: 10px;
  width: 350px;
  height: 40px;
`;

const RacerRegForm = () => {
  const [pilotId, setPilotId] = useState("");
  const [carNum, setCarNum] = useState("");
  const [racerName, setRacerName] = useState("");
  const [carMark, setCarMark] = useState("");
  const [motor, setMotor] = useState("");
  const [group, setGroup] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carHp, setCarHp] = useState("");

  const handleUpdateRacers = async () => {
    const userRef = doc(db, "Admin", "event");
    try {
      await setDoc(userRef, { eventRacers: addRider() }, { merge: true });
      console.log("Имя обновлено");
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const addRider = () => {
    const rider = {
      [pilotId]: {
        carNum: carNum,
        racerName: racerName,
        carMark: carMark,
        motor: motor,
        group: group,
        carColor: carColor,
        carHp: carHp,
        point: 0,
      },
    };
    setPilotId("");
    setCarNum("");
    setRacerName("");
    setCarMark("");
    setMotor("");
    setGroup("");
    setCarColor("");
    setCarHp("");
    return rider;
  };

  return (
    <div>
      <PilotContain>
        <div>
          <InputAdm
            value={pilotId}
            onChange={(e) => {
              setPilotId(e.target.value);
            }}
            placeholder="pilot id"
          />
        </div>
        <div>
          <InputAdm
            value={carNum}
            onChange={(e) => {
              setCarNum(e.target.value);
            }}
            placeholder="car num"
          />
        </div>
        <div>
          <InputAdm
            value={racerName}
            onChange={(e) => {
              setRacerName(e.target.value);
            }}
            placeholder="racer full name"
          />
        </div>
        <div>
          <InputAdm
            value={carMark}
            onChange={(e) => {
              setCarMark(e.target.value);
            }}
            placeholder="car mark"
          />
        </div>
        <div>
          <InputAdm
            value={motor}
            onChange={(e) => {
              setMotor(e.target.value);
            }}
            placeholder="motor"
          />
        </div>
        <div>
          <InputAdm
            value={group}
            onChange={(e) => {
              setGroup(e.target.value);
            }}
            placeholder="group"
          />
        </div>
        <div>
          <InputAdm
            value={carColor}
            onChange={(e) => {
              setCarColor(e.target.value);
            }}
            placeholder="car color"
          />
          <InputAdm
            value={carHp}
            onChange={(e) => {
              setCarHp(e.target.value);
            }}
            placeholder="hp"
          />
        </div>
      </PilotContain>
      <button onClick={() => handleUpdateRacers()}>ADD RIDER</button>
    </div>
  );
};

export default RacerRegForm;
