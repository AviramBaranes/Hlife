import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import clipboardIcon from '../../public/icons/clipboard.png';

const AddStatsButton: React.FC<{
  basicGoal: string;
}> = ({ basicGoal }) => {
  return (
    <Link
      passHref
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
          {clipboardIcon && (
            <Image
              src={clipboardIcon}
              width={20}
              height={20}
              alt='clipboard icon'
            />
          )}
        </span>
      </button>
    </Link>
  );
};

export default AddStatsButton;
