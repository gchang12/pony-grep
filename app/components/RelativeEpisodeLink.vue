<script setup>

  import stringifyEpisodeNo from "../functions/stringifyEpisodeNo.js";

  const props = defineProps({
    naviText: String,
    episode: Object,
  });

</script>

<template>
  <div class="RelativeEpisodeLink" v-if="Object.keys(episode).length != 0">
    <NuxtLink class="d-inline-block" :to="['/episodes', episode.series, episode.seasonUrl, episode.episodeNo].join('/')" :title="episode.title">
      <div class="NaviText">{{ naviText }}</div>
      <span class="Season">{{ episode.season }}</span>
      <span class="Episode">E{{ episode.episodeNo }}</span>
    </NuxtLink>
  </div>
  <div class="RelativeEpisodeLink invisible" v-else>
  </div>
</template>
