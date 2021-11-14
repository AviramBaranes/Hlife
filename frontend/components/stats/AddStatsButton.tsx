import React from 'react';
import { PhysicalStatsType } from '../../types/Stats';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const AddStatsButton: React.FC<{
  basicGoal: string;
}> = ({ basicGoal }) => {
  return (
    <Link
      href={{
        pathname: 'stats/add-stats',
        query: {
          goal: `${basicGoal === 'lose fat' ? 'lose-fat' : 'increase-mass'}`,
        },
      }}
    >
      <button className='skip-button'>
        Add Stats
        <span>
          <FontAwesomeIcon icon={faClipboard} />
        </span>
      </button>
    </Link>
  );
};

export default AddStatsButton;
