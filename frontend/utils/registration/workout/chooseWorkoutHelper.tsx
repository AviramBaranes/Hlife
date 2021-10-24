import fs from "fs";
import path from "path";
import axiosInstance from "../../axios/axiosInstance";

export const calculateRecommendationWorkout = async (cookies: {
  [key: string]: string;
}) => {
  try {
    const { data } = await axiosInstance.get("/program/recommendation", {
      headers: {
        Cookie: `jon=${cookies.jon}; _csrf=${cookies._csrf}; XSRF-TOKEN=${cookies["XSRF-TOKEN"]}`,
      },
    });

    if (data.length > 1) {
      const aerobicJsonData = await fs.promises.readFile(
        path.join(process.cwd(), "data", "aerobic.json")
      );
      const fbJsonData = await fs.promises.readFile(
        path.join(process.cwd(), "data", "fb.json")
      );
      const aerobicParsedData = JSON.parse(aerobicJsonData.toString());
      const fbParsedData = JSON.parse(fbJsonData.toString());
      const workoutDaysPerWeek = data[0].timesPerWeek + data[1].timesPerWeek;
      const restDaysPerWeek = 7 - workoutDaysPerWeek;
      return {
        multiProgramStyles: true,
        programStyle: `${data[0].workoutName} & ${data[1].workoutName}`,
        description: `${data[0].workoutName}: ${aerobicParsedData.description},\n${data[1].workoutName}: ${fbParsedData.description}`,
        workoutDaysPerWeek,
        restDaysPerWeek,
        order: "aerobic,FB,aerobic,X,aerobic,X,aerobic",
      };
    }
    if (data.length === 1) {
      const { workoutName, timesPerWeek } = data[0] as {
        workoutName: string;
        timesPerWeek: number;
      };
      const jsonData = await fs.promises.readFile(
        path.join(process.cwd(), "data", `${workoutName.toLowerCase()}.json`)
      );
      const parsedData = JSON.parse(jsonData.toString());

      let order = parsedData.order;

      if (workoutName === "FB" || workoutName === "aerobic") {
        switch (timesPerWeek) {
          case 1:
            order = `${workoutName},X,X,X,X,X,X`;
            break;
          case 2:
            order = `${workoutName},X,X,${workoutName},X,X,X`;
            break;
          case 3:
            order = `${workoutName},X,${workoutName},X,${workoutName},X,X`;
            break;
        }
      }
      return {
        programStyle: workoutName,
        description: parsedData.description,
        workoutDaysPerWeek: timesPerWeek,
        restDaysPerWeek: 7 - timesPerWeek,
        order,
      };
    }
  } catch (err: any) {
    return { error: true };
  }
};
