import React, { useEffect, useRef } from "react";
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

interface IImageViewComponent {
  image: string;
}

const ImageViewComponent = (props: any) => {
  return (
    <TransformWrapper>
      <TransformComponent
        wrapperStyle={{
          height: "100%",
          width: "100%",
        }}
        contentStyle={{ height: "100%" }}
      >
        {props.image ? (
          <img src={props.image} className="h-full w-full" />
        ) : null}
      </TransformComponent>
    </TransformWrapper>
  );
};

const ImageViewer = (props: ImageViewerProps) => {
  return (
    <Window title="Image" topElement={controlTopButtons}>
      <div className="bg-black w-full h-full rounded-b-xl overflow-hidden cursor-grab flex justify-center items-center">
        {props.isLoading ? (
          <div className="text-sm text-gray-500">Loading image...</div>
        ) : (
          <ImageViewComponent image={props.image} />
        )}
      </div>
    </Window>
  );
};

export default ImageViewer;
