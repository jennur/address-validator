import { TAutoCompleteInputProps } from "./AutoCompleteInput.d";

function AutoCompleteInput({ 
  label,
  placeholder,
  handleInputChange,
  handleOptionClick,
  inputValue= "",
  inputSuggestions= [],
  isValid = false
}: TAutoCompleteInputProps) {

  // TODO: Implement handling of error cases

  // TODO: Consider moving the suggestions list to a separate component
  const optionElems = inputSuggestions?.map((option: IInputSuggestion) => (
    <li
      key={option.id}
      className="suggestion"
      role="option"
      tabIndex={0}
      onClick={() => handleOptionClick(option)}
      onKeyDown={(e) => e.key === 'Enter' && handleOptionClick(option)}
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