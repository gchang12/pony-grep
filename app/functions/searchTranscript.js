export default function(formData, transcriptLines) {
  const searchCriteria = Object.fromEntries(formData.entries());
  // Get the seasons
  searchCriteria.season = [];
  formData.getAll("series").forEach(series => searchCriteria.season.push(...formData.getAll(series + "-season")));
  // Filter by:
  // - series / season
  // - character
  // - dialogue
  const speakerRegex = new RegExp(searchCriteria.speaker, "i");
  const dialogueRegex = new RegExp(searchCriteria.dialoguePattern, "i");
  const searchResults = transcriptLines
    .filter(tLine => searchCriteria.season.includes(tLine.season))
    .filter(tLine => speakerRegex.test(tLine.speaker))
    .filter(tLine => dialogueRegex.test(tLine.dialogue));
  return searchResults;
}
