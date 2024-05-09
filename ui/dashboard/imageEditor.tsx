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
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deleteImageHandler = async () => {
    try {
      setShowConfirmation(false);
      setIsLoading(true);
      await deleteImage(imageName!, productId);
      setVisible(false);
    } catch (error) {
      return { message: error };
    }
  };

  return (
<>
    <div
      className="relative flex flex-row shrink-0 justify-center max-h-32 gap-2 hover:cursor-pointer"
      ref={hoverRef}
    >
      <img
        className={clsx("w-36 h-36", isHover ? "grayscale" : "")}
        src={image}
      />
      <p onClick={() => setShowConfirmation(true)}
        className={clsx(
          isHover ? "absolute right-0 bg-red-600 rounded-2xl px-2" : "hidden"
        )}
      >
        {isLoading ? "In Progress..." : "X"}
      </p>
    </div>
         {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md">
              <p className="text-lg mb-4">
                Are you sure you want to delete this Image?
              </p>
              <div className="flex justify-center">
                <button
                  onClick={deleteImageHandler}
                  className="bg-red-500 text-white px-4 py-2 mr-4 rounded-md"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </>
  );
};
