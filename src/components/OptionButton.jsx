import React from 'react';

export const OptionButton = ({ value, label, emoji, selected, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={`option-button ${selected ? 'selected' : ''}`}
      onClick={() => !disabled && onClick(value)}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className="emoji" aria-hidden>{emoji}</span>
      <span className="label">{label}</span>
    </button>
  );
};

export default OptionButton;
