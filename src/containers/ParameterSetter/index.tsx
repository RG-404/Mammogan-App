import React, { useState, useEffect } from "react";
import Window from "../Window";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

const SliderWithTooltip = createSliderWithTooltip(Slider);

interface ParameterType {
  onChangeSlider: Function;
  values: any[];
  enable: boolean;
}

const ParameterSetter: React.FC<ParameterType> = (props: ParameterType) => {
  return (
    <Window title="Parameter Setter">
      <div className="h-full w-full overflow-auto relative">
        {!props.enable ? (
          <div className="w-full h-full absolute rounded-b-xl flex justify-center items-center z-40 text-white cursor-not-allowed"></div>
        ) : null}
        {props.values.map((value, index) => {
          return (
            <div
              className={`mb-2 px-2 ${index === 0 ? "mt-3" : null}`}
              key={index}
            >
              <div className="flex bg-[#303030] rounded-md py-1">
                <div className="ml-3 bg-[#4A4A4A] text-sm px-3 rounded-md">
                  {`P-${index + 1}`}
                </div>
                <div className="grow px-5 justify-center items-center flex">
                  <SliderWithTooltip
                    min={-200}
                    max={200}
                    value={value}
                    onChange={(e) => {
                      props.onChangeSlider(e, index);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Window>
  );
};

export default ParameterSetter;
