import React from 'react';
import './Accepted.css';

const bufferToBase64 = (buffer) => {
  if (buffer.type === 'Buffer' && Array.isArray(buffer.data)) {
      const binary = String.fromCharCode.apply(null, new Uint8Array(buffer.data));
      return `data:image/jpeg;base64,${window.btoa(binary)}`;
  } else {
      console.error('Unexpected buffer type:', typeof buffer);
      return '';
  }
};

const AcceptedInsurances = ({insurance}) => {
  const getBaseImage = (data) => {
      const base64String = bufferToBase64(data);
      return base64String
  };

  return (

    <div className='Accepted-area'>
    <div className="container accepted-section">
      <h2>Accepted Insurances</h2>
      <div className="row accepted-row justify-content-center align-items-center ">
          {insurance?.map(i => (
              <div key={i} className="col-6 col-md-2 ">
                <img src={getBaseImage(i.logo.data)} alt="Aetna" className="aetna insurance-logo" />
              </div>
            ))}
        
      </div>
    </div>
  </div>
  );
};

export default AcceptedInsurances;
