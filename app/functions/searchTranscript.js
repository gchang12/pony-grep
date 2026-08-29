async function fetchTranscriptLines() {
  const response = await fetch("/json/transcriptLines.json");
  const transcriptLines = await response.json(); 
  //console.log(transcriptLines.length);
  return transcriptLines;
}

export default async function(formData) {
  //const { isSung, seasonNo, episodeNo, dialoguePattern, speaker } = searchCriteria;
  //const { isSung, dialoguePattern, speaker } = searchCriteria;
  //console.log(formData);
  const searchCriteria = Object.fromEntries(formData.entries());
  //searchCriteria.series = ;
  // Get the seasons
  searchCriteria.season = [];
  formData.getAll("series").forEach(series => searchCriteria.season.push(...formData.getAll(series + "-season")));
  //const allSeries = ['FiM', 'EqG'];
  //allSeries.forEach(series => searchCriteria[series + "-season"] = []);
  //searchCriteria['series'].forEach(series => searchCriteria[series + "-season"] = formData.getAll(series + "-season"));
  //const { dialoguePattern, speaker } = searchCriteria;
  console.log(searchCriteria);
  const transcriptLines = await fetchTranscriptLines();
  // Filter by:
  // - series
  // - season
  // - character
  // - dialogue
  console.log(transcriptLines.length);
  const speakerRegex = new RegExp(searchCriteria.speaker, "i");
  const dialogueRegex = new RegExp(searchCriteria.dialoguePattern, "i");
  const searchResults = transcriptLines
    //.filter(tLine => searchCriteria.series.includes(tLine.series))
    .filter(tLine => searchCriteria.season.includes(tLine.season))
    .filter(tLine => speakerRegex.test(tLine.speaker))
    .filter(tLine => dialogueRegex.test(tLine.dialogue));
  console.log(searchResults.length);
  return searchResults;
  const seasons = [];
  //const allSeries = ['FiM', 'EqG'];
  for (const series of allSeries) {
    if (searchCriteria[series] != null && searchCriteria[series + '-season'].length > 0) {
      seasons.push(...searchCriteria[series + '-season']);
    }
  };
  /*
  let miniSearch = new MiniSearch({
    idField: "id",
    fields: ["dialogue"],
    storeFields: ["id", "episodeId", "lineNo"],
  });
  */
  //console.log(dialoguePattern, regex);
  //const searchResults = transcriptLines.filter(lineEntry => {
    //const conditions = [];
    // check if lineEntry.speaker includes speaker
    //if (speaker !== "") {
      //if (!(speakerRegex.test(lineEntry.speaker))) {
        //return false;
      //}
    //}
    // If isSung -> true, check if the speaker has brackets around; otherwise include everything.
    /*
    if (isSung != null) {
      if (!(lineEntry.speaker.startsWith("[") && lineEntry.speaker.endsWith("]"))) {
        return false;
      }
    } else {
      if (!(lineEntry.speaker.startsWith("[") && lineEntry.speaker.endsWith("]"))) {
        return false;
      }
    }
    */
    // if seasonNo is specified and so is episodeNo, limit results to entries with the specified episodeNo; otherwise include everything.
    /*
    if (seasonNo !== "") {
      if (!(lineEntry.seasonNo == seasonNo)) {
        return false;
      }
      if (episodeNo !== "") {
        if (!(lineEntry.episodeNo == episodeNo)) {
          return false;
        }
      }
    }
    */
    //if (!dialogueRegex.test(lineEntry.dialogue)) {
      //return false;
    //}
    //return true;
  //});
  return searchResults;
}
