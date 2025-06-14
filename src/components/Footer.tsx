import styled from "styled-components";
import FooterMedia from "./FooterMedia";
import FooterInfo from "./FooterInfo";
const FooterContainer = styled.div`
  border-top: 1px solid #ed1b2245;
  background-color: #181b23;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrgDiv = styled.div`
  border-top: 1px solid #ed1b2245;
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    margin: 10px 50px;
    font-weight: 400;
    line-height: 24px;
    color: #5a6069;
    font-size: 14px;
  }
  @media (max-width: 804px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

type Props = {};

const Footer = (props: Props) => {
  return (
    <FooterContainer>
      <FooterInfo />
      <FooterMedia />
      <OrgDiv>
        <p>
          Հեղինակային իրավունքները © 2021 «Էս Թի Ար» ակումբ ՀԿ։ Բոլոր
          իրավունքները պաշտպանված են:
        </p>
        <p>Դիզայնը և պատրաստումը՝ «A.B.»</p>
      </OrgDiv>
    </FooterContainer>
  );
};

export default Footer;
