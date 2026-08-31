<script setup>

  defineProps({
    naviText: String,
    episode: Object,
    missingEpisodeMessage: String,
  })

</script>

<template>
  <NuxtLink class="RelativeEpisodeLink" v-if="episode != null" :to="['/episodes', episode.series, episode.seasonUrl, episode.episodeNo].join('/')">
    <span class="NaviText">{{ naviText }}</span>
    <span class="Season">{{ episode.season }}</span>
    <span class="Episode">{{ episode.episodeNo }}</span>
    <span class="Title">{{ episode.title }}</span>
  </NuxtLink>
  <NuxtLink v-else>
    <span class="MissingEpisodeMessage">{{ missingEpisodeMessage }}</span>
  </NuxtLink>
</template>
