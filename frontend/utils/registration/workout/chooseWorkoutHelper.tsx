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
        path.join(__dirname, "data", "aerobic.json")
      );
      const fbJsonData = await fs.promises.readFile(
        path.join(__dirname, "data", "fb.json")
      );
      const aerobicParsedData = JSON.parse(aerobicJsonData.toString());
      const fbParsedData = JSON.parse(fbJsonData.toString());
      const workoutDaysPerWeek = data[0].timesPerWeek + data[1].timesPerWeek;
      const restDaysPerWeek = 7 - workoutDaysPerWeek;
      return {
        programStyle: `${data[0].workoutName} & ${data[1].workoutName}`,
        description: `${data[0].workoutName}: ${aerobicParsedData.description},\n${data[1].workoutName}: ${fbParsedData.description}`,
        workoutDaysPerWeek,
        restDaysPerWeek,
        order: "Aerobic,FB,Aerobic,X,Aerobic,X,Aerobic",
      };
    }
    if (data.length === 1) {
      const { workoutName, timesPerWeek } = data[0] as {
        workoutName: string;
        timesPerWeek: number;
      };
      const jsonData = await fs.promises.readFile(
        path.join(__dirname, "data", `${workoutName.toLowerCase()}.json`)
      );
      const parsedData = JSON.parse(jsonData.toString());

      let order = parsedData.order;

      if (workoutName === "FB") {
        switch (timesPerWeek) {
          case 1:
            order = "FB,X,X,X,X,X,X";
            break;
          case 2:
            order = "FB,X,X,FB,X,X,X";
            break;
          case 3:
            order = "FB,X,FB,X,FB,X,X";
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
