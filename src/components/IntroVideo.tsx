import { FC } from "react";
import styled from "styled-components";

const VideoWrapper = styled.div`
  /* margin-top: 15px; */
  width: 100%;
  height: 95vh;
  overflow: hidden;
  position: relative;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IntroVideo: FC = () => {
  return (
    <VideoWrapper>
      <StyledVideo autoPlay muted loop playsInline>
        <source src="/Video/videostr2.webm" type="video/webm" />
        Your browser does not support the video tag.
      </StyledVideo>
    </VideoWrapper>
  );
};

export default IntroVideo;
