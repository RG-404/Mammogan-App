import React from "react";
import Window from "../Window";

const uploadButtonTop = () => {
  return (
    <div className="relative overflow-hidden bg-[#4A4A4A] ml-2 mr-2 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]">
      +
      <input type="file" className="absolute left-0 top-0 opacity-0" />
    </div>
  );
};

const ImageUploader = () => {
  return (
    <Window title="Image Uploader" topElement={uploadButtonTop}>
      <div className="flex flex-col justify-center items-center pb-0">
        <div className="p-12 flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-file text-[#494949] h-20 mb-5"
          >
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <div className="text-[#494949] text-center text-sm">
            <div>Drop photo file here to upload</div>
            <div>Alternatively, use the upload button in top bar</div>
          </div>
        </div>
        <div className="bg-[#494949] w-full rounded-b-xl text-center text-[#1E1E1E] py-1 cursor-pointer">
          RECONSTRUCT
        </div>
      </div>
    </Window>
  );
};

export default ImageUploader;
