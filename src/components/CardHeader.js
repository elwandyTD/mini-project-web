import styled from "styled-components";

const Title = styled.p`
  margin: 0px;
  font-size: 20px;
  font-weight: bold;
  font-family: "AirbnbBlack";
  margin: 0px;
`;
const Subtitle = styled.p`
  margin: 0px;
  font-size: 12px;
  font-weight: bold;
`;

const Head = styled.div`
  margin-bottom: 10px;
`;

const CardHeader = ({ title, desc }) => {
  return (
    <Head>
      <Title>{title}</Title>
      <Subtitle>{desc}</Subtitle>
    </Head>
  );
};

export default CardHeader;
