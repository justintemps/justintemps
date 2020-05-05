import React from "react";
// import { Grid } from "../../utils/layout";
import styled from "styled-components";
import { FlexContainer } from "../../utils/layout";

const HereO = styled(FlexContainer)`
  justify-content: space-between;

  .cube {
    flex-basis: 60%;
  }

  .catchphrase {
    flex-basis: 40%;

    h2 {
      margin: 0;
      font-size: 117px;
      line-height: 110px;
      letter-spacing: -3px;
      text-shadow: 0 2px #979797;
      color: ${({ theme: { colors } }) => `${colors.mattone}`};
    }
  }
`;

const Hero = () => (
  <HereO>
    <div className="cube"></div>
    <div className="catchphrase">
      <h2>Just in time to blow your mind</h2>
    </div>
  </HereO>
);

export default Hero;
