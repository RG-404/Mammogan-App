import React from "react";
import ImageUploader from "../ImageUploader";
import ImageViewer from "../ImageViewer";
import ParameterSetter from "../ParameterSetter";

const Workspace = () => {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/3 items-end justify-between flex flex-col pl-14 pr-8">
        <div className="pb-6">
          <ImageUploader />
        </div>
        <ParameterSetter />
      </div>
      <div className="w-2/3 items-center justify-center align-middle flex pr-14">
        <ImageViewer />
      </div>
    </div>
  );
};

export default Workspace;
