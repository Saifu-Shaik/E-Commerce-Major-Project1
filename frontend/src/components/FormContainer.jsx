import React from 'react';

const FormContainer = ({ children }) => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        {children}
      </div>
    </div>
  </div>
);

export default FormContainer;
