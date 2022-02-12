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
    <React.Fragment>
      {props.image ? (
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
      ) : (
        <div className="h-full w-full text-white bg-[#232323] flex justify-center items-center flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-image h-20 text-[#494949]"
          >
            <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}
    </React.Fragment>
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
