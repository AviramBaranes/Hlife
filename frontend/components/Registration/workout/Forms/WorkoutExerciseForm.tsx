import React, { SetStateAction, useRef, useState } from "react";
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

  const submitExerciseFormHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    let name = exerciseName || (selectedExercise as string);

    if (!sets) return;
    if (!reps) return;

    const newExercise: Exercise = { name, sets, reps };
    if (description) newExercise.description = description;
    if (muscles) newExercise.muscles = muscles;

    setExercises((prevState) => [...prevState, newExercise]);
    setFormSubmitted(true);
  };

  return (
    <>
      {!formSubmitted ? (
        <div>
          <div>
            <label htmlFor="exercise">Exercise:</label>
            <ExerciseSelect
              setMuscles={setMuscles}
              setSelectedExercise={setSelectedExercise}
            />
            <label htmlFor="reps">Reps:</label>
            <input
              onChange={(e) => {
                setReps(+e.target.value);
              }}
              required
              placeholder="reps"
              id="reps"
              type="number"
              min={1}
              max={50}
            />
            <label htmlFor="sets">Sets:</label>
            <input
              onChange={(e) => {
                setSets(+e.target.value);
              }}
              required
              placeholder="sets"
              id="sets"
              type="number"
              min={1}
              max={7}
            />
          </div>

          <div>
            <label htmlFor="customExercise">Custom Exercise</label>
            <input
              onChange={(e) => setExerciseName(e.target.value)}
              placeholder="exercise"
              type="text"
              id="customExercise"
            />
            <label htmlFor="description">Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              id="description"
              cols={30}
              rows={5}
            ></textarea>
          </div>
          <button
            disabled={!reps || !sets || (!exerciseName && !selectedExercise)}
            type="button"
            onClick={submitExerciseFormHandler}
          >
            Add
          </button>
        </div>
      ) : (
        <div>
          <h4>Exercise: {exerciseName || selectedExercise}</h4>
          {!!muscles.length && <h4>Muscles: {muscles.join(" ,")}</h4>}
          <h4>Reps: {reps}</h4>
          <h4>Sets: {sets}</h4>
          {description && <h4>Description: {description}</h4>}
        </div>
      )}
    </>
  );
};

export default WorkoutExerciseForm;
