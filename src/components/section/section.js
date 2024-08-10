// src/App.js

import React from 'react';
import Insights from '../Insight/Insights';
import Footerr from '../footer/footer';

import MiddlePart from '../../MiddlePart';
import Whyus from '../WhyUs/Whyus'
import Nestednavbar from '../Nestednavbar/Nestednavbar'
import Hero from '../Hero/Hero'
import TestimonialSlider from '../section5/TestimonialSlider';
import Siri from '../siri/Siri';

// import Insights from '../section.6/Appp';

function Section() {
  return (
    <div className="Container">
      <Hero/>
      <Nestednavbar/>
      <Siri/>
      <Whyus/>
      <MiddlePart />
    
      <Insights />
      <TestimonialSlider/>


  
      

    </div>
  );
}

export default Section;
