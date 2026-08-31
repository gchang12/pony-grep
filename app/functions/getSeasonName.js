import seasonList from "../assets/json/seasonList.json";

export default function(seasonUrlName) {
  return seasonList.find(someSeason => someSeason.urlName === seasonUrlName).name;
}
