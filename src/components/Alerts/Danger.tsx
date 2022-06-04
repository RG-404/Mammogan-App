import React from "react";

const Danger = (props:any) => {
  return (
    <div className="absolute bottom-2 right-2 transition-all translate-x-[-100]">
      <div role="alert">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          {props.title}
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          {props.body}
        </div>
      </div>
    </div>
  );
};

export default Danger;
