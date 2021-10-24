import React, { useState } from "react";
import Image from "next/image";

import classes from '../../../styles/components/PhysicalGoalsFields.module.scss'
import RangeInput from "../../UI/RangeInput/RangeInput";
import personFat_15 from "../../../assets/images/fat-percentage-images/fatPercentage15.png";
import { fatPercentageChangeHandler } from "../../../utils/registration/fields/fatPercentageFieldHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

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
    <section className={classes.Main}  style={{ display: `${shouldDisplay ? "block" : "none"}` }}>
      <h3>{title}</h3>
      <p>{instructions}</p>
      <div className={classes.Field} >

      {currentImage && <Image src={currentImage} />}
      <RangeInput
        testId="fatPercentageInput"
        min="5"
        max="40"
        step="5"
        value={desiredFatPercentage}
        unit='%'
        onChange={(event) => {
          setInputTouched(true);
          setDesiredFatPercentage(event.target.value);
          fatPercentageChangeHandler(event, setCurrentImage);
        }}
        />
        <h5>{desiredFatPercentage}%</h5>
        </div>
      <div className={classes.Buttons} >
        <button
          className='primary-button'
          type="button"
          disabled={!inputTouched}
          onClick={() => buttonsEvents.continue(+desiredFatPercentage)}
        >
          Continue
        </button>
        <button
          style={{ display: `${allowedToSkip ? "block" : "none"}` }}
          type="button"
          className='skip-button'
          disabled={!allowedToSkip}
          onClick={buttonsEvents.skip}
        >
          Skip
          <span>
            <FontAwesomeIcon icon={faForward}/>
          </span>
        </button>
      </div>
    </section>
  );
};

export default FatPercentageField;
