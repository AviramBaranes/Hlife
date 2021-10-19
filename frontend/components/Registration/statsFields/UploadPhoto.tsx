import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Button from "../../UI/Button/Button";

interface UploadPhotoProps {
  shouldDisplay: boolean;
  buttonsEvents: {
    skip: () => void;
    continue: (photo: File) => void;
  };
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({
  shouldDisplay,
  buttonsEvents,
}) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoSrc, setPhotoSrc] = useState("");
  const inputRef = useRef() as React.RefObject<HTMLInputElement>;

  const dropImageEventHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = Array.from(e.dataTransfer.files);
    const url = URL.createObjectURL(file[0]);

    setPhoto(file[0]);
    setPhotoSrc(url);
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    setPhoto(files![0]);
    setPhotoSrc(URL.createObjectURL(files![0]));
  };

  return (
    <div style={{ display: `${shouldDisplay ? "block" : "none"}` }}>
      <h3>Upload an image</h3>
      <p>This field is optional, and will help you follow your progress</p>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropImageEventHandler}
      >
        <h4>Image goes here</h4>
        {!photoSrc && <FontAwesomeIcon icon={faPlusCircle} />}
        {photoSrc && <img src={photoSrc as any} />}
      </div>
      <input
        data-testid="uploadPhotoInput"
        onChange={fileInputChangeHandler}
        style={{ display: "none" }}
        type="file"
        accept="image/png, image/gif, image/jpeg, image/svg"
        name="media"
        ref={inputRef}
      />
      <button
        onClick={() => photo && buttonsEvents.continue(photo)}
        type="button"
        disabled={!photo}
      >
        Continue
      </button>
      <button disabled={false} type="button" onClick={buttonsEvents.skip}>
        Skip
      </button>
    </div>
  );
};

export default UploadPhoto;
