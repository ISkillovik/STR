import styled from "styled-components";

interface YouTubeLiveEmbedProps {
  videoId: string;
  title?: string;
}

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #222;
`;

const LiveTransDiv = styled.div`
  height: 50vh;
`;

const LiveEventLiveYouTube: React.FC<YouTubeLiveEmbedProps> = ({
  videoId,
  title,
}) => {
  return (
    <LiveTransDiv>
      <Container>
        {title && <Title>{title}</Title>}
        <VideoWrapper>
          <Iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoWrapper>
      </Container>
    </LiveTransDiv>
  );
};

export default LiveEventLiveYouTube;
