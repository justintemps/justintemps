import React, { ReactNode, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { useSize } from "../../hooks";

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
  const containerSize = useSize(containerRef);

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

  // Upate the position of our diagonal elements when the
  // size of the container changes
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      if (containerSize && childrenRef.current) {
        const computedWidth = containerSize.width;
        const firstOffset = childrenRef.current[0].clientWidth / 2;
        const lastOffset = childrenRef.current[numElements - 1].clientWidth / 2;
        const innerStart = firstOffset;
        const innerEnd = computedWidth - lastOffset;
        const innerWidth = innerEnd - innerStart;
        const splitWidth = innerWidth / (numElements - 1);

        updateDimensions({ innerStart, innerEnd, innerWidth, splitWidth });
      }
    }
  }, [numElements, containerSize]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container ref={containerRef}>
      {React.Children.map<ReactNode, ReactNode>(children, (child, i) => {
        const { splitWidth, lastOffset } = dimensions;
        if (React.isValidElement(child)) {
          const iMirror = numElements - i - 1;
          const translate = splitWidth * iMirror + lastOffset;
          return (
            <DiagonalItem style={{ transform: `translateX(${translate}px)` }}>
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
