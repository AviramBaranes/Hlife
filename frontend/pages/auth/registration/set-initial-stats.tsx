import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../../../styles/pages/set-initial-stats.module.scss';
import FatPercentageField from '../../../components/Registration/generalFields/FatPercentageField';
import MusclesMassField from '../../../components/Registration/generalFields/MusclesMassField';
import RequiredFields from '../../../components/Registration/statsFields/RequiredFields';
import UploadPhoto from '../../../components/Registration/statsFields/UploadPhoto';
import { RootState } from '../../../redux/store/reduxStore';
import protectRouteHandler from '../../../utils/protectedRoutes/protectedRoutes';
import { createStatsProps } from '../../../utils/registration/stats/setInitialStatsHelpers';

const SetInitialStats: React.FC = () => {
  //state
  const dispatch = useDispatch();

  const { statsReducer } = useSelector((state: RootState) => state);
  const { fatPercentage, musclesMass, weight, rank, height } = statsReducer;
  const [shouldSkipFatPercentage, setShouldSkipFatPercentage] = useState(false);
  const [shouldSkipMusclesMass, setShouldSkipMusclesMass] = useState(false);

  //booleans
  const required = weight && rank;
  const displayRequiredFields = !required;
  const shouldDisplayFatPercentageField = Boolean(
    required && !fatPercentage && !shouldSkipFatPercentage
  );
  const shouldDisplayMusclesMassField = Boolean(
    (required && fatPercentage && !shouldSkipMusclesMass && !musclesMass) ||
      (required &&
        shouldSkipFatPercentage &&
        !shouldSkipMusclesMass &&
        !musclesMass)
  );
  const shouldDisplayUploadPhotoField = Boolean(
    (required && fatPercentage && musclesMass) ||
      (required && fatPercentage && shouldSkipMusclesMass) ||
      (required && shouldSkipFatPercentage && musclesMass) ||
      (required && shouldSkipFatPercentage && shouldSkipMusclesMass)
  );

  const {
    buttonEventsForFatPercentageField,
    buttonEventsForMuscleMassField,
    buttonEventsForPhotoField,
  } = createStatsProps(
    setShouldSkipFatPercentage,
    setShouldSkipMusclesMass,
    dispatch,
    rank,
    weight,
    musclesMass,
    height,
    fatPercentage
  );

  return (
    <section className={classes.Main}>
      <RequiredFields shouldDisplay={displayRequiredFields} />

      <FatPercentageField
        instructions='This field is optional'
        shouldDisplay={shouldDisplayFatPercentageField}
        title='What is your current fat percentage?'
        buttonsEvents={buttonEventsForFatPercentageField}
      />

      <MusclesMassField
        instructions='This field is optional'
        shouldDisplay={shouldDisplayMusclesMassField}
        title='What is your current muscles mass?'
        buttonsEvents={buttonEventsForMuscleMassField}
      />

      <UploadPhoto
        buttonsEvents={buttonEventsForPhotoField}
        shouldDisplay={shouldDisplayUploadPhotoField}
      />
    </section>
  );
};

export default SetInitialStats;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { destination } = await protectRouteHandler(ctx);
  if (destination === '/auth/registration/set-initial-stats') {
    return { props: {} };
  } else {
    return { redirect: { destination, permanent: false } };
  }
};
