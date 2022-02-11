import React from "react";
import Window from "../Window";

const ImageViewer = () => {
  return (
    <Window title="Image">
      <div className="h-full w-full bg-black rounded-b-xl overflow-x-scroll overflow-scroll ">
          <img src="https://picsum.photos/id/450/1920/1920" />
      </div>
    </Window>
  );
};

export default ImageViewer;
