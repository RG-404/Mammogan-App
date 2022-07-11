import React, { useState, useEffect, useContext, ContextType } from "react";
import ImageUploader from "../ImageUploader";
import ImageViewer from "../ImageViewer";
import ParameterSetter from "../ParameterSetter";
// import io from "socket.io-client";
import axios from "axios";
import config from "../../config.json";
import { DataContext } from "../../context/DataProvider";
import { SettingsContext } from "../../context/SettingsProvider";

const url = config.url;

const Workspace = () => {
  // const [socket, setSocket] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [filePath, setFilePath] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [genImageLoading, setGenImageLoading] = useState<boolean>(false);
  const [sid, setSid] = useState<any>("");

  const [on, setOn] = useState(false);
  const [principleValues, setPrincipalValues] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const {
    realImageSrc,
    setRealImageSrc,
    genImageSrc,
    setGenImageSrc,
    fileName,
    setFileName,
  } = useContext(DataContext);
  // const { on, setOn, principleValues, setPrincipalValues } =
  //   useContext(SettingsContext);

  const uploadFormData = async (formData: any) => {
    console.log("HIT uploadFormData");

    return await axios.post(`${url}upload`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  };

  const onImageUploadChange = async (file: any) => {
    console.log("HIT onImageUploadChange");
    setFilePath(file);
    setOn(false);
    let fileName = file.name.split(".")[0];
    setUploading(true);
    setGenImageLoading(true);
    setProgress("Uploading Image");
    if (setFileName) setFileName(fileName);

    let formData = new FormData();
    formData.append("sid", sid);
    formData.append("file", file);
    console.log(formData);

    try {
      const prefix = "data:image/png;base64,";
      const res = await uploadFormData(formData);
      if (setRealImageSrc) setRealImageSrc(`${prefix}${res.data.file}`);
      if (setGenImageSrc) setGenImageSrc(`${prefix}${res.data.file}`);
    } catch (e) {
      alert("An error occured while uploading " + fileName);
    } finally {
      setUploading(false);
      setGenImageLoading(false);
      setProgress(null);
    }
  };

  const onChangeSlider = (e: any, i: number) => {
    // console.log("HIT onChangeSlider");
    // let list = [...principleValues];
    // list[i] = e;
    // setPrincipalValues(list);
    // setGenImageLoading(true);
    setOn(false);
    POST_moveSlider(e, i);
    // socket.emit(
    //   "moveSlider",
    //   {
    //     alpha: e,
    //     index: i,
    //   },
    //   (res: any) => {
    //     if (setGenImageSrc)
    //       setGenImageSrc(res ? `data:image/png;base64,${res}` : "");
    //     setGenImageLoading(false);
    //   }
    // );
  };

  const _onChangeSlider = (e: any, i: number) => {
    console.log("HIT onChangeSlider", e, i);
    let list = [...principleValues];
    list[i] = e;
    setPrincipalValues(list);
    setGenImageLoading(true);
  };

  const POST_moveSlider = async (e: any, i: number) => {
    console.log("HIT POST_moveSlider");
    try {
      const res = await axios.post(`${url}move_slider`, {
        req: {
          alpha: e,
          index: i,
        },
        sid,
      });
      if (setGenImageSrc)
        setGenImageSrc(res.data ? `data:image/png;base64,${res.data}` : "");
      setGenImageLoading(false);
      setOn(true);
    } catch (error) {
      console.log("Error in POST_moveSlider");
    }
  };

  const onReconstruct = async () => {
    console.log("HIT onReconstruct");
    if (!filePath) {
      alert("Please choose an Image!");
      return;
    }
    POST_onReconstruct();
    // socket.emit("reconstruct", {}, (list: any, res: any) => {
    //   setPrincipalValues(list);
    //   if (setGenImageSrc) {
    //     console.log(setGenImageSrc, list, res);

    //     setGenImageSrc(res ? `data:image/png;base64,${res}` : "");
    //   }
    //   setGenImageLoading(false);
    // });
  };

  const POST_onReconstruct = async () => {
    console.log("HIT POST_moveSlider");
    try {
      const res = await axios.post(`${url}reconstruct`, {
        sid,
      });
      console.log(res.data);
      setPrincipalValues(res.data.list);
      if (setGenImageSrc) {
        console.log(setGenImageSrc, res.data.list, res.data.string);
        setGenImageSrc(res ? `data:image/png;base64,${res.data.string}` : "");

        setOn(true);
      }
      setGenImageLoading(false);
    } catch (error) {
      console.log("Error in POST_moveSlider");
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     console.log(url);
  //     const newSocket = io(`${url}`, {
  //       reconnection: false,
  //       // path: "/gan/socket.io",
  //     });
  //     setSocket(newSocket);
  //     return () => newSocket.close();
  //   })();
  // }, [setSocket]);

  const GET_connect = async () => {
    console.log("HIT GET_connect");
    try {
      const res = await axios.get(`${url}connect`);
      console.log(res.data);
      setSid(res.data);
    } catch (error) {}
  };

  // useEffect(() => {
  //   if (socket !== null) {
  //     socket.on("connect", () =>
  //       console.log("Socket Connection Established\nID: " + socket.id)
  //     );
  //     socket.on("connect_failed", function () {
  //       console.log("Sorry, there seems to be an issue with the connection!");
  //     });
  //     socket.on("uploadMsg", (msg: any) => setProgress(msg));
  //   }
  // }, [socket]);

  useEffect(() => {
    GET_connect();
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className="w-1/3 items-end justify-between flex flex-col pl-14 pr-8">
        <div className="w-full h-2/5 items-center justify-center align-middle flex">
          <div className="h-full w-full pb-2">
            <ImageUploader
              onReconstruct={onReconstruct}
              image={realImageSrc || ""}
              onImageUploadChange={onImageUploadChange}
            />
          </div>
        </div>
        <div className="w-full h-3/5">
          <div className="h-full w-full pt-3">
            <ParameterSetter
              onChangeSlider={onChangeSlider}
              updateSliderValue={_onChangeSlider}
              values={principleValues}
              enable={on}
            />
          </div>
        </div>
      </div>
      <div className="w-2/3 items-center justify-center align-middle flex pr-14">
        <ImageViewer image={genImageSrc || ""} isLoading={genImageLoading} />
      </div>
    </div>
  );
};

export default Workspace;
