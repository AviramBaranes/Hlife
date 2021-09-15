import React, { ChangeEventHandler, Dispatch } from "react";

const RangeInput: React.FC<{
  min: string;
  max: string;
  step: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ min, max, step, value, onChange }) => {
  return (
    <>
      <p>{min}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <p>{max}</p>
    </>
  );
};

export default RangeInput;
