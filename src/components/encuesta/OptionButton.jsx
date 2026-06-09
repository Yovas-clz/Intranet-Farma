export default function OptionButton({
  value,
  label,
  emoji,
  selected,
  onClick,
  disabled
}) {
  return (
    <button
      type="button"
      className={`option-button ${selected ? "selected" : ""}`}
      onClick={() => !disabled && onClick(value)}
      disabled={disabled}
    >
      <span className="emoji">{emoji}</span>
      <span className="label">{label}</span>
    </button>
  );
}