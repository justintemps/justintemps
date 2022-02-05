import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSize } from "../../hooks";

export const Page = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-row-gap: 3rem;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

export const Container = styled.div`
  max-width: var(--lg-max-width);
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 80% 1fr;
  grid-auto-rows: auto;
  width: 100%;
  height: inherit;
`;

export const Block = styled.div``;

export const Aside = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  }
`;

const StyledDivider = styled.div`
  height: calc(100% + 3rem);
  width: 100%;
  position: absolute;
  top: -3rem;
  left: 0;

  line {
    stroke: ${(props) => props.theme.colors.primary};
    fill: none;
  }
`;

export const Divider = ({}) => {
  const strokeWidth = 0.75;
  const sides = 100;
  const butt = strokeWidth / 2;
  return (
    <StyledDivider>
      <svg
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
          y2={-butt}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
      </svg>
    </StyledDivider>
  );
};

const TiltedContainer = styled.div<{ rotation: string }>`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  width: 100%;
  height: calc(100% + 3rem);
  left: 33%;
  top: 25%;
  position: absolute;
  transform-origin: center;
  transform: ${({ rotation }) => `rotate(${rotation})`};

  a {
    transform-origin: center;
    transform: ${({ rotation }) => `rotate(-${rotation})`};
    margin: 1.33rem 0;
  }
`;

export const Tilted: React.FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState<string>("0deg");
  const containerSize = useSize(containerRef);

  useEffect(() => {
    if (containerSize?.width && containerSize?.height) {
      const { height, width } = containerSize;
      const angle = Math.atan(width / height) * (180 / Math.PI);
      const rotate = `${angle}deg`;
      setRotate(rotate);
    }
  }, [containerSize?.width, containerSize?.height]); // eslint-disable-line

  return (
    <TiltedContainer rotation={rotate} ref={containerRef}>
      {children}
    </TiltedContainer>
  );
};
