import React from 'react';

const Loader = () => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;
