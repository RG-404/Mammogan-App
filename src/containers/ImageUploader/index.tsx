import React, { useState, useEffect, useRef } from "react";
import Window from "../Window";

// props.onImageUploadChange(e)

const UploadButtonTop = (props: any) => {
  const updateImage = (e: any) => {
    props.updatePreview(e);
    props.setImageInputFile(e.target.files[0]);
    props.onImageUploadChange(e.target.files[0]);
  };

  return (
    <div className="relative overflow-hidden bg-[#4A4A4A] ml-2 mr-2 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]">
      +
      <input
        type="file"
        className="absolute left-0 top-0 opacity-0"
        onChange={(e) => updateImage(e)}
      />
    </div>
  );
};

interface ImageUploaderProps {
  onImageUploadChange: Function;
  onReconstruct: Function;
  image: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = (
  props: ImageUploaderProps
) => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageInputFile, setImageInputFile] = useState();
  const [imageContainerHeight, setImageContainerHeight] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageContainerRef.current) {
      setImageContainerHeight(imageContainerRef.current.clientHeight);
    }
    window.addEventListener("resize", getElementHeight);
  }, []);

  useEffect(() => {
    if (props.image) setImagePreview(props.image);
  }, [props.image]);

  const getElementHeight = () => {
    if (imageContainerRef.current) {
      setImageContainerHeight(imageContainerRef.current.clientHeight);
    }
  };

  const updatePreview = (e: any) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Window
      title="Image Uploader"
      topElement={() => {
        return (
          <UploadButtonTop
            onImageUploadChange={props.onImageUploadChange}
            updatePreview={updatePreview}
            setImageInputFile={setImageInputFile}
          />
        );
      }}
    >
      <div
        className="w-full h-full flex flex-col justify-center items-center pb-0"
        ref={imageContainerRef}
      >
        {imagePreview.length === 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-file text-[#494949] h-20 mb-2"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            <div className="text-[#494949] text-center text-sm">
              <div>Drop photo file here to upload</div>
              <div>Alternatively, use the upload button in top bar</div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full overflow-hidden flex justify-center bg-black">
            <img
              src={imagePreview}
              style={{ height: `${imageContainerHeight}px` }}
            />
          </div>
        )}
      </div>
      <div
        className="bg-[#494949] w-full rounded-b-xl text-center text-[#1E1E1E] py-1 cursor-pointer transition-all hover:bg-[#707070]"
        onClick={() => {
          props.onReconstruct();
        }}
      >
        RECONSTRUCT
      </div>
    </Window>
  );
};

export default ImageUploader;
