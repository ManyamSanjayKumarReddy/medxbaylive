import React, { useState } from 'react';
import './Siri.css';
import Siriimge from '../Assets/Siri.svg';
import GIF from '../Assets/GIF.gif';
import Lottie from 'react-lottie';
import animationData from '../Assets/lottie.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
function Siri() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
return(

<div className='siri-background'>
 <div className='introduction-afya'>Introducing <span className='introduction-afya-sub'>Afya</span></div>
 <div className='afya-explaination'>An advanced AI bot designed to significantly enhance the healthcare experience for both patients and providers by offering smart, tailored support (launching this year!)</div>
 <div className='afya-zip-container'>
 <Lottie 
        options={defaultOptions}
        // height={400}
        // width={400}
        className='afya-zip'
      />
          </div>
      <div className='comming-soon-afya'></div>
    <div className='left-siri-content'>
        <div className='siri-provider-head'>For Patients</div>
        <div className="list d-flex">
        <FontAwesomeIcon className='mx-3 fa-size tick-size' icon={faCircleCheck} style={{ color: "#FF7F50", }} />
        <p className='point-one'>             
        AI-driven provider recommendations simplify finding suitable healthcare professionals tailored to individual conditions.</p>
        </div>
        <div className="list d-flex">
        <FontAwesomeIcon className='mx-3 fa-size tick-size' icon={faCircleCheck} style={{ color: "#FF7F50", }} />

        <p className='point-two'>Personalized health content and resources empower informed healthcare decisions and treatment strategies.</p>
        </div>
        <div className="list d-flex">
        <FontAwesomeIcon className='mx-3 fa-size tick-size' icon={faCircleCheck} style={{ color: "#FF7F50", }} />

        <p className='point-three'>Automated appointment and medication reminders ensure adherence to treatment plans, enhancing health management effectiveness.</p>
        </div>
    </div>
    <div className='right-siri-content'>
    <div className='siri-patient-head'>For Providers </div>
    <div className="list d-flex">
    <FontAwesomeIcon className='mx-3 fa-size tick-size' icon={faCircleCheck} style={{ color: "#FF7F50", }} />

        <p>Administrative task automation, including scheduling follow-ups and reminders, reduces clerical workload, allowing more focus on patient care.</p>
        </div>
        <div className="list d-flex">
        <FontAwesomeIcon className='mx-3 fa-size tick-size' icon={faCircleCheck} style={{ color: "#FF7F50", }} />

        <p>Symptom research and data curation enhance care accuracy and personalization, aiding in tailored treatment planning.</p>
        </div>
        <div className="list d-flex">
        <FontAwesomeIcon className='mx-3 fa-size tick-size' icon={faCircleCheck} style={{ color: "#FF7F50", }} />

        <p>Efficient patient management through streamlined communication and progress updates improves care coordination, patient satisfaction, and treatment outcomes</p>
        </div>
    </div>
    </div>


);

}
export default Siri;