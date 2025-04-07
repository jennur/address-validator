import AutoCompleteInput from "./components/AutoCompleteInput/AutoCompleteInput.tsx";
import { getStreetSuggestions } from "./services/api.ts";

function App() {
  return (
    <>
      <AutoCompleteInput
        label="Street Address"
        getSuggestions={getStreetSuggestions}
        placeholder="Enter street address"
      />
    </>
  );
}

export default App;
