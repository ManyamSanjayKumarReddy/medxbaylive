import React from 'react';
import './demoExplore.css';
import lap from '../Assets/Lapimage.png';

const DemoExplore = () => {
  return (
    <div className='container-box-explore'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-5 col-md-6 col-sm-12 order-1 order-lg-1'>
            <div className='content-division'>
              <h1 className='head-re'>Get Ready for a Glimpse into</h1>
              <h1 className='coming-soon'>What's Coming Next!</h1>
            </div>
          </div>
          <div className='col-lg-7 col-md-6 col-sm-12 order-2 order-lg-2'>
            <img src={lap} className='image-size' alt='Laptop Mockup' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoExplore;
