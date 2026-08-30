<script setup>
  import { ref, computed } from "vue";

  import getSeasonList from "../functions/getSeasonList.js";
  import searchTranscript from "../functions/searchTranscript.js";

  const seasonList = getSeasonList();

  const searchResults = ref([]);
  const dialoguePattern = ref("");

  /*
  const selectedSeasons = computed(() => {
    const seasons = [];
    searchResults.value.map(result => result.season).forEach(season => seasons.includes(season) ? false : seasons.push(season));
    return seasons;
  });
  */

  const transcriptLines = (await useFetch("/json/transcriptLines.json")).data.value;
  const animationIndex = (await useFetch("/json/animationIndex.json")).data.value;
  // data.value is defined only after HMR
  console.log("transcriptLines", transcriptLines);
  console.log("animationIndex", animationIndex);

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
    //console.log("selectedSeasons.value", selectedSeasons.value);
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
      <div class="dialoguePattern field" title="Pattern to search for in all G4 dialogue.">
        <label for="dialoguePattern">Dialogue</label>
        <input value="friendship is magic" placeholder="friendship is magic" id="dialoguePattern" type="text" name="dialoguePattern" required />
      </div>
      <div class="speaker field" title="Limit results to lines spoken only by specified character(s).">
        <label for="speaker">Character</label>
        <input placeholder="discord|mane six" id="speaker" type="text" name="speaker" />
      </div>
      <fieldset title="Only selected series will be searched.">
        <legend>Series</legend>
        <div class="FiM field">
          <label for="FiM">Friendship is Magic</label>
          <input value="FiM" name="series" checked id="FiM" type="checkbox" @click="toggleSeason" />
        </div>
        <div class="EqG field">
          <label for="EqG">Equestria Girls</label>
          <input value="EqG" name="series" id="EqG" type="checkbox" @click="toggleSeason" />
        </div>
      </fieldset>
      <fieldset title="Only seasons belonging to selected series will be searched.">
        <legend>Seasons</legend>
        <div class="FiM-season field">
          <label for="FiM-season">Friendship is Magic</label>
          <select id="FiM-season" name="FiM-season" multiple>
            <option v-for="season in seasonList['FiM']" :value="season.name" :key="season.name" :selected="season.name.startsWith('S') && season.name.length === 2">
              {{ season.alias }}
            </option>
          </select>
        </div>
        <div class="EqG-season field">
          <label for="EqG-season">Equestria Girls</label>
          <select id="EqG-season" name="EqG-season" multiple disabled>
            <option v-for="season in seasonList['EqG']" :value="season.name" :key="season.name" :selected="season.name.startsWith('My Little Pony Equestria Girls')">
              {{ season.alias }}
            </option>
          </select>
        </div>
      </fieldset>
      <button @click="ponyGrep" id="search">Search</button>
      <button id="reset" type="button">Reset</button>
    </form>
  </article>

  <article>
    <h2>Results</h2>
    <!-- List of accordions, each corresponding to a season, which are classed by series. -->
    <table v-if="searchResults.length > 0">
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
            <NuxtLink :to="'/episodes/' + searchResult.season + '/' + searchResult.episodeNo + '#L' + searchResult.lineNo">{{searchResult.season}} E{{ searchResult.episodeNo }}</NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </article>

</template>
