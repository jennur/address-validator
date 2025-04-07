const API_KEY = import.meta.env.VITE_API_KEY;

export function getStreetSuggestions(value: string) {
    if (value.length > 2) {
      // TODO: Replace with actual API call
      return [
        { id: "address-1", label: "123 Main St" },
        { id: "address-2", label: "456 Elm St" },
        { id: "address-3", label: "789 Oak St" },
      ];
    }
}