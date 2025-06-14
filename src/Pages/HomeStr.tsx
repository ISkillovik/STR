import IntroVideo from "../components/IntroVideo";
import styled from "styled-components";
import IcoFia from "../icon/part1.png";
import IcoDrive from "../icon/parrt2.png";
import IcoDzz from "../icon/part3.png";
import IcoStrRac from "../icon/part4.png";

const SponsorIco = styled.img`
  width: 150px;
`;

const IcoDiv = styled.div`
  transition: 1s ease;
  margin: 50px 50px;
  :hover {
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
    transition: 0.5s ease;
  }
`;

const SponsorIcoContainer = styled.div`
  margin-top: 120px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  opacity: 20;
`;

const TextH1 = styled.h1`
  margin-top: 150px;
  text-align: center;
  color: white;
`;

const TransBox = styled.div`
  position: relative;
  top: -450px;
  min-height: 348px;
  width: 100%;
  background: #ed1b226f;
  clip-path: polygon(0 100px, 100% 0, 100% 100%, 0% 100%);
  opacity: 0.7;
`;

const TransBoxBorder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 103px;
  min-height: 345px;
  padding: 5px;
  width: 100%;
  background: #171717;
  clip-path: polygon(0 107px, 100% 0, 100% 100%, 0% 100%);
  transform: translate(0, 2px);
`;

const GlobalDiv = styled.div`
  background-color: rgb(23 23 23);
`;

const FootDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0px 20px 60px 20px;
`;

const HomeStr = () => {
  return (
    <GlobalDiv>
      {/* <WelcomStrTextContainer>
        <TextH1>Բարի գալուստ մեր պաշտոնական կայք</TextH1>
        <TextH1></TextH1>
      </WelcomStrTextContainer> */}

      <IntroVideo />
      <TransBox>
        <TransBoxBorder>
          <TextH1>Բարի գալուստ մեր պաշտոնական կայք</TextH1>
        </TransBoxBorder>
      </TransBox>
      <SponsorIcoContainer>
        <IcoDiv>
          <SponsorIco src={IcoFia} alt="FIA" />
        </IcoDiv>
        <IcoDiv>
          <SponsorIco src={IcoDrive} alt="AutoDrive" />
        </IcoDiv>
        <IcoDiv>
          <SponsorIco src={IcoDzz} alt="Dz" />
        </IcoDiv>
        <IcoDiv>
          <SponsorIco src={IcoStrRac} alt="StrR" />
        </IcoDiv>
      </SponsorIcoContainer>
      <FootDiv>
        <p>
          Հեղինակային իրավունքները © 2021 «Էս Թի Ար» ակումբ ՀԿ։ Բոլոր
          իրավունքները պաշտպանված են:
        </p>
        <p>Դիզայնը և պատրաստումը՝ «A.B.»</p>
      </FootDiv>
    </GlobalDiv>
  );
};

export default HomeStr;
