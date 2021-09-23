import React, { useEffect, useState } from "react";
import Input from "../../UI/Input/Input";

const CreateAerobicWorkout: React.FC = () => {
  const [timesPerWeek, setTimesPerWeek] = useState<number[]>([]);

  useEffect(() => {
    const arrayLength = +localStorage.getItem("timesPerWeek")!;
    for (let i = 1; i <= arrayLength; i++) {
      setTimesPerWeek((prevState) => [...prevState, i]);
    }
  }, []);

  return (
    <div>
      <h4>Workout 1:</h4>
      <form>
        <Input
          htmlFor="workout-name"
          label="Workout Name"
          inValid={}
          inputChangeHandler={}
          touched={}
          type="text"
          value={}
        />
        <Input
          htmlFor="time"
          label="Time"
          inValid={}
          inputChangeHandler={}
          touched={}
          type="text"
          value={}
        />
        <label htmlFor="description"></label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={10}
        ></textarea>
      </form>
    </div>
  );
};

export default CreateAerobicWorkout;
