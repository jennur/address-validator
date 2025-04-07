import axios from "axios";
import getBuildingType from "../helpers/getBuildingType";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getStreetSuggestions(value: string): Promise<IStreetSuggestion[]> {
  try {
    const encodedValue = encodeURI(value);
    const response = await axios.get(
      `/api/streetSearch/${encodedValue}?apiKey=${API_KEY}`
    );
    const streets = response.data?.streets || [];

    // TODO: Type the response
    const suggestions = streets.map(
      (street): IStreetSuggestion => ({
        id: street.streetIds[0].toString(),
        label: `${street.streetName}, ${street.city}`,
        value: street.streetName,
        autoFillValues: {
          city: street.city,
          streetIds: street.streetIds,
        },
      })
    );

    return suggestions;
  } catch (error) {
    console.error("[getStreetSuggestions]", error);
    return [];
  }
}

export async function getStreetNumberSuggestions(
  streetIds: string[],
  value: string
): Promise<IStreetNumberSuggestion[]> {
  if (!streetIds || streetIds.length === 0) return;

  try {
    const encodedValue = encodeURI(value);

    const response = await axios.get(
      `/api/streetNumberSearch/${streetIds}?apiKey=${API_KEY}&streetNumber=${encodedValue}`,
    );
    const streetNumbers = response.data?.streetNumbers || [];

    // TODO: Type the response
    const suggestions = streetNumbers.map((streetNumber): IStreetNumberSuggestion => {
      const streetNo = streetNumber.streetNo;
      const isDuplicate = streetNumber.duplicateNumberAndEntrance;
      const entrance = streetNumber.entrance;
      const fullStreetNo = `${streetNo}${entrance ? entrance : ""} ${isDuplicate ? getBuildingType(streetNumber.houseType) : ""}`;
      return {
        id: streetNumber.addressId.toString(),
        label: fullStreetNo,
        value: fullStreetNo,
        autoFillValues: {
          postalCode: streetNumber.postalCode,
        },
      };
    });
    return suggestions;
  } catch (error) {
    console.error("[getStreetNumberSuggestions]", error);
    return [];
  }
}