<script setup>
  // TODO: Fix this. Seriously. Also, consider passing in ref as props, not values.

  import { computed } from "vue";

  import seasonList from "../assets/json/seasonList.json";
  import animationTypes from "../assets/json/animationTypes.json";
  import stringifyEpisodeNo from "../functions/stringifyEpisodeNo.js"

  const props = defineProps({
    series: String,
    searchResults: Array,
    //response: Object,
    animationIndex: Array,
  });

  //const { series, searchResults, response } = props;
  const { series, searchResults, animationIndex } = props;

  console.log("animationIndex", animationIndex);
  //console.log("response", response);
  console.log("series", series);
  console.log("searchResults", searchResults);

  function reformatTranscriptLines() {
    // group by series, then animation-type.
    // for each animation type:
    // [transcript line]
    // {label: animationType, content: {...}
    const items = [];
    //if (response.data.value == null) { response.refresh(); return; }
    //const animationIndex = response.data.value;
    console.log("animationIndex", animationIndex);
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
            console.log("result.episodeId", result.episodeId);
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

  const items = computed(() => reformatTranscriptLines());

</script>

<template>
  <!-- {{ items }} -->
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
</template>
