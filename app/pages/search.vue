<script setup>
  import { ref, computed } from "vue";

  import getSeasonList from "../functions/getSeasonList.js";
  import getAnimationTypes from "../functions/getAnimationTypes.js";
  import searchTranscript from "../functions/searchTranscript.js";

  const seasonList = getSeasonList();
  const animationTypes = getAnimationTypes();
  const seriesList = [
    ["FiM", "Friendship is Magic"],
    ["EqG", "Equestria Girls"],
  ];

  const searchResults = ref([]);
  const dialoguePattern = ref("");

  const transcriptLines = (await useFetch("/json/transcriptLines.json")).data.value;
  const animationIndex = (await useFetch("/json/animationIndex.json")).data.value;

  // NOTE: data.value is defined only after HMR after changing something inside <script> element
  console.log("transcriptLines", transcriptLines);
  console.log("animationIndex", animationIndex);

  const accordionItems = computed(() => {
    const items = [];
    // group by series, then animation-type.
    // for each animation type:
    // [transcript line]
    // {label: animationType, content: {...}
    for (const animationType of animationTypes) {
      items.push({
        "label": animationType.title,
        "content": searchResults.value
          .filter(result => {
            const episode = animationIndex.find(episode => episode.id === result.episodeId);
            return episode.animationType === animationType.name;
          })
          .map(result => {
            const episode = animationIndex.find(episode => episode.id === result.episodeId);
            const item = {
              "series": episode.series,
              "episodeTitle": episode.title,
              "seasonCode": seasonList.find(season => season.name === episode.season).urlName,
              "episodeCode": String(episode.episodeNo).padStart(2, '0'),
              "animationPrefix": animationTypes.find(animationType => animationType.name === episode.animationType).alias,
              "dialogue": result.dialogue,
              "speaker": result.speaker,
              "lineNo": result.lineNo,
              "id": result.id,
            };
            return item;
          }),
        });
      }
    console.log(items);
    return items;
  });

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

  // TODO: Figure out how accordions work.
  // TODO: Dump search results onto accordions each of which is based on animation type. series > animation-type > [search-result]
  // TODO: group by animation type.

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
    <UAccordion :items="accordionItems">
      <template #body="{ item }">
        <table>
          <thead>
            <tr>
              <th>Speaker</th>
              <th>Dialogue</th>
              <th>Episode</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tline in item.content" :key="tline.id">
              <th>{{tline.speaker}}</th>
              <td>{{tline.dialogue}}</td>
              <td>
                <NuxtLink :to="['/episodes', tline.series, tline.seasonCode, tline.animationPrefix + tline.episodeCode + '#L' + tline.lineNo].join('/')">
                  {{tline.seasonCode}} {{tline.animationPrefix}}{{tline.episodeCode}}
                  <i>{{tline.episodeTitle}}</i>
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- each content must have an array of transcript lines corresponding to an anmType -->
        <!-- {{ item }} -->
      </template>
    </UAccordion>
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
