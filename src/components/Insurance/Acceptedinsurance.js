import React from 'react';
import './Accepted.css';
const AcceptedInsurances = () => {
  return (

    <div className='Accepted-area'>
    <div className="container accepted-section">
      <h2>Accepted Insurances</h2>
      <div className="row accepted-row justify-content-center align-items-center ">
      <div className="col-6 col-md-2 ">
      <img src="/images/aetna.png" alt="Aetna" className="aetna insurance-logo" />
        </div>
        <div className="col-6 col-md-2 ">
          <img src="/images/bluecross.png" alt="Blue-Cross Blue Shield" className="Blue-Cross insurance-logo" />
        </div>
        <div className="col-6 col-md-2 ">
        <img src="/images/aetna.png" alt="Aetna" className="aetna insurance-logo" />
        </div>
        <div className="col-6 col-md-2 ">
          <img src="/images/bluecross.png" alt="Blue Cross Blue Shield" className="Blue-Cross insurance-logo" />
        </div>
      </div>
      <div className="row accepted-row justify-content-center align-items-center ">
      <div className="col-6 col-md-2 ">
      <img src="images/anthem.png" alt="Anthem" className="Anthem insurance-logo" />
        </div>
        <div className="col-6 col-md-2 ">
          <img src="/images/humana.png" alt="Humana" className="humana insurance-logo" />
        </div>
        <div className="col-6 col-md-2">
        <img src="images/anthem.png" alt="Anthem" className="Anthem insurance-logo" />
        </div>
        <div className="col-6 col-md-2 ">
        <img src="/images/humana.png" alt="Humana" className="humana insurance-logo" />
        </div>
      </div>
    </div>
  </div>
  );
};

export default AcceptedInsurances;
