import React from "react";
import Window from "../Window";
import ImageUploader from "../ImageUploader";

const Workspace = () => {
  return (
    <div className="flex w-full">
      <div className="flex-1">
        <ImageUploader />
      </div>
      <div className="flex-1">HEllo world</div>
    </div>
  );
};

export default Workspace;
