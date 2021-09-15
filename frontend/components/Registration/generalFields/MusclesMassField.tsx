import React, { useState } from "react";
import Image from "next/image";

import bodyBuilderImage from "../../../assets/images/body-builder-body.png";
import Button from "../../UI/Button/Button";
import RangeInput from "../../UI/RangeInput/RangeInput";

interface MusclesMassFieldProps {
  instructions: string | null;
  basicGoal?: string;
  shouldDisplay: boolean;
  title: string;
  buttonEvents: {
    continue: (desiredMusclesMass: string) => void;
    skip: () => void;
  };
}

const MusclesMassField: React.FC<MusclesMassFieldProps> = ({
  instructions,
  basicGoal,
  shouldDisplay,
  title,
  buttonEvents,
}) => {
  const [desiredMusclesMass, setDesiredMusclesMass] = useState("50");

  const allowedToSkip = basicGoal === "lose fat";

  return (
    <section style={{ display: `${shouldDisplay ? "block" : "none"}` }}>
      <h3>{title}</h3>
      <p>{instructions}</p>
      <RangeInput
        min="25"
        max="125"
        step="5"
        value={desiredMusclesMass}
        onChange={(e) => setDesiredMusclesMass(e.target.value)}
      />
      <Image src={bodyBuilderImage} />
      <div>
        <Button
          type="button"
          disabled={false}
          clicked={() => buttonEvents.continue(desiredMusclesMass)}
        >
          Continue
        </Button>
        <Button
          elementConfig={{
            style: { display: `${allowedToSkip ? "block" : "none"}` },
          }}
          type="button"
          disabled={false}
          clicked={buttonEvents.skip}
        >
          Skip
        </Button>
      </div>
    </section>
  );
};

export default MusclesMassField;
