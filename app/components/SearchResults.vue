<script setup>

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

</script>

<template>
  <div>
    <!-- {{ items }} -->
  </div>
</template>
