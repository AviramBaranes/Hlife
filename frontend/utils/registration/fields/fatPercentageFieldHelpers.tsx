import React from "react";

export const fatPercentageChangeHandler = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setCurrentImage: React.Dispatch<React.SetStateAction<StaticImageData>>
) => {
  let image: StaticImageData | unknown;
  switch (event.target.value) {
    case "5":
      image = (await import(
        "../../../assets/images/fat-percentage-images/fatPercentage5.png"
      )) as unknown;
      setCurrentImage(image as StaticImageData);
      break;
    case "10":
      image = (await import(
        "../../../assets/images/fat-percentage-images/fatPercentage10.png"
      )) as unknown;
      setCurrentImage(image as StaticImageData);
      break;
    case "15":
      image = (await import(
        "../../../assets/images/fat-percentage-images/fatPercentage15.png"
      )) as unknown;
      setCurrentImage(image as StaticImageData);
      break;
    case "20":
      image = (await import(
        "../../../assets/images/fat-percentage-images/fatPercentage20.png"
      )) as unknown;
      setCurrentImage(image as StaticImageData);
      break;
    case "25":
      image = (await import(
        "../../../assets/images/fat-percentage-images/fatPercentage25.png"
      )) as unknown;
      setCurrentImage(image as StaticImageData);
      break;
    case "30":
      image = (await import(
        "../../../assets/images/fat-percentage-images/fatPercentage30.png"
      )) as unknown;
      setCurrentImage(image as StaticImageData);
      break;
    case "35":
      image = (await import(
        "../../../assets/images/fat-percentage-images/fatPercentage35.png"
      )) as unknown;
      setCurrentImage(image as StaticImageData);
      break;
    case "40":
      image = (await import(
        "../../../assets/images/fat-percentage-images/fatPercentage40.png"
      )) as unknown;
      setCurrentImage(image as StaticImageData);
      break;
  }
};
