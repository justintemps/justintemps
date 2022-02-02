import styled from "styled-components";
import { Diagonal } from "../components/diagonal";

const Item = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
`;

const Test = () => {
  return (
    <Diagonal>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Diagonal>
  );
};

export default Test;
