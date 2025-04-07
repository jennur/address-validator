import { TTextInputProps } from "./TextInput.d";

function TextInput({
  label,
  value,
  onChange,
  disabled,
  readOnly,
  isValid = false,
}: TTextInputProps) {
  // TODO: Make more flexible
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <input
        className={`input ${value.length > 0 && isValid ? "success" : ""}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  );
}

export default TextInput;
