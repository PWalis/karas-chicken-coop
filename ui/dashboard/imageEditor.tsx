"use client";

import React, { useRef, useState } from "react";
import { useHover } from "usehooks-ts";
import clsx from "clsx";
import { deleteImage } from "@/app/lib/actions";
import { getSignedURLImageName } from "@/app/lib/utils";

interface imageEditorProps {
  image: string;
  productId: number;
}

export const ImageEditor: React.FC<imageEditorProps> = ({
  image,
  productId,
}) => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const imageName = getSignedURLImageName(image);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const deleteImageHandler = async () => {
    try {
      setIsLoading(true);
      await deleteImage(imageName!, productId);
      setVisible(false);
    } catch (error) {
      return { message: error };
    }
  };

  return (
    <div
      className="relative flex flex-row flex-wrap justify-center max-h-32 gap-2 hover:cursor-pointer"
      ref={hoverRef}
      onClick={deleteImageHandler}
    >
      <img
        className={clsx("w-36 h-36", isHover ? "grayscale" : "")}
        src={image}
      />
      <p
        className={clsx(
          isHover ? "absolute top-1/2 bg-red-600 rounded-2xl px-2" : "hidden"
        )}
      >
        {isLoading ? "In Progress..." : "Delete?"}
      </p>
    </div>
  );
};
