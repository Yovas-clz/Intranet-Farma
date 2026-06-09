import { useState } from "react";
import OptionButton from "./OptionButton";

export default function SatisfaccionForm({ onSubmit }) {
  const [selected, setSelected] = useState(null);

  const opciones = [
    { value: 1, label: "Muy malo", emoji: "😡" },
    { value: 2, label: "Malo", emoji: "😕" },
    { value: 3, label: "Regular", emoji: "😐" },
    { value: 4, label: "Bueno", emoji: "🙂" },
    { value: 5, label: "Excelente", emoji: "😍" },
  ];

  const handleSubmit = () => {
    if (selected !== null) {
      onSubmit(selected);
      setSelected(null);
    }
  };

  return (
    <div className="survey-form">

      <h2>¿Qué tan satisfecho estás?</h2>

      <div className="options-container">
        {opciones.map((op) => (
          <OptionButton
            key={op.value}
            value={op.value}
            label={op.label}
            emoji={op.emoji}
            selected={selected === op.value}
            onClick={setSelected}
          />
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Enviar
      </button>

    </div>
  );
}