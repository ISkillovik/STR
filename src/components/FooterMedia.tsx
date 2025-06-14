import { TfiYoutubeIco, IoLogoInstagramIco, FaFacebookFIco } from "../models";
import styled from "styled-components";

const FooterContainerMedia = styled.div`
  height: 140px;
  width: 300px;
  padding: 39px 30px;
  border: 1px solid #21252c;
  border-radius: 10px;
  position: relative;
  margin: 20px 0;

  svg {
    color: #e51515;
    background: #181b23;
    position: absolute;
    right: -20px;
    height: 60px;
    width: 40px;
    text-align: center;
    top: 50%;
    margin-top: -32px;
    padding: 10px 0;
  }
  p {
    font-weight: 400;
    line-height: 24px;

    margin: 0;
    color: #5a6069;
    font-size: 14px;
  }
  h3 {
    color: #fff;
    font-weight: 200;
    margin: 0;
    font-size: 14px;
    margin-bottom: 7px;
    font-family: "Oswald", sans-serif;
  }
`;

const FooterContainerMediaMain = styled.div`
  position: relative;

  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
`;

const MediaMain = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1030px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

type Props = {};

const FooterMedia = (props: Props) => {
  return (
    <MediaMain>
      <FooterContainerMediaMain>
        <FooterContainerMedia>
          <FaFacebookFIco />
          <h3>Facebook</h3>
          <p>Հետևեք մեզ Facebook-ում</p>
        </FooterContainerMedia>
      </FooterContainerMediaMain>

      <FooterContainerMediaMain>
        <FooterContainerMedia>
          <TfiYoutubeIco />
          <h3>Youtube</h3>
          <p>Հետևեք մեզ Instagram-ում</p>
        </FooterContainerMedia>
      </FooterContainerMediaMain>

      <FooterContainerMediaMain>
        <FooterContainerMedia>
          <IoLogoInstagramIco />
          <h3>Instagram</h3>
          <p>Հետևեք մեզ Youtube-ում</p>
        </FooterContainerMedia>
      </FooterContainerMediaMain>
    </MediaMain>
  );
};

export default FooterMedia;
