import React, { useState, useEffect, useRef, useContext } from "react";
import config from "../config.json";
import CanvasDraw from "react-canvas-draw";
import { DataContext } from "../context/DataProvider";
import Window from "./Window";
import axios from "axios";

const url = config.url;

const Annotate = () => {
  const { realImageSrc, genImageSrc, fileName } = useContext(DataContext);

  const mask_canvas_ref: any = useRef(null);
  let res_canvas_ref: any = null;
  const b_width_slider = useRef(null);
  const base_size = { width: 512, height: 512 };
  const is_mixing_gradient = false;
  const btnStyle = { width: 50, height: 25, fontSize: 10, margin: "5px" };
  const blend_position_offset = { x: 0, y: 0 };

  const base_canvas_ref = document.createElement("canvas");
  const src_canvas_ref = document.createElement("canvas");
  base_canvas_ref.width = src_canvas_ref.width = base_size.width;
  base_canvas_ref.height = src_canvas_ref.height = base_size.height;

  const [src_img, setSrcImg] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [brushWidth, setBrushWidth] = useState<number>(5);
  const [erase, setErase] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>("rgba(0,255,0,1.0)");
  const [maskFileName, setMaskFileName] = useState<string>("");

  const onBaseImgChange = (genImgSrc: any) => {
    let base_canvas = base_canvas_ref;
    let base_ctx: any = base_canvas.getContext("2d");
    let result_canvas: any = res_canvas_ref;
    let result_ctx = result_canvas.getContext("2d");
    let image: any = new Image();
    image.onload = function () {
      result_ctx.drawImage(image, 0, 0, base_size.width, base_size.height);
      base_ctx.drawImage(image, 0, 0, base_size.width, base_size.height);
    };
    image.src = genImgSrc;
  };

  const uploadFormData = async (formData: any) => {
    return await axios.post(`${url}annotate`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const onSrcImgChange = async (e: any) => {
    setUploading(true);
    let src_canvas: any = src_canvas_ref;
    let src_ctx = src_canvas.getContext("2d");
    let mask_ctx = mask_canvas_ref.current;
    mask_ctx.clear();
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);

    try {
      const res: any = await uploadFormData(formData);
      const img_base64 = "data:image/png;base64," + res.data;
      setSrcImg(img_base64);
      let image = new Image();
      image.onload = function () {
        src_ctx.drawImage(image, 0, 0, base_size.width, base_size.height);
        mask_ctx.drawImage(image, 0, 0, base_size.width, base_size.height);
      };
      image.src = img_base64;
    } catch (e) {
      alert("An error occured while uploading");
    } finally {
      setUploading(false);
      setMaskFileName(file.name.split(".")[0]);
    }
  };

  const adjustBlendPosition = () => {
    let src_canvas: any = src_canvas_ref;
    let src_ctx: any = src_canvas.getContext("2d");
    let mask_canvas: any = mask_canvas_ref.current;
    let result_canvas: any = res_canvas_ref;
    let result_ctx = result_canvas.getContext("2d");
    let mask_ctx = mask_canvas.canvasContainer.children[1].getContext("2d");

    let src_pixels = src_ctx.getImageData(
      0,
      0,
      base_size.width,
      base_size.height
    );
    let mask_pixels = mask_ctx.getImageData(
      0,
      0,
      base_size.width,
      base_size.height
    );
    let result_pixels = result_ctx.getImageData(
      0,
      0,
      base_size.width,
      base_size.height
    );

    for (let y = 1; y < base_size.height - 1; y++) {
      for (let x = 1; x < base_size.width - 1; x++) {
        let p = (y * base_size.width + x) * 4;
        if (
          mask_pixels.data[p] === 0 &&
          mask_pixels.data[p + 1] === 255 &&
          mask_pixels.data[p + 2] === 0 &&
          mask_pixels.data[p + 3] === 255
        ) {
          let p_offseted =
            p +
            4 *
              (blend_position_offset.y * base_size.width +
                blend_position_offset.x);
          for (let rgb = 0; rgb < 3; rgb++) {
            result_pixels.data[p_offseted + rgb] = src_pixels.data[p + rgb];
          }
        }
      }
    }
    result_ctx.putImageData(result_pixels, 0, 0);
  };

  const onClickDrawMode = () => {
    let mask_canvas = mask_canvas_ref.current;
    let mask_ctx =
      mask_canvas && mask_canvas.canvasContainer.children[1].getContext("2d");
    mask_ctx.globalCompositeOperation = "source-over";
    setErase(false);
    setBrushColor("rgba(0,255,0,1.0)");
  };

  const onClickEraseMode = () => {
    let mask_canvas = mask_canvas_ref.current;
    let mask_ctx =
      mask_canvas && mask_canvas.canvasContainer.children[1].getContext("2d");
    mask_ctx.globalCompositeOperation = "destination-out";
    setErase(true);
    setBrushColor("black");
  };

  useEffect(() => {
    // render original image initially
    let src_canvas: any = src_canvas_ref;
    let src_ctx = src_canvas.getContext("2d");
    let mask_ctx = mask_canvas_ref.current;
    mask_ctx.clear();
    let image: any = new Image();
    image.onload = function () {
      src_ctx.drawImage(image, 0, 0, base_size.width, base_size.height);
      mask_ctx.drawImage(image, 0, 0, base_size.width, base_size.height);
    };
    image.src = realImageSrc;
  }, []);

  return (
    <div className="text-white h-full w-full flex">
      {/* [*][] */}
      <div id="uploadImageSection" className="h-full w-1/2 pl-14 pr-8">
        <div className="">
          <Window
            title="Draw"
            topElement={() => {
              return (
                <div className="flex mr-2">
                  <div className="relative overflow-hidden bg-[#4A4A4A] ml-2 mr-2 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]">
                    +
                    <input
                      type="file"
                      className="absolute left-0 top-0 opacity-0"
                      onChange={onSrcImgChange}
                    />
                  </div>
                  <div
                    onClick={onClickDrawMode}
                    className="bg-[rgb(74,74,74)] mx-1 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]"
                  >
                    DRAW
                  </div>
                  <div
                    onClick={onClickEraseMode}
                    className="bg-[#4A4A4A] mx-1 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]"
                  >
                    ERASE
                  </div>
                </div>
              );
            }}
          >
            <div id="canvasContainer" className="flex flex-col">
              {/* <input type="file" onChange={onSrcImgChange} /> */}
              <CanvasDraw
                canvasHeight={base_size.height}
                canvasWidth={base_size.width}
                ref={mask_canvas_ref}
                imgSrc={src_img}
                brushColor={brushColor}
                brushRadius={brushWidth}
                saveData={""}
                immediateLoading={true}
                lazyRadius={0}
              />
            </div>
            <div className="w-full rounded-b-xl bg-[#303030] flex justify-between">
              <div className="flex items-center pl-4 w-1/2">
                <span className="text-xs mr-4 my-2">BRUSH SIZE</span>
                <input
                  ref={b_width_slider}
                  type={"range"}
                  onChange={(e) => setBrushWidth(parseInt(e.target.value))}
                  value={brushWidth}
                />
              </div>
              <div
                onClick={adjustBlendPosition}
                className="w-1/2 cursor-pointer text-sm font-bold bg-[#4A4A4A] rounded-br-xl flex justify-center items-center px-7 transition-all hover:bg-[#707070]"
              >
                PROCEED TO BLEND
              </div>
            </div>
          </Window>
        </div>
      </div>

      {/* [][*] */}
      <div id="blendResultSection" className="bg-orange-400 h-full w-1/2">
        <div id="blendImgSection">
          <canvas
            id="result-img"
            ref={(r) => {
              res_canvas_ref = r;
              if (r) onBaseImgChange(genImageSrc);
            }}
            width={base_size.width}
            height={base_size.height}
            className="bg-green-300"
          />
        </div>
        <div id="blendToolsSection"></div>
      </div>
    </div>
  );
};

export default Annotate;
