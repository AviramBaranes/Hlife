import React from 'react';
import Image from 'next/image';

import classes from '../styles/pages/about.module.scss';
import gitHubIcon from '../assets/images/Links/github.png';
import linkedinIcon from '../assets/images/Links/linkedin.png';
import myPhoto from '../assets/images/developer/aviram.jpg';

const About: React.FC = () => {
  return (
    <div>
      <div className={classes.AboutAppSec}>
        <h3>The App</h3>
        <p>
          Hlife mission is to allow users to achieve their physical goals as
          soon and as easy as possible.
        </p>
        <p>
          It does it by creating for the user a custom program and goals list.
          Then the user can declare on his progress every day. By this Hlife is
          able to track the user progress over time, and displaying it in
          detailed graphs.
        </p>
      </div>
      <div className={classes.FeaturesSec}>
        <h5>Features To Come</h5>
        <ul>
          <li>Diet tracking</li>
          <li>User Ranks</li>
          <li>Followers</li>
          <li>Chat</li>
        </ul>
      </div>
      <div className={classes.AboutDevSec}>
        <h3>The Developer</h3>
        <div className={classes.DevContent}>
          <p>
            My name is Aviram Baranes, I am 20 years old. I am a self taught
            full-stack developer primarily using Node-js and React-js with
            typescript. Loves to do sport mainly calisthenics and Karate (black
            belt).
          </p>
          <Image src={myPhoto} />
        </div>
      </div>
      <div className={classes.LinksSec}>
        <h5>Find me here:</h5>
        <div className={classes.Links}>
          <a href='https://github.com/AviramBaranes' target='_blank'>
            <Image width={50} height={50} src={gitHubIcon} />
          </a>
          <a href='https://www.linkedin.com/in/aviram-baranes/' target='_blank'>
            <Image width={50} height={50} src={linkedinIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
