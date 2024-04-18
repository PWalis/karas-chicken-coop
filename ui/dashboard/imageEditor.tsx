"use client";

import React, { useRef } from "react";
import { useHover } from "usehooks-ts";

interface imageEditorProps {
  image: string;
}

export const ImageEditor: React.FC<imageEditorProps> = ({ image }) => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  return (
    <div className="flex flex-row flex-wrap justify-center max-h-32 gap-2">
      <img className="w-36 h-36 hover:grayscale" src={image} ref={hoverRef} />
    </div>
  );
};
