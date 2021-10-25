import React from 'react'
import Image from 'next/image'

import classes from '../../../styles/components/Layout.module.scss'
import runningPerson from '../../../assets/svg/runningPerson-loading.svg';
import Backdrop from '../Backdrop/Backdrop'

function Loading() {
    return (
        <div data-testid='loading-animation-container'>
            <Backdrop onClose={()=>{}} background='rgba(32, 30, 30, 0.671)' />
            <div className={classes.Loading}>
             {runningPerson && <Image src={runningPerson} />}
            </div>
        </div>
    )
}

export default Loading
