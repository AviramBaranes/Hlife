import React, { ChangeEventHandler } from "react";

const RangeInput: React.FC<{
  min: string;
  max: string;
  step: string;
  value: string;
  testId?: string;
  name?: string;
  unit?:string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ min, max, step, value, onChange, testId, name,unit='' }) => {
  return (
    <div className='range-input' >
      <p>{min}{unit}</p>
      <input
        name={name}
        data-testid={testId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <p>{max}{unit}</p>
    </div>
  );
};

export default RangeInput;
