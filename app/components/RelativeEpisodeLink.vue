<script setup>

  defineProps({
    episode: Object,
  })

</script>

<template>
  <a class="RelativeEpisodeLink" v-if="episode != null" :href="['/episodes', episode.series, episode.seasonUrl, episode.episodeNo].join('/')">
    <span class="NaviNext">Next</span>
    <span class="Season">{{ episode.season }}</span>
    <span class="Episode">{{ episode.episodeNo }}</span>
    <span class="Title">{{ episode.title }}</span>
  </a>
</template>
