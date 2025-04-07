import { useState } from "react";
import AutoCompleteInput from "../AutoCompleteInput/AutoCompleteInput";
import TextInput from "../TextInput/TextInput";

import {
  getStreetSuggestions,
  getStreetNumberSuggestions,
} from "../../services/api";

function AddressForm() {
  const [address, setAddress] = useState<TAddress>({
    streetIds: [],
    streetName: "",
    streetNumber: "",
    postalCode: "",
    city: "",
  })
  const [streetSuggestions, setStreetSuggestions] = useState<IStreetSuggestion[]>([]);
  const [streetNumberSuggestions, setStreetNumberSuggestions] = useState<IStreetNumberSuggestion[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  
  // TODO: Can be moved to a custom hook
  function debounce(func: any, delay: number) {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      const timeout = setTimeout(() => func(), delay);
      setDebounceTimeout(timeout);
  }

  async function handleStreetNameChange(event) {
    setIsValid(false);
    setErrorMessage("");
    const value = event.target?.value || "";

    setAddress({
      streetName: value,
      streetIds: [],
      city: "",
      streetNumber: "",
      postalCode: "",
     });

    if (value === "") return;

    debounce(async () => {
      try {
        const suggestions = await getStreetSuggestions(value);
        setStreetSuggestions(suggestions);
      } catch (error) {
        console.error("[handleStreetNameChange]", error);
        setErrorMessage("Error fetching streets");
        setStreetSuggestions([]);
      }
    }, 300);
  }

  function handleStreetOptionClick(option: IStreetSuggestion) {
    setStreetSuggestions([]);
    setAddress({
      streetName: option.value,
      streetIds: option.autoFillValues.streetIds,
      city: option.autoFillValues.city,
      streetNumber: "",
      postalCode: "",
     });
  }

  async function handleStreetNumberChange(event) {
    setIsValid(false);
    setErrorMessage("");
    const value = event.target?.value || "";
    setAddress((prev) => ({ ...prev, streetNumber: value }));

    debounce(async () => {
      try {
        const suggestions = await getStreetNumberSuggestions(address.streetIds, value);
        setStreetNumberSuggestions(suggestions);
      } catch (error) {
        console.error("[handleStreetNumberChange]", error);
        setErrorMessage("Error fetching street numbers");
        setStreetNumberSuggestions([]);
      }
    }, 300);
    }

  function handleStreetNumberOptionClick(option: IStreetNumberSuggestion) {
    setAddress((prev) => ({
      ...prev, 
      streetNumber: option.value, 
      postalCode: option.autoFillValues.postalCode 
    }));
    setStreetNumberSuggestions([]);
    setIsValid(true);
  }

  return (
    <>
      <form className="address-form">
        <div className="address-row-1">
          <AutoCompleteInput
            label="Street Address"
            placeholder="Enter street address"
            handleOptionClick={handleStreetOptionClick}
            inputValue={address.streetName}
            handleInputChange={handleStreetNameChange}
            inputSuggestions={streetSuggestions}
            isValid={isValid}
          />
          <AutoCompleteInput
            label="Street number"
            handleOptionClick={handleStreetNumberOptionClick}
            inputValue={address.streetNumber}
            handleInputChange={handleStreetNumberChange}
            inputSuggestions={streetNumberSuggestions}
            isValid={isValid}
          />
        </div>
        <div className="address-row-2">
          <TextInput label="Postal code" value={address.postalCode} readOnly isValid={isValid} />
          <TextInput label="City" value={address.city} readOnly isValid={isValid} />
        </div>
      </form>
      <div className="error-message">
        {errorMessage && <p>{errorMessage}</p>}
      </div>

      {isValid && (
        <div className="container">
          <h2>Confirmed address</h2>
          <p>
            {address.streetName} {address.streetNumber}
            <br />
            {address.postalCode} {address.city}
          </p>
        </div>
      )}
    </>
  );
}

export default AddressForm;
