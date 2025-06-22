// import { onSnapshot, doc } from "firebase/firestore";
// import { db } from "../../firebase";
// import { useState, useEffect } from "react";
// import { DataRacers } from "../../models";
// import styled from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
// const RacerDiv = styled(motion.div)`
//   width: 90%;
//   margin: 10px;
//   padding: 5px;
//   background-color: black;
//   border: solid 1px red;
//   display: flex;
//   justify-content: space-between;
//   p {
//     font-size: 24px;
//     color: aliceblue;
//   }
// `;

// const RacersListUL = styled.ul`
//   counter-reset: item;
//   list-style: none;
//   padding: 0;
//   li {
//     justify-content: space-around;
//     display: flex;
//     align-items: flex-start;
//   }

//   li::before {
//     counter-increment: item;
//     content: counter(item);
//     display: inline-block;
//     width: 20px; /* место под номер */
//     text-align: right;
//     margin-right: 10px;
//     font-weight: bold;
//     font-size: 25px;
//     color: white;
//     margin-top: 15px;
//   }
// `;
// const ExampDetails = styled.div`
//   display: flex;
//   margin: 10px;
//   padding: 5px;

//   border-bottom: solid 2px red;
//   display: flex;
//   justify-content: space-between;
//   p {
//     font-size: 24px;
//     color: aliceblue;
//   }
// `;
// type Props = {};

// const LiveEventScore = (props: Props) => {
//   const [data, setData] = useState<DataRacers>();

//   useEffect(() => {
//     const unsubscribe = onSnapshot(doc(db, "Admin", "event"), (docSnapshot) => {
//       if (docSnapshot.exists()) {
//         return setData(docSnapshot.data().eventRacers);
//       } else {
//         console.log("Document does not exist");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const sortedEntries = data
//     ? Object.entries(data).sort((a, b) => b[1].point - a[1].point)
//     : [];

//   return (
//     <div>
//       <ExampDetails>
//         <p>hamar</p>
//         <p>anun</p>
//         <p>meqena</p>
//         <p>sharjich</p>
//         <p>miavor</p>
//       </ExampDetails>

//       {data ? (
//         <AnimatePresence>
//           <RacersListUL>
//             {sortedEntries.map(([key, value]) => (
//               <li itemType="decimal " key={key}>
//                 <RacerDiv
//                   key={key}
//                   layout
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <p>{key}</p>
//                   <p>{value.racerName}</p>
//                   <p>{value.carMark}</p>
//                   <p>{value.motor}</p>
//                   <p>{value.point}</p>
//                 </RacerDiv>
//               </li>
//             ))}
//           </RacersListUL>
//         </AnimatePresence>
//       ) : (
//         "Loading..."
//       )}
//     </div>
//   );
// };

// export default LiveEventScore;

import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { DataRacers } from "../../models";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const RacerDiv = styled(motion.div)`
  align-items: center;
  width: 100%;
  margin: 5px 0;
  padding: 5px 0;
  background-color: #00000081;
  border-radius: 6px;
  border: solid 1px red;
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
    align-items: center;
    margin: 5px 0;
  }

  li::before {
    counter-increment: item;
    content: counter(item) ".";
    position: absolute;
    left: -35px; /* Сдвиг номера влево */
    font-weight: bold;
    font-size: 22px;
    color: white;
  }
`;

const ExampDetails = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 2px red;
  padding: 10px 0;
  margin-bottom: 5px;
`;

const Column = styled.p`
  font-size: 20px;
  color: aliceblue;
  width: 20%;
  text-align: center;
  margin: 0;
`;

type Props = {};

const LiveEventScore = (props: Props) => {
  const [data, setData] = useState<DataRacers>();
  const [dataType, setDataType] = useState<string>();
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

  return (
    <div style={{ width: "95%", margin: "0 auto", minHeight: "500px" }}>
      <ExampDetails>
        <Column>No</Column>
        <Column>Name</Column>
        <Column>Car</Column>
        <Column>Engin</Column>
        {checkEventPointsType()}
      </ExampDetails>

      {data ? (
        <AnimatePresence>
          <RacersListUL>
            {sortedEntries.map(([key, value]) => (
              <li key={key}>
                <RacerDiv
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Column>{key}</Column>
                  <Column>{value.racerName}</Column>
                  <Column>{value.carMark}</Column>
                  <Column>{value.motor}</Column>
                  <Column>{value.point}</Column>
                </RacerDiv>
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
