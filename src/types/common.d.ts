interface ImportMeta {
  env: {
    VITE_API_KEY: string;
  };
}

// TODO: Evaluate if the following should be moved elsewhere
type TAddress = {
  streetIds: string[];
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
}

interface IInputSuggestion {
  id: string;
  label: string;
  value: string;
}

interface IStreetSuggestion extends IInputSuggestion {
  autoFillValues: {
    city: string;
    streetIds: string[];
  };
}

interface IStreetNumberSuggestion extends IInputSuggestion {
  autoFillValues: {
    postalCode: string;
  };
}

type TBuildingType = "E" | "R" | "B" | "F" | "H" | "A";