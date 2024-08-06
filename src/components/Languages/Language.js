import React from 'react';
import './Language.css';

const languages = ['English', 'Telugu', 'Hindi', 'Balinese'];

const Languages = () => {
  return (
    <div className="languages-container text-center py-4">
      <h2>Languages</h2>
      <div className="d-flex justify-content-center languages-column-container">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="languages-column ">
            {languages.map(language => (
              <div key={language} className="language-item d-flex align-items-center mb-2">
                <img src="/images/tick.png" alt="tick" />
                <span className='language-text'>{language}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
