import React, { useState } from "react";
import Image from "next/image";

import slimBody from "../../../assets/images/slim-body.png";
import muscleBody from "../../../assets/images/muscle-body.png";
import RangeInput from "../../UI/RangeInput/RangeInput";
import { useDispatch } from "react-redux";
import { goalsActions } from "../../../redux/slices/goals/goalsSlice";

const RequiredFields: React.FC<{ shouldDisplay: boolean }> = ({
  shouldDisplay,
}) => {
  const dispatch = useDispatch();

  const [basicGoal, setBasicGoal] = useState("");
  const [desiredWeight, setDesiredWeight] = useState("80");
  const [touched, setTouched] = useState(false);

  const rangeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setDesiredWeight(e.target.value);
  };

  const basicGoalChangeHandler = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    let basicGoal: "lose fat" | "increase muscles mass";

    if (e.currentTarget.children[0].textContent === "Lose Fat")
      basicGoal = "lose fat";
    if (e.currentTarget.children[0].textContent === "Gain Muscle")
      basicGoal = "increase muscles mass";

    setBasicGoal(basicGoal!);
  };

  const submitFieldsHandler = () => {
    dispatch(
      goalsActions.addRequiredFields({
        basicGoal,
        desiredWeight: +desiredWeight,
      })
    );
  };

  return (
    <>
      <section style={{ display: `${shouldDisplay ? "block" : "none"}` }}>
        <h3>
          What is your basic goal?<span>*</span>
        </h3>
        <div>
          <div onClick={basicGoalChangeHandler}>
            <h4>Lose Fat</h4>
            {slimBody && <Image src={slimBody} />}
          </div>
          <div onClick={basicGoalChangeHandler}>
            <h4>Gain Muscle</h4>
            {muscleBody && <Image src={muscleBody} />}
          </div>
        </div>
        <div>
          <h4>
            What is your desired weight?<span>*</span>
          </h4>
          <RangeInput
            testId="goalsRequiredFields"
            min="30"
            name="desired-weight"
            max="225"
            step="5"
            value={desiredWeight}
            onChange={rangeChangeHandler}
          />
        </div>
        <button
          disabled={!basicGoal && !touched}
          type="button"
          onClick={submitFieldsHandler}
        >
          Continue
        </button>
      </section>
    </>
  );
};

export default RequiredFields;
