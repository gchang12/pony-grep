<script setup>

  const props = defineProps({
    seasonList: Array,
    series: String,
    animationIndex: Array,
  });

</script>

<template>
  <ol class="SeasonIndex d-flex flex-wrap">
    <!-- Each of these has to be a dropdown menu. -->
    <li class="overflow-hidden img-thumbnail" :id="season.urlName" v-for="season in seasonList.filter(season => season.series === series)" :key="season.urlName">
      <div class="SeasonImage h-100">
        <UDropdownMenu :content="{side: 'right'}" :items="animationIndex.filter(episode => episode.series === series && episode.season === season.name)">
          <UButton color="neutral" :label="season.name" />
        </UDropdownMenu>
      </div>
    </li>
  </ol>
</template>

