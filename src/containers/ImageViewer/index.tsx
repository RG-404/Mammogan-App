import React, { useState } from "react";
import Window from "../Window";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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

const ImageViewer = () => {
  return (
    <Window title="Image" topElement={controlTopButtons}>
      <div className="h-full w-full bg-black rounded-b-xl overflow-x-scroll overflow-scroll cursor-grab">
        <TransformWrapper>
          <TransformComponent>
            <img src="https://picsum.photos/id/450/1920/1920" />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </Window>
  );
};

export default ImageViewer;
