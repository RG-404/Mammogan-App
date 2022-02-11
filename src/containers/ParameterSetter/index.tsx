import React from "react";
import Window from "../Window";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

const SliderWithTooltip = createSliderWithTooltip(Slider);

interface SliderGroupProps {
  title: string,
  value: Number,
  onChange: Function,
  index: number
}

const SliderGroup = (props: SliderGroupProps) => {
  return (
    <div className="flex bg-[#303030] rounded-md py-1">
      <div className="ml-3 bg-[#4A4A4A] text-sm px-3 rounded-md">
        {props.title}
      </div>
      <div className="grow px-5 justify-center items-center flex">
        <SliderWithTooltip
          min={-200}
          max={200}
          value={Number(props.value)}
          onChange={(e) => {
            props.onChange(e, props.index);
          }}
        />
      </div>
    </div>
  );
};

interface ParameterType {
  onChangeSlider: Function;
  values: Number[];
}

const ParameterSetter: React.FC<ParameterType> = (props: ParameterType) => {
  return (
    <Window title="Parameter Setter">
      <div className="h-full w-full overflow-auto pt-3">
        {props.values.map((value, index) => {
          return (
            <div className="mb-2 px-2">
              <SliderGroup
                title={`P-${index + 1}`}
                value={props.values[index]}
                index={index}
                onChange={props.onChangeSlider}
              />
            </div>
          );
        })}
      </div>
    </Window>
  );
};

export default ParameterSetter;
