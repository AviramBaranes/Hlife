import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faPlus } from '@fortawesome/free-solid-svg-icons';

import classes from '../../../styles/components/UploadImage.module.scss';

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
  const [photoSrc, setPhotoSrc] = useState('');
  const [highlight, setHighlighted] = useState(false);
  const inputRef = useRef() as React.RefObject<HTMLInputElement>;

  const dropImageEventHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHighlighted(true);
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
    <div style={{ display: `${shouldDisplay ? 'block' : 'none'}` }}>
      <div className={classes.Title}>
        <h3>Upload an image</h3>
        <p>This field is optional, and will help you follow your progress</p>
      </div>
      <div
        className={`${classes.DropDiv} ${photoSrc ? classes.Active : ''} ${
          highlight ? classes.Highlight : ''
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setHighlighted(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setHighlighted(false);
        }}
        onDrop={dropImageEventHandler}
      >
        <h4>Image goes here</h4>
        {!photoSrc && <FontAwesomeIcon size='2x' icon={faPlus} />}
        {photoSrc && (
          <Image
            alt='user picture'
            width={400}
            height={400}
            loader={() => photoSrc}
            src={photoSrc as any}
          />
        )}
      </div>
      <input
        data-testid='uploadPhotoInput'
        onChange={fileInputChangeHandler}
        style={{ display: 'none' }}
        type='file'
        accept='image/png, image/gif, image/jpeg, image/svg'
        name='media'
        ref={inputRef}
      />
      <div className={classes.Buttons}>
        <button
          className='primary-button'
          onClick={() => photo && buttonsEvents.continue(photo)}
          type='button'
          disabled={!photo}
        >
          Continue
        </button>
        <button
          className='skip-button'
          disabled={false}
          type='button'
          onClick={buttonsEvents.skip}
        >
          Skip
          <span>
            <FontAwesomeIcon icon={faForward} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default UploadPhoto;
