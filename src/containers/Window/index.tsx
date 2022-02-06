import React from "react";
import "./style.css";

const Window = (props: any) => {
  return (
    <div className="bg-[#232323] rounded-xl  flex justify-center items-center flex-col">
        <div className="w-full bg-[#303030] text-white py-2 flex rounded-t-xl">
            <div className="bg-[#4A4A4A] ml-2 mr-2 px-2 text-sm justify-center items-center flex rounded-md">@</div>
            <div className="text-white text-sm mr-2 pr-2">{props.title}</div>
        </div>
        <div className="h-30">
            {props.children}
        </div>
    </div>
  );
};

export default Window;
