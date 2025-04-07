export type TAutoCompleteInputProps = {
  label: string;
  placeholder: string;
  getSuggestions: (input: string) => TInputSuggestion[];
}