<script setup>

  import stringifyEpisodeNo from "../functions/stringifyEpisodeNo.js";

  const props = defineProps({
    naviText: String,
    episode: Object,
    missingEpisodeMessage: String,
  });

  //console.log("props.episode", props.episode);
  //const episodeNo = ref(stringifyEpisodeNo(props.episode.episodeNo));

</script>

<template>
  <NuxtLink class="RelativeEpisodeLink" v-if="Object.keys(episode).length != 0" :to="['/episodes', episode.series, episode.seasonUrl, episode.episodeNo].join('/')" :title="episode.title">
    <div class="NaviText">{{ naviText }}</div>
    <span class="Season">{{ episode.season }}</span>
    <span class="Episode">{{ episode.episodeNo }}</span>
  </NuxtLink>
  <NuxtLink v-else>
    <span class="MissingEpisodeMessage">{{ missingEpisodeMessage }}</span>
  </NuxtLink>
</template>
