<script setup>

  import seasonList from "../assets/json/seasonList.json";
  import animationTypes from "../assets/json/animationTypes.json";
  //const animationTypes = getAnimationTypes();
  //const seasonList = getSeasonList();

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
