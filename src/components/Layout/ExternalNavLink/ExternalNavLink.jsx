import React from 'react';

const ExternalNavLink = ({ to, children, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(to, '_blank');
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default ExternalNavLink;
