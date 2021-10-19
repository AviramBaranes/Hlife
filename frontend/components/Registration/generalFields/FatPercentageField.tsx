import React, { useState } from "react";
import Image from "next/image";

import RangeInput from "../../UI/RangeInput/RangeInput";
import personFat_15 from "../../../assets/images/fat-percentage-images/fatPercentage15.png";
import Button from "../../UI/Button/Button";
import { fatPercentageChangeHandler } from "../../../utils/registration/fields/fatPercentageFieldHelpers";

interface FatPercentageFieldProps {
  instructions: string | null;
  basicGoal?: string;
  shouldDisplay: boolean;
  title: string;
  buttonsEvents: {
    skip: () => void;
    continue: (desiredFatPercentage: number) => void;
  };
}

const FatPercentageField: React.FC<FatPercentageFieldProps> = ({
  instructions,
  basicGoal,
  shouldDisplay,
  title,
  buttonsEvents,
}) => {
  const [desiredFatPercentage, setDesiredFatPercentage] = useState("15");
  const [inputTouched, setInputTouched] = useState(false);
  const [currentImage, setCurrentImage] = useState(personFat_15);

  const allowedToSkip =
    basicGoal === "increase muscles mass" || basicGoal === undefined;

  return (
    <section style={{ display: `${shouldDisplay ? "block" : "none"}` }}>
      <h3>{title}</h3>
      <p>{instructions}</p>
      <RangeInput
        testId="fatPercentageInput"
        min="5"
        max="40"
        step="5"
        value={desiredFatPercentage}
        onChange={(event) => {
          setInputTouched(true);
          setDesiredFatPercentage(event.target.value);
          fatPercentageChangeHandler(event, setCurrentImage);
        }}
      />
      {currentImage && <Image src={currentImage} />}
      <div>
        <button
          type="button"
          disabled={!inputTouched}
          onClick={() => buttonsEvents.continue(+desiredFatPercentage)}
        >
          Continue
        </button>
        <button
          style={{ display: `${allowedToSkip ? "block" : "none"}` }}
          type="button"
          disabled={!allowedToSkip}
          onClick={buttonsEvents.skip}
        >
          Skip
        </button>
      </div>
    </section>
  );
};

export default FatPercentageField;
