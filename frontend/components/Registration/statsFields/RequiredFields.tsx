import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import classes from '../../../styles/pages/set-initial-stats.module.scss'
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
    active:false
  });
  const [height, setHeight] = useState({
    value: "",
    valid: false,
    touched: false,
    active:false
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
        active:value!==''
      }));
    } else {
      setHeight((prevState) => ({
        ...prevState,
        value,
        touched: true,
        valid: +value < 250 && +value > 100,
        active:value!==''
      }));
    }
  };

  function mouseOverBtnHandler(e: React.MouseEvent) {
    if (!buttonDisabled) return;

    setErrorDiv(
      <>
      <section>
        <h4>Some of the fields are invalid</h4>
        <h6>Please make sure you follow the following instructions</h6>
      </section>
        <ul>
          <li>You need to choose your current level</li>
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

  function getClassName(text:string){
    let initialClass = classes.Rank + ' '
    rank === text && (initialClass+=classes.Active)
    return initialClass
  }

  return (
    <section className={classes.RequiredField} style={{ display: `${shouldDisplay ? "block" : "none"}` }}>
      <div className={classes.Title}>
      <h1>Fill your current stats</h1>
      <p>This action will gain you 15 points!</p>
    </div>
      <h3>
        What is your current level?<span>*</span>
      </h3>
      <div className={classes.Ranks}>
        <div className={getClassName('Beginner')}  onClick={(e) => setRank(e.currentTarget.textContent!)}>
          <h4>Beginner</h4>
        </div>
        <div className={getClassName('Intermediate')}  onClick={(e) => setRank(e.currentTarget.textContent!)}>
          <h4>Intermediate</h4>
        </div>
        <div className={getClassName('Advanced')}  onClick={(e) => setRank(e.currentTarget.textContent!)}>
          <h4>Advanced</h4>
        </div>
        <div className={getClassName('Pro')}  onClick={(e) => setRank(e.currentTarget.textContent!)}>
          <h4>Pro</h4>
        </div>
      </div>
      <div className={classes.Inputs}>
        <div className='input-container' >
          <input
            name="weight"
            className={inputClasses.weight}
            required
            id="weight"
            type="text"
            value={weight.value}
            onChange={inputChangeHandler}
          />
          <label className={weight.active?'Active':''} htmlFor="weight">Weight (KG)</label>
        </div>

        <div className='input-container'>
          <input
           
            name="height"
            id="height"
            className={inputClasses.height}
            type="text"
            value={height.value}
            onChange={inputChangeHandler}
          />
          <label className={height.active?'Active':''} htmlFor="height">Height (Cm)</label>
        </div>
      </div>

      {errorDiv &&<div className={'error-div'+' '+classes.ErrorDiv}>{errorDiv}</div>}
      <div
      className='error-detector-div'
        onMouseOver={mouseOverBtnHandler}
        onMouseLeave={() => setErrorDiv(null)}
      >
        <button
          disabled={buttonDisabled}
          type="button"
          onClick={submitFieldsHandler}
          className='primary-button'
        >
          Continue
        </button>
      </div>
    </section>
  );
};

export default RequiredFields;
