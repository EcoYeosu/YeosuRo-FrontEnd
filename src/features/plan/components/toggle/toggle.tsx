import React, { useState } from 'react';

const ToggleSwitch: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      onClick={handleToggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: isChecked ? '#0D77E0' : '#ccc',
        width: '30px',
        height: '16px',
        margin:'2px 0 0 7px',
        borderRadius: '34px',
        position: 'relative',
        transition: 'background-color 0.3s',
      }}
    >
      <div
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '2px',
          left: isChecked ? '16px' : '2px',
          transition: 'left 0.3s',
        }}
      />
    </div>
  );
};

export default ToggleSwitch;

