import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { statsActions } from "../../../redux/slices/stats/statsSlice";

const RequiredFields: React.FC<{ shouldDisplay: boolean }> = ({
  shouldDisplay,
}) => {
  const dispatch = useDispatch();

  const [errorDiv, setErrorDiv] = useState<JSX.Element | null>(null);
  const [rank, setRank] = useState("");
  const [inputClasses, setInputClasses] = useState({ weight: "", height: "" });
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

  useEffect(() => {
    if (!weight.valid && weight.touched) {
      setInputClasses((prevState) => ({ ...prevState, weight: "inValid" }));
    } else {
      setInputClasses((prevState) => ({ ...prevState, weight: "" }));
    }
    if (!height.valid && height.touched && height.value.length) {
      setInputClasses((prevState) => ({ ...prevState, height: "inValid" }));
    } else {
      setInputClasses((prevState) => ({ ...prevState, height: "" }));
    }
  }, [weight, height]);

  const buttonDisabled =
    !rank || !weight.valid || (!height.valid && height.touched);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "weight") {
      setWeight((prevState) => ({
        ...prevState,
        touched: true,
        value,
        valid: +value < 250 && +value > 35,
      }));
    } else {
      setHeight((prevState) => ({
        ...prevState,
        value,
        touched: true,
        valid: +value < 250 && +value > 100,
      }));
    }
  };

  function mouseOverBtnHandler(e: React.MouseEvent) {
    if (!buttonDisabled) return;

    setErrorDiv(
      <>
        <h4>Some of the fields are invalid</h4>
        <h6>Please make sure you follow the following instructions</h6>
        <ul>
          <li>weight must be between 35Kg to 250Kg</li>
          <li>height (if provided) must be in the rang of 100cm-250cm</li>
        </ul>
      </>
    );
  }

  const submitFieldsHandler = () => {
    dispatch(
      statsActions.addRequiredFields({
        weight: +weight.value,
        height: +height.value,
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
        <div>
          <input
            name="weight"
            className={inputClasses.weight}
            required
            id="weight"
            type="text"
            value={weight.value}
            onChange={inputChangeHandler}
          />
          <label htmlFor="weight">Weight</label>
        </div>

        <div>
          <input
            name="height"
            id="height"
            className={inputClasses.height}
            type="text"
            value={height.value}
            onChange={inputChangeHandler}
          />
          <label htmlFor="height">Height</label>
        </div>
      </div>

      <div>{errorDiv}</div>
      <div
        onMouseOver={mouseOverBtnHandler}
        onMouseLeave={() => setErrorDiv(null)}
      >
        <button
          disabled={buttonDisabled}
          type="button"
          onClick={submitFieldsHandler}
        >
          Continue
        </button>
      </div>
    </section>
  );
};

export default RequiredFields;
