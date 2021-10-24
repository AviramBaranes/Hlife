import React, { SetStateAction, useState } from "react";

import classes from '../../../../styles/pages/create-workout.module.scss'
import { Exercise } from "./Exercise";
import ExerciseSelect from "./ExerciseSelect";

const WorkoutExerciseForm: React.FC<{
  setExercises: React.Dispatch<SetStateAction<Exercise[]>>;
}> = ({ setExercises }) => {
  const [muscles, setMuscles] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [activeInputs,setActiveInputs] = useState({
    exerciseName:false,
    reps:false,
    sets:false,
    selectedExercise:false,
    description:false,
  })

  const submitExerciseFormHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    let name = exerciseName || (selectedExercise as string);
    if (!sets) return;
    if (!reps) return;

    const newExercise: Exercise = { name, sets, reps };
    if (description) newExercise.description = description;
    if (muscles.length) newExercise.muscles = muscles;

    setExercises((prevState) => [...prevState, newExercise]);
    setFormSubmitted(true);
  };
  return (
    <section>
      {!formSubmitted ? (
      <div className={classes.Form}>
        <div className={classes.ExerciseForm} data-testid="ExerciseForm">
          <div className={classes.Required}>
            <div className='input-container'>

            <ExerciseSelect
              setMuscles={setMuscles}
              setSelectedExercise={setSelectedExercise}
              selectedExercise={selectedExercise}
              setActiveInputs={setActiveInputs}
              />
            <label className={activeInputs.selectedExercise?'Active':''} htmlFor="exercise">Exercise:</label>
              </div>
              <div className='input-container'>
            <input
              onChange={(e) => {
                setActiveInputs(prev=>({...prev,reps:e.target.value!==''}))
                setReps(+e.target.value);
              }}
              required
              id="reps"
              type="number"
              min={1}
              max={50}
            />

              <label className={activeInputs.reps?'Active':''} htmlFor="reps">Reps</label>
            </div>
            <div className='input-container'>

            <input
              onChange={(e) => {
                setActiveInputs(prev=>({...prev,sets:e.target.value!==''}))
                setSets(+e.target.value);
              }}
              required
              id="sets"
              type="number"
              min={1}
              max={7}
              />
              <label className={activeInputs.sets?'Active':''} htmlFor="sets">Sets</label>
              </div>
          </div>

          <div className={classes.Optional}>
            <div className='input-container'>

            <input
              onChange={(e) =>{
                setActiveInputs(prev=>({...prev,exerciseName:e.target.value!==''}))
                setExerciseName(e.target.value)}
                }
              type="text"
              id="customExercise"
              />
            <label className={activeInputs.exerciseName?'Active':''} htmlFor="customExercise">Custom</label>
              </div>

              <div className='input-container'>
            <textarea
              onChange={(e) =>{
                setActiveInputs(prev=>({...prev,description:e.target.value!==''}))
                 setDescription(e.target.value)
              }}
              name="description"
              id="description"
              cols={30}
              rows={5}
              ></textarea>
            <label className={activeInputs.description?'Active':''} htmlFor="description">Description</label>
              </div>
          </div>
          
        </div>
        <button
          className='success-button'
          disabled={!reps || !sets || (!exerciseName && !selectedExercise)}
          type="button"
          onClick={submitExerciseFormHandler}
        >
          Add
        </button>
        </div>
      ) : (
        <div className={classes.ReadyExercise}>
          <h4>
            <strong>Exercise: </strong>
             {exerciseName || selectedExercise}</h4>
          {!!muscles.length && <h4> <strong>Muscles: </strong>{muscles.join(", ")}</h4>}
          <h4><strong>Reps: </strong>{reps}</h4>
          <h4><strong>Sets: </strong>{sets}</h4>
          {description && <h4><strong>Description: </strong>{description}</h4>}
        </div>
      )}
    </section>
  );
};

export default WorkoutExerciseForm;
