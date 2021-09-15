import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import { useDispatch } from "react-redux";
import Input from "../../UI/Input/Input";
import { statsActions } from "../../../redux/slices/stats/statsSlice";

const RequiredFields: React.FC<{ shouldDisplay: boolean }> = ({
  shouldDisplay,
}) => {
  const dispatch = useDispatch();

  const [rank, setRank] = useState("");

  const [weight, setWeight] = useState({
    value: "",
    valid: false,
    touched: false,
  });

  const [height, setHeight] = useState({
    value: "",
    valid: false,
    touched: false,
  });

  const buttonDisabled =
    !rank || !weight.valid || (!height.valid && height.touched);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "weight") {
      let valid = false;
      setWeight((prevState) => {
        const newState = { ...prevState };
        newState.touched = true;
        newState.value = value;
        if (+value < 250 && +value > 35) {
          valid = true;
        }
        newState.valid = valid;
        return newState;
      });
    } else {
      let valid = false;
      setHeight((prevState) => {
        const newState = { ...prevState };
        newState.touched = true;
        newState.value = value;
        if (+value < 250 && +value > 100) {
          valid = true;
        }
        if (!value) valid = true;
        newState.valid = valid;
        return newState;
      });
    }
  };

  const submitFieldsHandler = () => {
    dispatch(
      statsActions.addRequiredFields({
        weight: weight.value,
        height: height.value,
        rank,
      })
    );
  };

  return (
    <section style={{ display: `${shouldDisplay ? "block" : "none"}` }}>
      <h3>
        What is your current level?<span>*</span>
      </h3>
      <div>
        <div onClick={(e) => setRank(e.currentTarget.textContent!)}>
          <h4>Beginner</h4>
        </div>
        <div onClick={(e) => setRank(e.currentTarget.textContent!)}>
          <h4>Intermediate</h4>
        </div>
        <div onClick={(e) => setRank(e.currentTarget.textContent!)}>
          <h4>Advanced</h4>
        </div>
        <div onClick={(e) => setRank(e.currentTarget.textContent!)}>
          <h4>Pro</h4>
        </div>
      </div>
      <span></span>
      <div>
        <Input
          label="Weight"
          type="text"
          value={weight.value}
          inputChangeHandler={inputChangeHandler}
          inValid={!weight.valid}
          touched={weight.touched}
          htmlFor="weight"
        />
        <Input
          label="Height"
          type="text"
          value={height.value}
          inputChangeHandler={inputChangeHandler}
          inValid={!height.valid && height.touched}
          touched={height.touched}
          htmlFor="height"
        />
      </div>
      <Button
        disabled={buttonDisabled}
        type="button"
        clicked={submitFieldsHandler}
      >
        Continue
      </Button>
    </section>
  );
};

export default RequiredFields;
