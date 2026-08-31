<script setup>

  import seasonList from "../../assets/json/seasonList.json";

  const response = await useFetch("json/animationIndex.json");

  const animationIndex = computed(() => {
    if (response.data.value == null) {
      response.refresh();
      return [];
    }
    const index = response.data.value.map(episode => {
      const { series, season, episodeNo, title } = episode;
      const label = String(episodeNo).padStart(2, '0') + " – " + title;
      const seasonUrlName = seasonList.find(someSeason => someSeason.name === season).urlName;
      return {
        series,
        season,
        label,
        color: "error",
        type: "link",
        "class": "",
        onSelect(e) {
          navigateTo(["/episodes", series, seasonUrlName, String(episodeNo).padStart(2, '0')].join("/"));
        },
      };
    });
    console.log(response.data.value.length);
    return index;
  });

</script>

<template>
  <div id="episodes">
    <h1>Episodes</h1>
    <article>
      <h2>Friendship is Magic</h2>
      <ol class="SeasonIndex FiM">
        <!-- Each of these has to be a dropdown menu. -->
        <li :id="season.urlName" v-for="season in seasonList.filter(season => season.series === 'FiM')" :key="season.urlName">
          <div class="SeasonImage">
            <UDropdownMenu :content="{side: 'right'}" :items="animationIndex.filter(episode => episode.series === 'FiM' && episode.season === season.name)">
              <UButton color="neutral" :label="season.name" />
            </UDropdownMenu>
          </div>
        </li>
      </ol>
    </article>
  </div>
</template>

