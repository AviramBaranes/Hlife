import { faWeight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from '../../styles/pages/stats.module.scss';
import { statsActions } from '../../redux/slices/stats/statsSlice';
import RangeInput from '../UI/RangeInput/RangeInput';

const WeightField: React.FC<{ shouldDisplay: boolean }> = ({
  shouldDisplay,
}) => {
  const dispatch = useDispatch();

  const [weight, setWeight] = useState('100');
  const [touched, setTouched] = useState(false);

  return (
    <div
      className={classes.WeightField}
      style={{ display: shouldDisplay ? 'block' : 'none' }}
    >
      <h3>Weight Progress</h3>
      <p>Please enter your curren weight.</p>
      <FontAwesomeIcon icon={faWeight} />

      <RangeInput
        min='35'
        max='250'
        step='0.5'
        value={weight}
        onChange={(e) => {
          setWeight(e.target.value);
          setTouched(true);
        }}
        unit='Kg'
      />
      <p>{weight} (Kg)</p>
      <button
        className='primary-button'
        disabled={!touched}
        onClick={() => {
          dispatch(
            statsActions.addRequiredFields({
              weight: +weight,
            })
          );
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default WeightField;
