<script setup>
  // TODO: Fix this. Seriously. Also, consider passing in ref as props, not values.

  import { computed } from "vue";
  import makeVHighlight from "../mixins/makeVHighlight.js";
  import animationTypes from "../assets/json/animationTypes.json";
  import seasonList from "../assets/json/seasonList.json";
  import stringifyEpisodeNo from "../functions/stringifyEpisodeNo.js";

  const props = defineProps({
    searchResults: Array,
    series: String,
    dialoguePattern: String,
  });

  const { series, searchResults, dialoguePattern } = props;

  console.log('searchResults', searchResults);
  console.log('searchResults.value', searchResults.value);
  //console.log('dialoguePattern', dialoguePattern);

  const response = await useFetch("json/animationIndex.json");

  function reformatTranscriptLines() {
    // group by series, then animation-type.
    // for each animation type:
    // [transcript line]
    // {label: animationType, content: {...}
    const items = [];
    if (response.data.value == null) {
      response.refresh();
      return;
    }
    const animationIndex = response.data.value;
    for (const animationType of animationTypes) {
      const resultCount = searchResults.filter(result => {
        const episode = animationIndex.find(episode => episode.id === result.episodeId);
        return episode.animationType === animationType.name && episode.series === series;
      }).length;
      items.push({
        "disabled": resultCount === 0,
        "label": "[" + resultCount + "] " + animationType.title,
        "content": searchResults
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

  const items = computed(() => reformatTranscriptLines("FiM"));

  /*
  const vHighlight = computed(() => {
    //console.log(dialoguePattern);
    console.log("dialoguePattern", dialoguePattern);
    return makeVHighlight(dialoguePattern);
  });
  */

  const vHighlight = makeVHighlight(dialoguePattern.value ?? "");
  //const vHighlight = computed(() => makeVHighlight(dialoguePattern));
  console.log("vHighlight", vHighlight);
  console.log("dialoguePattern", dialoguePattern);

</script>

<template>
  <UAccordion :items="items">
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
</template>
