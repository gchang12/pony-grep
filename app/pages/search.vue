<script setup>
  import { ref, computed } from "vue";

  import getSeasonList from "../functions/getSeasonList.js";
  import getAnimationTypes from "../functions/getAnimationTypes.js";
  import searchTranscript from "../functions/searchTranscript.js";

  import SearchResults from "../components/SearchResults.vue";

  const seasonList = getSeasonList();
  const animationTypes = getAnimationTypes();
  const seriesList = [
    ["FiM", "Friendship is Magic"],
    ["EqG", "Equestria Girls"],
  ];

  const searchResults = ref([]);
  const dialoguePattern = ref("");

  //const transcriptLines = (await useFetch("/json/transcriptLines.json")).data.value;
  import getTranscriptLines from "../functions/getTranscriptLines.js"; const transcriptLines = getTranscriptLines();
  import getAnimationIndex from "../functions/getAnimationIndex.js"; const animationIndex = getAnimationIndex();
  //const animationIndex = (await useFetch("/json/animationIndex.json")).data.value;

  // NOTE: data.value is defined only after HMR after changing something inside <script> element
  console.log("transcriptLines", transcriptLines.length);
  console.log("animationIndex", animationIndex.length);

  /*
  const fimItems = computed(() => reformatTranscriptLines("FiM"));
  const eqgItems = computed(() => reformatTranscriptLines("EqG"));
  */

  function ponyGrep(e) {
    const formData = new FormData(e.currentTarget.form);
    if (!e.currentTarget.reportValidity() || formData.get("dialoguePattern") === "") {
      return;
    }
    // set:
    // - dialoguePattern
    // - searchResults
    /* dialoguePattern */
    dialoguePattern.value = formData.get("dialoguePattern");
    /* searchResults */
    searchResults.value = searchTranscript(formData, transcriptLines);
    console.log("searchResults.value", searchResults.value);
    e.preventDefault();
  }

  function toggleSeason(e) {
    const checkbox = e.currentTarget;
    const selectList = document.getElementById(checkbox.id + "-season");
    selectList.disabled = !checkbox.checked;
  }

</script>

<template>
  <h1>Search</h1>

  <article>
    <h2>Parameters</h2>
    <form>
      <div class="dialoguePattern field">
        <label for="dialoguePattern">Dialogue</label>
        <input value="friendship is magic" placeholder="friendship is magic" id="dialoguePattern" type="text" name="dialoguePattern" required />
        <div class="help-text">Pattern to search for in all G4 dialogue.</div>
      </div>
      <div class="speaker field">
        <label for="speaker">Character</label>
        <input placeholder="discord|mane six" id="speaker" type="text" name="speaker" />
        <div class="help-text">Limit results to lines spoken only by specified character(s).</div>
      </div>
      <fieldset>
        <legend>Series</legend>
        <div class="FiM field">
          <label for="FiM">Friendship is Magic</label>
          <input value="FiM" name="series" checked id="FiM" type="checkbox" @click="toggleSeason" />
          <div class="season field">
            <select id="FiM-season" name="FiM-season" multiple>
              <option v-for="season in seasonList.filter(season => season.series === 'FiM')" :value="season.name" :key="season.name" :selected="season.name.startsWith('S') && season.name.length === 2">
                {{ season.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="EqG field">
          <label for="EqG">Equestria Girls</label>
          <input value="EqG" name="series" id="EqG" type="checkbox" @click="toggleSeason" />
          <div class="season field">
            <select id="EqG-season" name="EqG-season" multiple disabled>
              <option v-for="season in seasonList.filter(season => season.series === 'EqG')" :value="season.name" :key="season.name" :selected="['Equestria Girls', 'Rainbow Rocks', 'Friendship Games', 'Legend of Everfree'].includes(season.name)">
                {{ season.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="help-text">Only selected seasons will be searched.</div>
      </fieldset>
      <button @click="ponyGrep" id="search">Search</button>
      <button id="reset" type="button">Reset</button>
    </form>
  </article>


  <!-- By series, by animation type. -->
  <article>
    <h2>Results</h2>
    <!-- List of accordions, each corresponding to a season, which are classed by series. -->
    <SearchResults label="Friendship is Magic" series="FiM" :searchResults="searchResults" :animationIndex="animationIndex" />
    <SearchResults label="Equestria Girls" series="EqG" :searchResults="searchResults" :animationIndex="animationIndex" />
  </article>

</template>

<!-- <div class="help-text">Only seasons belonging to selected series will be searched.</div> -->
<!-- <table v-if="searchResults.length > 0">
      result.content = {
        "episodeTitle": episode.title,
        "seasonCode": seasonList.find(season => season.name === episode.season).urlName,
        "episodeCode": String(episode.episodeNo).padStart(2, '0'),
        "animationPrefix": animationTypes.find(animationType => animationType.name === episode.animationType).alias,
      };
<thead>
<tr>
<th>Speaker</th>
<th>Dialogue</th>
<th>Episode</th>
</tr>
</thead>
<tbody>
<tr v-for="searchResult in searchResults">
<th>{{ searchResult.speaker }}</th>
<td>{{ searchResult.dialogue }}</td>
<td>
<NuxtLink :to="'/episodes/' + searchResult.seasonCode + '/' + searchResult.animationPrefix + searchResult.episodeCode + '#L' + searchResult.lineNo">
{{searchResult.episode.season}} {{searchResult.animationPrefix}}{{ searchResult.episodeCode }}
<br />
<i>{{searchResult.episode.title}}</i>
</NuxtLink>
</td>
</tr>
</tbody>
</table>
-->
