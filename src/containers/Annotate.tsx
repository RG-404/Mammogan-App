import React, {useState, useEffect, useRef} from 'react';
import config from "../config.json";
import CanvasDraw from "react-canvas-draw";

const url = config.url;

const Annotate = () => {

  const mask_canvas_ref = useRef(null);
  const res_canvas_ref = null;
  const b_width_slider = useRef(null);
  const base_size = {width: 512, height: 512};
  const is_mixing_gradient = false;
  const btnStyle = {width: 50, height: 25, fontSize: 10, margin: '5px'};
  const blend_position_offset = {x: 0, y:0};

  const base_canvas_ref = document.createElement('canvas');
  const src_canvas_ref = document.createElement('canvas');
  base_canvas_ref.width = src_canvas_ref.width = base_size.width;
  base_canvas_ref.height = src_canvas_ref.height = base_size.height;

  const [src_img, setSrcImg] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [brushWidth, setBrushWidth] = useState<number>(5);
  const [erase, setErase] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>('rgba(0,255,0,1.0)');
  const [maskFileName, setMaskFileName] = useState<string>('');

  // const onBaseImgChange = (genImgSrc: any) => {
  //   let base_canvas = base_canvas_ref;
  //   let base_ctx 
  //  }

  const adjustBlendPosition = () => {}

  return <div className='text-white h-full w-full flex'>   
    <div id='uploadImageSection' className='bg-red-300 h-full w-1/2'>
      <div id='canvasContainer' className='flex flex-col' >
        <CanvasDraw 
          canvasHeight={base_size.height}
          canvasWidth={base_size.width}
          ref={mask_canvas_ref}
          imgSrc={src_img}
          brushColor={brushColor}
          saveData={''}
          immediateLoading={true}
          lazyRadius={0}
        />
      </div>

      <div id='toolsSection'>
        <div id='templates'></div>
        <div id='tools'>
          <button>Draw</button>
          <button>Erase</button>
          <button onClick={adjustBlendPosition}>Proceed to blend</button>
          <div>
            <span>Adjust Brush width</span>
            <input ref={b_width_slider} type={"range"} onChange={e => setBrushWidth(parseInt(e.target.value))} value={brushWidth} />
          </div>  
        </div>
      </div>
      
    </div>
    <div id='blendResultSection' className='bg-orange-400 h-full w-1/2'>
        <div id='blendImgSection'></div>
        <div id='blendToolsSection'></div>
    </div>
  </div>;
};

export default Annotate;
