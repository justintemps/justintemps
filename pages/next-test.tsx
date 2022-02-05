import { group } from "console";
import styled from "styled-components";
import { Diagonal } from "../components/diagonal";

const Container = styled.div`
  height: 840px;
  min-height: 840px;
  width: 408px;
  // border: 1px solid yellow;
`;

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`;

const Line = ({}) => {
  const strokeWidth = 1;
  const sides = 100;
  const butt = strokeWidth / 2;
  return (
    <SVG
      width="100%"
      height="100%"
      viewBox={`0 0 ${sides} ${sides}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <line
        x1={butt}
        y1={sides + 1}
        x2={sides - butt}
        y2="0"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
    </SVG>
  );
};

const Test = () => {
  return (
    <Container>
      <Line />
    </Container>
  );
};

export default Test;
