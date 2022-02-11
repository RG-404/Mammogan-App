import React from "react";
import Window from "../Window";

const SliderGroup = (props: any) => {
  return <div>Slider {props.title}</div>;
};

const ParameterSetter = () => {
  return (
    <Window title="Parameter Setter">
      <div className="h-full w-full">
        <SliderGroup title="Parameter 1"/>
      </div>
    </Window>
  );
};

export default ParameterSetter;
