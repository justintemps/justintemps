import styled from "styled-components";
import { Diagonal } from "../components/diagonal";

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.colors.accent};
  display: inline-block;
  transform: rotate(10deg);
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
`;

const Test = () => {
  return (
    <div>
      <Container>
        <Circle />
        <Circle />
        <Circle />
      </Container>
    </div>
  );
};

export default Test;
