import seasonList from "../assets/json/seasonList.json";

export default function(seasonName) {
  return seasonList.find(someSeason => someSeason.name === seasonName).urlName;
}
