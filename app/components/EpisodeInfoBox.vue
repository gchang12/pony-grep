<script setup>

  const props = defineProps({
    image: String,
    url: String,
    writtenby: String,
    storyboard: String,
  });

</script>

<template>
  <div class="EpisodeInfoBox">
    <img :src="image" />
    <a target="_blank" :href="url">Wikia Page</a>
    <p>Written by <span class="Author" v-if="writtenby != null">{{ writtenby }}</span><span v-else class="Author">???</span></p>
    <p>Storyboarded by <span class="Author" v-if="storyboard != null">{{ storyboard }}</span><span class="Author" v-else>???</span></p>
  </div>
</template>

