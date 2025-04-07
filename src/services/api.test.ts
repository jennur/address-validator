import { getStreetSuggestions } from './api';

// TODO: Finish setup of Jest

describe('getStreetSuggestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return suggestions when the API call is successful", async () => {
    const mockResponse = { data: { streets: [
      {countryCode: "NO", city: "HEMSEDAL", streetName: "BRØTABAKKJIN", streetIds: [136962], isAliasMatch: "0"},
      {countryCode: "NO", city: "BAGN", streetName: "BRØTASETERVEGEN", streetIds: [204758], isAliasMatch: "0"},
    ]}};

    const mockSuggestions = [
      { label: "BRØTABAKKJIN, HEMSEDAL", value: "BRØTABAKKJIN", id: "136962", autoFillValues: { city: "HEMSEDAL" } },
      { label: "BRØTASETERVEGEN, BAGN", value: "BRØTASETERVEGEN", id: "204758", autoFillValues: { city: "BAGN" } },
    ]

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      } as Response)
    );

    const result = await getStreetSuggestions("brot");

    expect(result).toEqual(mockSuggestions);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
})