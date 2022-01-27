import React from "react";
import styled from "styled-components";
import { fontSize } from "../../styles/typography";

const Section = styled.section`
  h1 {
    position: relative;
    left: -10px;
  }
  p {
    font-size: ${fontSize[2]};
    line-height: 1.25em;
    letter-spacing: -0px;
    margin: 0.5em 0;
    font-weight: 400;
  }
`;

const Block: React.FC = ({ children }) => {
  return <Section>{children}</Section>;
};

export { Block };
