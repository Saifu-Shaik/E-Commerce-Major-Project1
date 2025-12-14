import React from 'react';

const Message = ({ variant='info', children }) => (
  <div className={`alert alert-${variant}`} role="alert">
    {children}
  </div>
);

export default Message;
