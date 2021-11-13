import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FatPercentageField from '../../components/Registration/generalFields/FatPercentageField';
import MusclesMassField from '../../components/Registration/generalFields/MusclesMassField';
import UploadPhoto from '../../components/Registration/statsFields/UploadPhoto';
import WeightField from '../../components/stats/WeightField';
import { RootState } from '../../redux/store/reduxStore';
import protectRouteHandler from '../../utils/protectedRoutes/protectedRoutes';
import { createStatsProps } from '../../utils/stats/statsHelpers';

const addStats: React.FC<{ goal: string }> = ({ goal }) => {
  goal = goal === 'increase-mass' ? 'increase muscles mass' : 'lose fat';

  const dispatch = useDispatch();

  const { statsReducer } = useSelector((state: RootState) => state);
  const { fatPercentage, musclesMass, weight } = statsReducer;
  const [shouldSkipFatPercentage, setShouldSkipFatPercentage] = useState(false);
  const [shouldSkipMusclesMass, setShouldSkipMusclesMass] = useState(false);

  //booleans
  const displayRequiredFields = !weight;
  const shouldDisplayFatPercentageField = Boolean(
    weight && !fatPercentage && !shouldSkipFatPercentage
  );
  const shouldDisplayMusclesMassField = Boolean(
    (weight && fatPercentage && !shouldSkipMusclesMass && !musclesMass) ||
      (weight &&
        shouldSkipFatPercentage &&
        !shouldSkipMusclesMass &&
        !musclesMass)
  );
  const shouldDisplayUploadPhotoField = Boolean(
    (weight && fatPercentage && musclesMass) ||
      (weight && fatPercentage && shouldSkipMusclesMass) ||
      (weight && shouldSkipFatPercentage && musclesMass) ||
      (weight && shouldSkipFatPercentage && shouldSkipMusclesMass)
  );

  const {
    buttonEventsForFatPercentageField,
    buttonEventsForMuscleMassField,
    buttonEventsForPhotoField,
  } = createStatsProps(
    setShouldSkipFatPercentage,
    setShouldSkipMusclesMass,
    dispatch,
    weight,
    musclesMass,
    fatPercentage
  );

  return (
    <div>
      <WeightField shouldDisplay={displayRequiredFields} />

      <FatPercentageField
        basicGoal={goal}
        instructions=''
        shouldDisplay={shouldDisplayFatPercentageField}
        title='What is your current fat percentage?'
        buttonsEvents={buttonEventsForFatPercentageField}
      />

      <MusclesMassField
        basicGoal={goal}
        instructions=''
        shouldDisplay={shouldDisplayMusclesMassField}
        title='What is your current muscles mass?'
        buttonsEvents={buttonEventsForMuscleMassField}
      />

      <UploadPhoto
        buttonsEvents={buttonEventsForPhotoField}
        shouldDisplay={shouldDisplayUploadPhotoField}
      />
    </div>
  );
};

export default addStats;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { destination } = await protectRouteHandler(ctx);

  if (destination === '/') {
    const { goal } = ctx.query;
    if (!goal) return { redirect: { destination: '/stats', permanent: false } };
    else return { props: { goal } };
  } else {
    return { redirect: { destination, permanent: false } };
  }
};
