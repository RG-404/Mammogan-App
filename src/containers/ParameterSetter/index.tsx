import React from "react";
import Window from "../Window";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

const sliderData = [22, 12, 3, 54, 22, 12, 3, 54, 22, 12];

const SliderWithTooltip = createSliderWithTooltip(Slider);

const SliderGroup = (props: any) => {
  return (
    <div className="flex bg-[#303030] rounded-md py-1">
      <div className="ml-3 bg-[#4A4A4A] text-sm px-3 rounded-md">
        {props.title}
      </div>
      <div className="grow px-5 justify-center items-center flex">
        <SliderWithTooltip value={props.value} />
      </div>
    </div>
  );
};

const ParameterSetter = () => {
  return (
    <Window title="Parameter Setter">
      <div className="h-full w-full overflow-x-auto pt-3">
        {sliderData.map((value, index) => {
          return (
            <div className="mb-2 px-2">
              <SliderGroup title={`P-${index + 1}`} value />
            </div>
          );
        })}
      </div>
    </Window>
  );
};

export default ParameterSetter;
