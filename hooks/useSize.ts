import React, { RefObject } from "react";
import useResizeObserver from "@react-hook/resize-observer";

const useSize = (target: RefObject<any>) => {
  const [size, setSize] = React.useState<DOMRect>();

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

export { useSize };
