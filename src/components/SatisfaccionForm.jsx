import React, { useState } from 'react';
import '../styles/SatisfaccionForm.css';
import OptionButton from './OptionButton';

const options = [
  { value: 1, label: 'Muy Insatisfecho', emoji: '😡' },
  { value: 2, label: 'Insatisfecho', emoji: '😟' },
  { value: 3, label: 'Neutral', emoji: '😐' },
  { value: 4, label: 'Satisfecho', emoji: '😊' },
  { value: 5, label: 'Muy Satisfecho', emoji: '🤩' },
];

/**
 
 * @param {{onSubmit?: (value:number)=>void}} props
 */
export const SatisfaccionForm = ({ onSubmit } = {}) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected !== null) {
      setSubmitted(true);
      // callback to parent
      if (typeof onSubmit === 'function') onSubmit(selected);
      console.log('Valoración enviada:', selected);
    }
  };

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h2 className="survey-title">Encuesta de Satisfacción</h2>
        <p className="survey-question">¿Cómo fue tu experiencia?</p>
      </div>

      <div className="options-container">
        {options.map((option) => (
          <OptionButton
            key={option.value}
            value={option.value}
            label={option.label}
            emoji={option.emoji}
            selected={selected === option.value}
            onClick={(v) => setSelected(v)}
            disabled={submitted}
          />
        ))}
      </div>

      <div className="action-container">
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={selected === null || submitted}
        >
          {submitted ? 'Enviado ✓' : 'Enviar Respuesta'}
        </button>
      </div>

      {submitted && (
        <div className="thank-you-message">
          <p>¡Gracias por tu respuesta! Valoramos tu opinión.</p>
        </div>
      )}
    </div>
  );
};

export default SatisfaccionForm;
