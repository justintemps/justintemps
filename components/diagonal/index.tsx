import React, { ReactNode, useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  height: 100%;
  width: 100%;
`;

const DiagonalItem = styled.div`
  font-size: 0;
  margin: 0;
  padding: 0;
`;

interface Dimensions {
  computedWidth: number;
  firstOffset: number;
  lastOffset: number;
  innerStart: number;
  innerEnd: number;
  innerWidth: number;
  splitWidth: number;
}

const Diagonal: React.FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<any>({});

  const [dimensions, setDimensions] = useState<Dimensions>({
    computedWidth: 0,
    firstOffset: 0,
    lastOffset: 0,
    innerStart: 0,
    innerEnd: 0,
    innerWidth: 0,
    splitWidth: 0,
  });

  function updateDimensions(newDimensions: Partial<Dimensions>) {
    return setDimensions({ ...dimensions, ...newDimensions });
  }

  // Break children into an array so we can work with the
  const items = React.Children.toArray(children);

  // The total number of children
  const numElements = items.length;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (containerRef.current && childrenRef.current) {
        const containerStyle = window.getComputedStyle(containerRef.current);

        const computedWidth =
          containerRef.current!.clientWidth -
          parseFloat(containerStyle.paddingLeft) -
          parseFloat(containerStyle.paddingRight);

        const firstOffset = childrenRef.current[0].clientWidth / 2;
        const lastOffset = childrenRef.current[numElements - 1].clientWidth / 2;
        const innerStart = firstOffset;
        const innerEnd = computedWidth - lastOffset;
        const innerWidth = innerEnd - innerStart;
        const splitWidth = innerWidth / (numElements - 1);

        updateDimensions({ innerStart, innerEnd, innerWidth, splitWidth });
      }
    }
  }, [numElements]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container ref={containerRef}>
      {React.Children.map<ReactNode, ReactNode>(children, (child, i) => {
        const { splitWidth, lastOffset } = dimensions;
        if (React.isValidElement(child)) {
          const iMirror = numElements - i - 1;
          const marginLeft = splitWidth * iMirror + lastOffset;
          return (
            <DiagonalItem style={{ marginLeft }}>
              {React.cloneElement(child, {
                ref: (ref: any) => (childrenRef.current[i] = ref),
              })}
            </DiagonalItem>
          );
        }
      })}
    </Container>
  );
};

export { Diagonal };
