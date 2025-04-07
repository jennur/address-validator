import { ChangeEventHandler } from "react";

export type TTextInputProps = {
  label: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  readOnly?: boolean;
  isValid?: boolean;
}