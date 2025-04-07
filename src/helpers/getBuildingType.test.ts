import getBuildingType from "./getBuildingType";

describe("getBuildingType", () => {
  it("should return 'Detached house' for value 'E'", () => {
    expect(getBuildingType("E")).toBe("Detached house");
  })
  it("should return 'Row house' for value 'R'", () => {
    expect(getBuildingType("R")).toBe("Row house");
  });
  it("should return 'Apartment building' for value 'B'", () => {
    expect(getBuildingType("B")).toBe("Apartment building");
  });
  it("should return 'Business' for value 'F'", () => {
    expect(getBuildingType("F")).toBe("Business");
  });
  it("should return 'Holiday house' for value 'H'", () => {
    expect(getBuildingType("H")).toBe("Holiday house");
  });
  it("should return 'Other' for value 'A'", () => {
    expect(getBuildingType("A")).toBe("Other");
  });
  it("should return 'Other' for an unknown value", () => {
    expect(getBuildingType("X" as TBuildingType)).toBe("Other");
  });
})