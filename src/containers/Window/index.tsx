import React from "react";
import "./style.css";

type WindowProps = {
  title: string;
  topButton?: React.ReactNode;
  children: React.ReactNode;
};

const Window = (props: WindowProps) => {
  return (
    <div className="bg-[#232323] rounded-xl flex justify-between items-center flex-col h-full w-full">
      <div className="w-full bg-[#303030] text-white py-2 flex rounded-t-xl select-none justify-between">
        <div className="flex">
          <div className="bg-[#4A4A4A] ml-2 mr-2 px-2 text-sm justify-center items-center flex rounded-md">
            @
          </div>
          <div className="text-white text-sm mr-2 pr-2">{props.title}</div>
        </div>
        <div>{props.topButton ? props.topButton : null}</div>
      </div>
      {props.children}
    </div>
  );
};

export default Window;
