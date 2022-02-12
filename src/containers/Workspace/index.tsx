import React, { useState, useEffect } from "react";
import ImageUploader from "../ImageUploader";
import ImageViewer from "../ImageViewer";
import ParameterSetter from "../ParameterSetter";
import io from "socket.io-client";
import axios from "axios";
import config from "../../config.json";

const url = config.url;

const Workspace = () => {
  const [socket, setSocket] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [filePath, setFilePath] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [genImageLoading, setGenImageLoading] = useState<boolean>(false);
  const [on, setOn] = useState(false);
  const [realImageSrc, setRealImageSrc] = useState<any>("");
  const [genImageSrc, setGenImageSrc] = useState<any>("");
  const [principleValues, setPrincipalValues] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const uploadFormData = async (formData: any) => {
    return await axios.post(`${url}upload`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  };

  const onImageUploadChange = async (file: any) => {
    setFilePath(file);
    setOn(false);
    let fileName = file.name.split(".")[0];
    setUploading(true);
    setGenImageLoading(true);
    setProgress("Uploading Image");
    setFileName(fileName);

    let formData = new FormData();
    formData.append("socketId", socket.id);
    formData.append("file", file);
    console.log(formData);

    try {
      const prefix = "data:image/png;base64,";
      const res = await uploadFormData(formData);
      setRealImageSrc(`${prefix}${res.data.file}`);
      setGenImageSrc(`${prefix}${res.data.file}`);
    } catch (e) {
      alert("An error occured while uploading " + fileName);
    } finally {
      setUploading(false);
      setGenImageLoading(false);
      setProgress(null);
    }
  };

  const onChangeSlider = (e: any, i: number) => {
    let list = [...principleValues];
    list[i] = e;
    setPrincipalValues(list);
    setGenImageLoading(true);
    socket.emit(
      "moveSlider",
      {
        alpha: e,
        index: i,
      },
      (res: any) => {
        setGenImageSrc(res ? `data:image/png;base64,${res}` : null);
        setGenImageLoading(false);
      }
    );
  };

  const onReconstruct = async () => {
    if (!filePath) {
      alert("Please choose an Image!");
      return;
    }
    setOn(true);
    socket.emit("reconstruct", {}, (list: any, res: any) => {
      setPrincipalValues(list);
      setGenImageSrc(res ? `data:image/png;base64,${res}` : null);
      setGenImageLoading(false);
    });
  };

  useEffect(() => {
    (async () => {
      const newSocket = io(`${url}`, { reconnection: false });
      setSocket(newSocket);
      return () => newSocket.close();
    })();
  }, [setSocket]);

  useEffect(() => {
    if (socket !== null) {
      socket.on("connect", () =>
        console.log("Socket Connection Established\nID: " + socket.id)
      );
      socket.on("uploadMsg", (msg: any) => setProgress(msg));
    }
  }, [socket]);

  return (
    <div className="flex w-full h-full">
      <div className="w-1/3 items-end justify-between flex flex-col pl-14 pr-8">
        <div className="w-full h-2/5 items-center justify-center align-middle flex">
          <div className="h-full w-full pb-2">
            <ImageUploader
              onReconstruct={onReconstruct}
              image={realImageSrc}
              onImageUploadChange={onImageUploadChange}
            />
          </div>
        </div>
        <div className="w-full h-3/5">
          <div className="h-full w-full pt-3">
            <ParameterSetter
              onChangeSlider={onChangeSlider}
              values={principleValues}
              enable={on}
            />
          </div>
        </div>
      </div>
      <div className="w-2/3 items-center justify-center align-middle flex pr-14">
        <ImageViewer image={genImageSrc} isLoading={genImageLoading} />
      </div>
    </div>
  );
};

export default Workspace;
