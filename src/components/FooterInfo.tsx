import icoStr from "../icon/strlogo.png";
import styled from "styled-components";
import {
  IoLocationSharpIco,
  IoMdMailIco,
  MdOutlinePhoneAndroidIco,
} from "../models";

const FootInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;

  @media (max-width: 1040px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const FootIcoDiv = styled.div`
  display: flex;
  align-items: center;
`;

const IcoStr = styled.img`
  margin: 50px;
  width: 250px;
`;
const InfoDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 39px 30px;
  border-left: 1px solid #21252c;
  border-right: 1px solid #21252c;
  margin: 25px;

  div {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  p {
    font-weight: 400;
    line-height: 24px;
    display: block;
    margin: 0;
    color: #5a6069;
    font-size: 16px;
  }
  h3 {
    color: #fff;
    font-weight: 200;
    font-size: 14px;
    display: block;
    font-family: "Oswald", sans-serif;
  }

  svg {
    color: #ed1b23;
    font-size: 25px;
  }
`;

type Props = {};

const FooterInfo = (props: Props) => {
  return (
    <FootInfo>
      <FootIcoDiv>
        <IcoStr src={icoStr} alt="My Icon" />
      </FootIcoDiv>

      <InfoDiv>
        <div>
          <IoLocationSharpIco />
          <h3>Հասցե</h3>
        </div>

        <p>Հայաստան, Երևան</p>
      </InfoDiv>
      <InfoDiv>
        <div>
          <IoMdMailIco />
          <h3>Էլ․ հասցե</h3>
        </div>

        <p>arsen093@mail.ru</p>
        <p>arsostr@gmail.com</p>
      </InfoDiv>
      <InfoDiv>
        <div>
          <MdOutlinePhoneAndroidIco />
          <h3>Հեռախոսահամար</h3>
        </div>

        <p>+374 93 500-080</p>
        <p>+374 99 005-080</p>
        <p>+374 55 234-733</p>
      </InfoDiv>
    </FootInfo>
  );
};

export default FooterInfo;
