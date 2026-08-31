<script setup>
  import { ref, computed } from "vue";

  import seasonList from "../assets/json/seasonList.json";
  import animationTypes from "../assets/json/animationTypes.json";
  import searchTranscript from "../functions/searchTranscript.js";
  import makeVHighlight from "../mixins/makeVHighlight.js";
  import stringifyEpisodeNo from "../functions/stringifyEpisodeNo.js";


  //import SearchResults from "../components/SearchResults.vue";

  //const seasonList = getSeasonList();
  //const animationTypes = getAnimationTypes();
  const seriesList = [
    ["FiM", "Friendship is Magic"],
    ["EqG", "Equestria Girls"],
  ];

  const searchResults = ref([]);
  const dialoguePattern = ref("");

  const vHighlight = makeVHighlight(dialoguePattern);

  //import getTranscriptLines from "../functions/getTranscriptLines.js"; const transcriptLines = getTranscriptLines();
  //import getAnimationIndex from "../functions/getAnimationIndex.js"; const animationIndex = getAnimationIndex();
  //import transcriptLines from "../assets/json/transcriptLines.json";
  //import animationIndex from "../assets/json/animationIndex.json";
  const response1 = await useFetch("json/transcriptLines.json");
  //let transcriptLines = response1.data.value;
  const response2 = await useFetch("json/animationIndex.json");
  //let animationIndex = response2.data.value;
  //console.log(response1);
  //console.log(response2);

  // NOTE: data.value is defined only after HMR after changing something inside <script> element
  //console.log("transcriptLines", transcriptLines.length);
  //console.log("animationIndex", animationIndex.length);

  /*
  const fimItems = computed(() => reformatTranscriptLines("FiM"));
  const eqgItems = computed(() => reformatTranscriptLines("EqG"));
  */

  function ponyGrep(e) {
    if (response1.data.value == null) {
      response1.refresh();
      alert("Sorry! Something went wrong. Please try again.");
      e.preventDefault();
      return;
    }
    const formData = new FormData(e.currentTarget.form);
    if (!e.currentTarget.reportValidity() || formData.get("dialoguePattern") === "") {
      return;
    }
    /*
    if (response1.error) {
      response1.refresh();
    }
    transcriptLines = response1.data.value;
    if (response2.error) {
      response2.refresh();
    }
    animationIndex = response2.data.value;
    */
    // set:
    // - dialoguePattern
    // - searchResults
    /* dialoguePattern */
    dialoguePattern.value = formData.get("dialoguePattern");
    /* searchResults */
    const transcriptLines = response1.data.value;
    searchResults.value = searchTranscript(formData, transcriptLines);
    //console.log("searchResults.value", searchResults.value);
    e.preventDefault();
  }

  function toggleSeason(e) {
    const checkbox = e.currentTarget;
    const selectList = document.getElementById(checkbox.id + "-season");
    selectList.disabled = !checkbox.checked;
  }

  function clearResults() {
    searchResults.value = [];
    dialoguePattern.value = "";
  }

  function reformatTranscriptLines(series) {
    // group by series, then animation-type.
    // for each animation type:
    // [transcript line]
    // {label: animationType, content: {...}
    const items = [];
    if (response2.data.value == null) {
      response2.refresh();
      return;
    }
    const animationIndex = response2.data.value;
    for (const animationType of animationTypes) {
      const resultCount = searchResults.value.filter(result => {
        const episode = animationIndex.find(episode => episode.id === result.episodeId);
        return episode.animationType === animationType.name && episode.series === series;
      }).length;
      items.push({
        "disabled": resultCount === 0,
        "label": "[" + resultCount + "] " + animationType.title,
        "content": searchResults.value
          .filter(result => {
            const episode = animationIndex.find(episode => episode.id === result.episodeId);
            //return episode.animationType === animationType.name && episode.series === series;
            return episode.animationType === animationType.name && episode.series === series;
          })
          .map(result => {
            const episode = animationIndex.find(episode => episode.id === result.episodeId);
            const item = {
              "series": episode.series,
              "episodeTitle": episode.title,
              //"season": episode.season,
              "seasonCode": seasonList.find(season => season.name === episode.season).urlName,
              "episodeCode": stringifyEpisodeNo(episode.episodeNo),
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
    return items;
  }

  function countResults(series) {
    if (response2.data.value == null) {
      response2.refresh();
      return;
    }
    const animationIndex = response2.data.value;
    return searchResults.value.filter(result => {
      const episode = animationIndex.find(episode => episode.id === result.episodeId);
      return episode.series === series;
    }).length;
  }

  const items1 = computed(() => reformatTranscriptLines("FiM"));
  const resultCount1 = computed(() => countResults("FiM"));
  const items2 = computed(() => reformatTranscriptLines("EqG"));
  const resultCount2 = computed(() => countResults("EqG"));

  const items3 = computed(() => {
    return [
      {
        label: `[${resultCount1.value ?? 0}] ` + "Friendship is Magic",
        slot: "FiM",
      },
      {
        label: `[${resultCount2.value ?? 0}] ` + "Equestria Girls",
        slot: "EqG",
      },
    ];
  });

  //console.log("response2", response2);

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
      <button @click="clearResults" id="reset" type="button">Reset</button>
    </form>
  </article>

  <!-- By series, by animation type. -->
  <article>
    <h2>Results for: <span class="SearchQuery" v-if="dialoguePattern !== ''">{{ dialoguePattern }}</span></h2>
    <!-- List of accordions, each corresponding to a season, which are classed by series. -->
    <UTabs :items="items3">
      <template #FiM>
        <!-- <article> -->
          <!-- <h3><span class="ResultCount">{{ resultCount1 }}</span> Friendship is Magic</h3> -->
          <!-- NOTE: Unable to make this into a component. -->
          <!-- <SearchResults series="FiM" :searchResults="searchResults" :animationIndex="animationIndex" /> -->
          <UAccordion :items="items1">
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
                    <td v-highlight>{{tline.dialogue}}</td>
                    <td>
                      <!-- <NuxtLink :to="['/episodes', tline.series, tline.seasonCode, tline.animationPrefix + tline.episodeCode + '#L' + tline.lineNo].join('/')"> -->
                      <NuxtLink :to="['/episodes', tline.series, tline.seasonCode, tline.episodeCode + '#L' + tline.lineNo].join('/')">
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
          <!-- </article> -->
      </template>
      <template #EqG>
        <!-- <article> -->
          <!-- <h3><span class="ResultCount">{{ resultCount2 }}</span> Equestria Girls</h3> -->
          <UAccordion :items="items2">
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
                      <NuxtLink :to="['/episodes', tline.series, tline.seasonCode, tline.episodeCode + '#L' + tline.lineNo].join('/')">
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
          <!-- </article> -->
      </template>
    </UTabs>
  </article>

</template>

<!-- <div class="help-text">Only seasons belonging to selected series will be searched.</div> -->
<!-- <table v-if="searchResults.length > 0">
      result.content = {
        "episodeTitle": episode.title,
        "seasonCode": seasonList.find(season => season.name === episode.season).urlName,
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
