import React, { useState } from "react";
import Window from "../Window";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ImageViewerProps {
  image: string;
  isLoading: boolean;
}

const controlTopButtons = () => {
  return (
    <div className="flex mr-2">
      <div className="bg-[rgb(74,74,74)] mx-1 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]">
        +
      </div>
      <div className="bg-[#4A4A4A] mx-1 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]">
        -
      </div>
      <div className="bg-[#4A4A4A] mx-1 px-2 text-xs justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]">
        RESET
      </div>
    </div>
  );
};

const ImageViewer = (props: ImageViewerProps) => {
  return (
    <Window title="Image" topElement={controlTopButtons}>
      <div className="bg-black w-full h-full rounded-b-xl overflow-hidden cursor-grab flex justify-center items-center">
        {props.isLoading ? (
          <div className="text-sm text-gray-500">Generating image...</div>
        ) : (
          <TransformWrapper>
            <TransformComponent>
              {props.image ? (
                <img src={props.image} className="h-full w-full" />
              ) : null}
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>
    </Window>
  );
};

export default ImageViewer;
