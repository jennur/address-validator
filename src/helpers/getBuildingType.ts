export default function getBuildingType(value: TBuildingType) {
  switch(value) {
    case "E":
      return "Detached house";
    case "R":
      return "Row house";
    case "B":
      return "Apartment building";
    case "F":
      return "Business";
    case "H":
      return "Holiday house";
    case "A":
      return "Other";
    default: 
      return "Other";
  }
}