<script setup>

  import { computed } from "vue";

  import getSeasonList from "../functions/getSeasonList.js";
  import getAnimationTypes from "../functions/getAnimationTypes.js";
  const animationTypes = getAnimationTypes();
  const seasonList = getSeasonList();

  const props = defineProps({
    label: String,
    series: String,
    searchResults: Array,
    animationIndex: Array,
  })

  function reformatTranscriptLines() {
    // group by series, then animation-type.
    // for each animation type:
    // [transcript line]
    // {label: animationType, content: {...}
    const { searchResults, animationIndex, series } = props;
    const items = [];
    for (const animationType of animationTypes) {
      const resultCount = searchResults.filter(result => {
        const episode = animationIndex.find(episode => episode.id === result.episodeId);
        return episode.animationType === animationType.name && episode.series === series;
      }).length;
      items.push({
        "label": "[" + resultCount + "] " + animationType.title,
        "content": searchResults
          .filter(result => {
            const episode = animationIndex.find(episode => episode.id === result.episodeId);
            return episode.animationType === animationType.name && episode.series === series;
          })
          .map(result => {
            const episode = animationIndex.find(episode => episode.id === result.episodeId);
            const item = {
              "series": episode.series,
              "episodeTitle": episode.title,
              //"season": episode.season,
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
    return items;
  }

  const items = reformatTranscriptLines();
  const resultCount = computed(() => {
    const { searchResults, animationIndex, series } = props;
    return searchResults.filter(result => {
      const episode = animationIndex.find(episode => episode.id === result.episodeId);
      return episode.series === series;
    }).length;
  });

  console.log(items);

</script>

<template>
  <div>
    <!-- {{ items }} -->
  <UAccordion :items="[{'label': '[' + resultCount + '] ' + label}]">
    <template #body>
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
                  <NuxtLink :to="['/episodes', tline.series, tline.seasonCode, tline.animationPrefix + tline.episodeCode + '#L' + tline.lineNo].join('/')">
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
  </UAccordion>
  </div>
</template>
