<script setup>
  import { ref, computed } from "vue";

  import seasonList from "../assets/json/seasonList.json";
  import animationTypes from "../assets/json/animationTypes.json";
  import searchTranscript from "../functions/searchTranscript.js";
  import makeVHighlight from "../mixins/makeVHighlight.js";
  import stringifyEpisodeNo from "../functions/stringifyEpisodeNo.js";
  import getSeasonUrlName from "../functions/getSeasonUrlName.js";

  import SeasonSelectInput from "../components/SeasonSelectInput.vue";

  import SearchResults from "../components/SearchResults.vue";

  useHead({
    title: "Pony Grep! - Search",
  });

  const searchResults = ref([]);
  const dialoguePattern = ref("");

  const vHighlight = makeVHighlight(dialoguePattern);

  const response1 = await useFetch("json/transcriptLines.json");
  const response2 = await useFetch("json/animationIndex.json");

  const route = useRoute();

  if (response1.status.value === "error") {
    response1.refresh();
  }
  if (response2.status.value === "error") {
    response2.refresh();
  }

  function ponyGrep(e) {
    if (response1.data.value == null) {
      response1.refresh();
      e.preventDefault();
      return;
    }
    const formData = new FormData(e.currentTarget.form);
    if (!e.currentTarget.reportValidity() || formData.get("dialoguePattern") === "") {
      return;
    }
    //if (dialoguePattern.value !== "") { reload(); }
    // set:
    // - dialoguePattern
    // - searchResults
    /* dialoguePattern */
    dialoguePattern.value = formData.get("dialoguePattern");
    /* searchResults */
    const transcriptLines = response1.data.value;
    searchResults.value = searchTranscript(formData, transcriptLines);
    //e.currentTarget.disabled = true;
    e.preventDefault();
  }

  function reformatTranscriptLines(series) {
    // group by series, then animation-type.
    const items = [];
    if (response2.data.value == null) {
      response2.refresh();
      return;
    }
    // for each animation type:
    // [transcript-line]
    // {label: animationType, content: {...}
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
            return episode.animationType === animationType.name && episode.series === series;
          })
          .map(result => {
            const episode = animationIndex.find(episode => episode.id === result.episodeId);
            const item = {
              "series": episode.series,
              "episodeTitle": episode.title,
              "season": episode.season,
              "seasonCode": getSeasonUrlName(episode.season),
              "episodeCode": stringifyEpisodeNo(episode.episodeNo),
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
        disabled: (resultCount1.value ?? 0) === 0,
      },
      {
        label: `[${resultCount2.value ?? 0}] ` + "Equestria Girls",
        slot: "EqG",
        disabled: (resultCount2.value ?? 0) === 0,
      },
    ];
  });

</script>

<template>
  <article id="search">

    <div class="container">
      <h1>Search</h1>
      <div class="row flex-column flex-lg-row">
        <section class="col mb-5">
          <h2>Parameters</h2>
          <form>
            <div class="dialoguePattern field">
              <label for="dialoguePattern" class="form-label"><span title="This field is required." aria-labelledby="dialoguePattern" aria-required="true">*</span> Dialogue</label>
              <input value="friendship is magic" placeholder="friendship is magic" id="dialoguePattern" type="search" name="dialoguePattern" class="form-control" required />
              <div class="form-text">Regex pattern to search for in all G4 dialogue.</div>
            </div>
            <div class="speaker field">
              <label class="form-label" for="speaker">Character</label>
              <input placeholder="discord|mane six" id="speaker" type="text" name="speaker" class="form-control" />
              <div class="form-text">Limit results to lines spoken only by specified character(s).</div>
            </div>
            <fieldset>
              <legend>Series</legend>
              <div class="row">
                <div class="col">
                  <SeasonSelectInput series="FiM" checked label="Friendship is Magic" />
                </div>
                <div class="col">
                  <SeasonSelectInput series="EqG" checked label="Equestria Girls" />
                </div>
              </div>
              <div class="form-text">Only selected seasons will be searched.</div>
            </fieldset>
            <button class="btn btn-primary w-100" @click="ponyGrep" id="search">Search</button>
            <!-- <button class="btn btn-secondary" @click="clearResults" id="reset" type="button">Reset</button> -->
          </form>
        </section>

        <!-- By series, by animation type. -->
        <article class="col">
          <h2>Results for pattern: <span class="SearchQuery" v-if="dialoguePattern !== ''">{{ dialoguePattern }}</span></h2>
          <!-- List of accordions, each corresponding to a season, which are classed by series. -->
          <UTabs :items="items3">

            <template #FiM>
              <SearchResults :dialoguePattern="dialoguePattern" :items="items1" :vHighlight="vHighlight" v-if="dialoguePattern !== ''" />
            </template>

            <template #EqG>
              <!-- Copy-pasted from here: ../components/SearchResults.vue -->
              <SearchResults :dialoguePattern="dialoguePattern" :items="items2" :vHighlight="vHighlight" v-if="dialoguePattern !== ''" />
            </template>

          </UTabs>
        </article>

      </div>
    </div>
  </article>

</template>
