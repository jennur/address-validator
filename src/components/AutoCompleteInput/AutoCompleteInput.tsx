import { useState } from "react";
import { TAutoCompleteInputProps } from "./AutoCompleteInput.d";

function AutoCompleteInput({ 
  label = "Input",
  placeholder = "Enter text",
  getSuggestions,
}: TAutoCompleteInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputSuggestions, setInputSuggestions] = useState<TInputSuggestion[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsValid(false);
    const value = event.target.value;
    setInputValue(value);
    const suggestions = getSuggestions(value);
    setInputSuggestions(suggestions);
  }

  function handleOptionClick(option: TInputSuggestion) {
    setInputValue(option.label);
    setIsValid(true);
    setInputSuggestions([]);
  }

  const optionElems = inputSuggestions?.map((option: TInputSuggestion) => (
    <li
      key={option.id}
      className="suggestion"
      role="option"
      tabIndex={0}
      onClick={() => handleOptionClick(option)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleOptionClick(option);
        }
      }}
    >
      {option.label}
    </li>
  ));

  return (
    <div className="input-wrapper">
      <label htmlFor="autocomplete-input" className="input-label">
        {label}
      </label>
      <input
        id="autocomplete-input"
        type="text"
        className={`input ${inputValue.length > 0 ? (isValid ? "success" : "active") : ""}`}
        placeholder={placeholder}
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-expanded={inputSuggestions?.length > 0}
        onChange={handleInputChange}
        value={inputValue}
      />

      {inputSuggestions?.length > 0 && 
        <ul id="suggestions-list" className="input-suggestions" role="listbox">
          {optionElems}
        </ul>
      }
    </div>
  );
}

export default AutoCompleteInput;