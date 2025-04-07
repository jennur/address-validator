import { ChangeEventHandler } from "react";

export type TAutoCompleteInputProps = {
  label: string;
  placeholder?: string;
  inputValue: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>,
  handleOptionClick: (option: IInputSuggestion) => void,
  inputSuggestions: IInputSuggestion[],
  isValid: boolean,
}