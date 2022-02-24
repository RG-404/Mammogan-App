import React, { useState, useEffect, useRef, useContext } from "react";
import config from "../config.json";
import CanvasDraw from "react-canvas-draw";
import { DataContext } from "../context/DataProvider";
import Window from "./Window";
import axios from "axios";
import { saveAs } from "file-saver";

const url = config.url;

const Annotate = () => {
  const { realImageSrc, genImageSrc, fileName } = useContext(DataContext);
  const mask_canvas_ref: any = useRef(null);
  let res_canvas_ref: any = null;
  const b_width_slider = useRef(null);
  const base_size = { width: 512, height: 512 };
  let is_mixing_gradients = false;
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

  const moveBlendPosition = (direction: any) => {
    let mask_canvas = mask_canvas_ref.current;
    let mask_ctx = mask_canvas.canvasContainer.children[1].getContext("2d");
    let mask_pixels = mask_ctx.getImageData(
      0,
      0,
      base_size.width,
      base_size.height
    );
    let max = { x: base_size.width - 2, y: base_size.height - 2 },
      min = { x: 0, y: 0 };

    if (direction === "up") {
      blend_position_offset.y -= 10;
    } else if (direction === "right") {
      blend_position_offset.x += 10;
    } else if (direction === "down") {
      blend_position_offset.y += 10;
    } else if (direction === "left") {
      blend_position_offset.x -= 10;
    }

    for (let y = 1; y < base_size.height - 1; y++) {
      for (let x = 1; x < base_size.width - 1; x++) {
        let p = (y * base_size.width + x) * 4;
        if (
          mask_pixels.data[p] === 0 &&
          mask_pixels.data[p + 1] === 255 &&
          mask_pixels.data[p + 2] === 0 &&
          mask_pixels.data[p + 3] === 255
        ) {
          if (
            x + blend_position_offset.x > max.x ||
            x + blend_position_offset.x < min.x ||
            y + blend_position_offset.y > max.y ||
            y + blend_position_offset.y < min.y
          ) {
            if (direction === "up") {
              blend_position_offset.y += 10;
            } else if (direction === "right") {
              blend_position_offset.x -= 10;
            } else if (direction === "down") {
              blend_position_offset.y -= 10;
            } else if (direction === "left") {
              blend_position_offset.x += 10;
            }

            return false;
          }
        }
      }
    }

    let result_canvas = res_canvas_ref;
    let result_ctx = result_canvas.getContext("2d");
    let image: any = new Image();
    image.onload = function () {
      result_ctx.drawImage(image, 0, 0, base_size.width, base_size.height);
      adjustBlendPosition();
    };
    image.src = genImageSrc;
  };

  const blendImages = () => {
    let src_canvas = src_canvas_ref;
    let src_ctx: any = src_canvas.getContext("2d");
    let mask_canvas = mask_canvas_ref.current;
    let result_canvas = res_canvas_ref;
    let result_ctx = result_canvas.getContext("2d");
    let mask_ctx = mask_canvas.canvasContainer.children[1].getContext("2d");
    let base_canvas = base_canvas_ref;
    let base_ctx: any = base_canvas.getContext("2d");

    let base_pixels = base_ctx.getImageData(
      0,
      0,
      base_size.width,
      base_size.height
    );
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

    let dx,
      absx,
      previous_epsilon = 1.0;
    let cnt = 0;

    do {
      dx = 0;
      absx = 0;
      for (let y = 1; y < base_size.height - 1; y++) {
        for (let x = 1; x < base_size.width - 1; x++) {
          // p is current pixel
          // rgba r=p+0, g=p+1, b=p+2, a=p+3
          let p = (y * base_size.width + x) * 4;

          // Mask area is painted rgba(0,255,0,1.0)
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

            // q is array of connected neighbors
            let q = [
              ((y - 1) * base_size.width + x) * 4,
              ((y + 1) * base_size.width + x) * 4,
              (y * base_size.width + (x - 1)) * 4,
              (y * base_size.width + (x + 1)) * 4,
            ];
            let num_neighbors = q.length;

            for (let rgb = 0; rgb < 3; rgb++) {
              let sum_fq = 0;
              let sum_vpq = 0;
              let sum_boundary = 0;

              for (let i = 0; i < num_neighbors; i++) {
                let q_offseted =
                  q[i] +
                  4 *
                    (blend_position_offset.y * base_size.width +
                      blend_position_offset.x);

                if (
                  mask_pixels.data[q[i] + 0] === 0 &&
                  mask_pixels.data[q[i] + 1] === 255 &&
                  mask_pixels.data[q[i] + 2] === 0 &&
                  mask_pixels.data[q[i] + 3] === 255
                ) {
                  sum_fq += result_pixels.data[q_offseted + rgb];
                } else {
                  sum_boundary += base_pixels.data[q_offseted + rgb];
                }

                if (
                  is_mixing_gradients &&
                  Math.abs(
                    base_pixels.data[p_offseted + rgb] -
                      base_pixels.data[q_offseted + rgb]
                  ) >
                    Math.abs(
                      src_pixels.data[p + rgb] - src_pixels.data[q[i] + rgb]
                    )
                ) {
                  sum_vpq +=
                    base_pixels.data[p_offseted + rgb] -
                    base_pixels.data[q_offseted + rgb];
                } else {
                  sum_vpq +=
                    src_pixels.data[p + rgb] - src_pixels.data[q[i] + rgb];
                }
              }
              let new_value = (sum_fq + sum_vpq + sum_boundary) / num_neighbors;
              dx += Math.abs(new_value - result_pixels.data[p_offseted + rgb]);
              absx += Math.abs(new_value);
              result_pixels.data[p_offseted + rgb] = new_value;
            }
          }
        }
      }
      cnt++;
      let epsilon = dx / absx;
      if (!epsilon || previous_epsilon - epsilon <= 1e-5) break;
      // convergence
      else previous_epsilon = epsilon;
    } while (true);
    result_ctx.putImageData(result_pixels, 0, 0);

    alert(cnt + " times iterated.");
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

  const onClickSaveBlend = () => {
    let result_canvas = res_canvas_ref;
    // const fileName = `L_${this.props.leftFileName}_R_${this.props.rightFileName}_Z_${this.props.sliderValue}.png`;
    const filename = `${fileName}_gen+blend.png`;
    result_canvas.toBlob(function (blob: any) {
      saveAs(blob, filename);
    });
  };

  const loadIntialSourceImage = async () => {
    // render original image initially
    setUploading(true);
    let src_canvas: any = src_canvas_ref;
    let src_ctx = src_canvas.getContext("2d");
    let mask_ctx = mask_canvas_ref.current;
    mask_ctx.clear();
    try {
      const img_base64: any = realImageSrc;
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
    }
  };

  useEffect(() => {
    loadIntialSourceImage();
  }, []);

  return (
    <div className="text-white h-full w-full flex select-none">
      {/* [*][] */}
      <div id="uploadImageSection" className="h-full w-1/2 pl-14 pr-8">
        <div className="">
          <Window
            title="Draw"
            topElement={() => {
              return (
                <div className="flex mr-2">
                  <div className="relative overflow-hidden bg-[#4A4A4A] ml-2 mr-2 px-2 text-sm justify-center items-center flex rounded-md cursor-pointer transition-all hover:bg-[#707070]">
                    CHANGE SOURCE IMAGE
                    <input
                      type="file"
                      className="absolute left-0 top-0 opacity-0 cursor-pointer"
                      style={{cursor: "pointer"}}
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
      <div id="blendResultSection" className="w-1/2 pr-8">
        <div className="flex flex-col h-full">
          <Window title="Adjust blend position">
            <canvas
              style={{ height: "100%" }}
              id="result-img"
              ref={(r) => {
                res_canvas_ref = r;
                if (r) onBaseImgChange(genImageSrc);
              }}
              width={base_size.width}
              height={base_size.height}
            />
          </Window>
          <div className="mt-4 h-full">
            <Window title="Adjust blend position">
              <div className="h-full w-full flex">
                <div className="h-full w-1/2 flex justify-center items-center">
                  <div className="bg-[#303030] p-4 rounded-xl">
                    <svg
                      viewBox="0 0 50 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20"
                    >
                      <rect
                        x={5}
                        y={27}
                        width={3}
                        height={20}
                        transform="rotate(-90 5 27)"
                        fill="#828282"
                      />
                      <path
                        className="cursor-pointer"
                        onClick={() => {
                          moveBlendPosition("left");
                        }}
                        d="M1.13286e-07 25.5L14.25 17.2728L14.25 33.7272L1.13286e-07 25.5Z"
                        fill="#828282"
                      />
                      <rect
                        x="26.5"
                        y="45.5"
                        width={3}
                        height={20}
                        transform="rotate(180 26.5 45.5)"
                        fill="#828282"
                      />
                      <path
                        className="cursor-pointer"
                        onClick={() => {
                          moveBlendPosition("down");
                        }}
                        d="M25 50.5L16.7728 36.25L33.2272 36.25L25 50.5Z"
                        fill="#828282"
                      />
                      <rect
                        x={45}
                        y={24}
                        width={3}
                        height={20}
                        transform="rotate(90 45 24)"
                        fill="#828282"
                      />
                      <path
                        className="cursor-pointer"
                        onClick={() => {
                          moveBlendPosition("right");
                        }}
                        d="M50 25.5L35.75 33.7272L35.75 17.2728L50 25.5Z"
                        fill="#828282"
                      />
                      <rect
                        x="23.5"
                        y="5.5"
                        width={3}
                        height={20}
                        fill="#828282"
                      />
                      <path
                        className="cursor-pointer"
                        onClick={() => {
                          moveBlendPosition("up");
                        }}
                        d="M25 0.500001L33.2272 14.75L16.7728 14.75L25 0.500001Z"
                        fill="#828282"
                      />
                    </svg>
                  </div>
                  <div className="bg-[#303030]"></div>
                </div>

                <div className="h-full w-1/2 flex justify-center items-center">
                  <div className="flex flex-col">
                    <button
                      onClick={blendImages}
                      className="bg-[#303030] text-sm font-bold px-6 py-2 rounded-xl transition-all hover:bg-gray-500 cursor-pointer mb-3"
                    >
                      START BLENDING
                    </button>
                    <button
                      onClick={onClickSaveBlend}
                      className="bg-[#303030] text-sm font-bold px-6 py-2 rounded-xl transition-all hover:bg-gray-500 cursor-pointer"
                    >
                      SAVE BLEND
                    </button>
                  </div>
                </div>
              </div>
            </Window>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annotate;
