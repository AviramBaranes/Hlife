import React, { ReactEventHandler, SetStateAction } from "react";

const ExerciseSelect: React.FC<{
  setSelectedExercise: React.Dispatch<SetStateAction<string | null>>;
  setMuscles: React.Dispatch<SetStateAction<string[]>>;
}> = ({ setSelectedExercise, setMuscles }) => {
  const lowerBodyExercises = ["squat", "deadlift", "calf raise", "wall sit"];
  const absExercises = ["sit ups", "v ups", "leg raises"];
  const shouldersExercises = ["shoulder press", "lateral raise"];
  const chestAndTricepsExercises = [
    "bench press",
    "bench press (positive slope)",
    "bench press (negative slope)",
    "chest fly",
    "chest fly (positive slope)",
    "chest fly (negative slope)",
    "push ups",
    "push ups (positive slope)",
    "push ups (negative slope)",
    "pushdown",
    "skull crushers",
  ];
  const bicepsExercises = ["biceps curl"];
  const backAndBicepsExercises = [
    "pulldown",
    "pull up",
    "bent-over-row",
    "biceps curl",
  ];

  const exerciseSelectedHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSelectedExercise(value);

    if (bicepsExercises.includes(value)) {
      setMuscles(["biceps curl"]); //can be in backAndBicepsExercises so need to return
      return;
    }
    if (lowerBodyExercises.includes(value))
      setMuscles(["Gluteus", "Quads", "Hamstrings", "Claves"]);

    if (absExercises.includes(value)) setMuscles(["Abs"]);

    if (backAndBicepsExercises.includes(value))
      setMuscles(["Traps", "Upper back", "Lats", "Lower back", "Biceps"]);

    if (chestAndTricepsExercises.includes(value))
      setMuscles(["Chest", "Triceps"]);

    if (shouldersExercises.includes(value)) setMuscles(["Chest", "Triceps"]);
  };

  return (
    <select
      data-testid="exerciseSelect"
      value="squat"
      onChange={exerciseSelectedHandler}
      id="exercise"
    >
      <option value="squat">squat</option>
      <option value="deadlift">deadlift</option>
      <option value="calf raise">calf raise</option>
      <option value="wall sit">wall sit</option>

      <option value="bench press">bench press</option>
      <option value="bench press (positive slope)">
        bench press (positive slope)
      </option>
      <option value="bench press (negative slope)">
        bench press (negative slope)
      </option>
      <option value="chest fly">chest fly</option>
      <option value="chest fly (positive slope)">
        chest fly (positive slope)
      </option>
      <option value="chest fly (negative slope)">
        chest fly (negative slope)
      </option>
      <option value="push ups">push ups</option>
      <option value="push ups (positive slope)">
        push ups (positive slope)
      </option>
      <option value="push ups (negative slope)">
        push ups (negative slope)
      </option>

      <option value="pulldown">pulldown</option>
      <option value="pull up">pull up</option>
      <option value="bent-over-row">bent-over-row</option>

      <option value="shoulder press">shoulder press</option>
      <option value="lateral raise">lateral raise</option>

      <option value="pushdown">pushdown</option>
      <option value="skull crushers">skull crushers</option>

      <option value="biceps curl">biceps curl</option>

      <option value="sit ups">sit ups</option>
      <option value="v ups">v-ups</option>
      <option value="leg raises">leg raises</option>
    </select>
  );
};

export default ExerciseSelect;
