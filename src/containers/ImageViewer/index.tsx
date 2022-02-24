import React, { useState, useEffect, useRef, useContext } from "react";
import Window from "../Window";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DataContext } from "../../context/DataProvider";

interface ImageViewerProps {
  image: string;
  isLoading: boolean;
}

const ControlTopButtons = (props: any) => {
  return (
    <div className="flex mr-2">
      <div className="bg-[#4A4A4A] mx-1 px-2 text-xs justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]">
        RESET
      </div>
      <div className="bg-[rgb(74,74,74)] mx-1 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]">
        +
      </div>
      <div className="bg-[#4A4A4A] mx-1 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]">
        -
      </div>
      <div
        onClick={() => {
          props.download();
        }}
        className="bg-[#4A4A4A] mx-1 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]"
      >
        SAVE IMAGE
      </div>
    </div>
  );
};

interface IImageViewComponent {
  image: string;
}

const ImageViewComponent = (props: any) => {
  const [mouseCoord, setMouseCoord] = useState([0, 0]);
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [currentScale, setCurrentScale] = useState(0);

  return (
    <React.Fragment>
      {props.image ? (
        <React.Fragment>
          <div className="text-gray-300 absolute bottom-0 right-20 h-32 z-50 text-xs">
            <div>MOUSE X: {mouseCoord[0]}</div>
            <div>MOUSE Y: {mouseCoord[1]}</div>
            <div>POSITION X: {currentPosition[0]}</div>
            <div>POSITION Y: {currentPosition[1]}</div>
            <div>SCALE: {currentScale}</div>
            <div>IMGSZ: 512 X 512</div>
          </div>
          <TransformWrapper
            onPanning={(e) => {
              console.log(e.state);
              setCurrentPosition([e.state.positionX, e.state.positionY]);
              setCurrentScale(e.state.scale);
            }}
            onZoom={(e) => {
              console.log(e.state);
              setCurrentPosition([e.state.positionX, e.state.positionY]);
              setCurrentScale(e.state.scale);
            }}
          >
            <TransformComponent
              wrapperStyle={{
                height: "100%",
                width: "100%",
              }}
              // contentStyle={{ height: "100%" }}
            >
              {props.image ? (
                <div
                  onMouseMove={(e) => {
                    setMouseCoord([
                      e.nativeEvent.offsetX,
                      e.nativeEvent.offsetY,
                    ]);
                  }}
                >
                  {" "}
                  <img src={props.image} className="h-full w-full" />
                </div>
              ) : null}
            </TransformComponent>
          </TransformWrapper>
        </React.Fragment>
      ) : (
        <div className="h-full w-full text-white bg-[#232323] flex justify-center items-center flex-col relative">
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

  const {fileName} = useContext(DataContext);

  const saveGenImage = () => {
    let element = document.createElement("a");
    element.setAttribute("href", props.image);
    element.setAttribute("download", `${fileName}_gen.png`);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <Window
      title="Image"
      topElement={() => {
        return <ControlTopButtons download={saveGenImage} />;
      }}
    >
      <div className="bg-black w-full h-full rounded-b-xl overflow-hidden cursor-grab flex justify-center items-center relative">
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
