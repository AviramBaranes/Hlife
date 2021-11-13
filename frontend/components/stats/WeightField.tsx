import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { statsActions } from '../../redux/slices/stats/statsSlice';
import RangeInput from '../UI/RangeInput/RangeInput';

const WeightField: React.FC<{ shouldDisplay: boolean }> = ({
  shouldDisplay,
}) => {
  const dispatch = useDispatch();

  const [weight, setWeight] = useState('100');
  const [touched, setTouched] = useState(false);

  return (
    <div style={{ display: shouldDisplay ? 'block' : 'none' }}>
      <RangeInput
        min='35'
        max='250'
        step='5'
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
