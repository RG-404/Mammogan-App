import React from "react";
import Window from "../Window";
import ImageUploader from "../ImageUploader";
import ParameterSetter from "../ParameterSetter";

const Workspace = () => {
  return (
    <div className="flex w-full h-full">
      <div className="items-end justify-between flex flex-col pl-14 pr-8">
        <div className="pb-6">
          <ImageUploader />
        </div>
        <ParameterSetter />
      </div>
      <div className="items-center justify-center align-middle flex pr-14">
        <Window title="Image">
          <div className="h-full w-full bg-black rounded-b-xl">Hello World!</div>
        </Window>
      </div>
    </div>
  );
};

export default Workspace;
