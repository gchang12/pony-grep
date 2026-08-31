<script setup>

  import seasonList from "../../assets/json/seasonList.json";

  import PictureIndex from "../../components/PictureIndex.vue";

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

  // TODO: In the CYOE shorts, show only the main short that branches off into three others.

</script>

<template>
  <div id="episodes">
    <h1>Episodes</h1>
    <article>
      <h2>Friendship is Magic</h2>
      <PictureIndex :seasonList="seasonList" series="FiM" :animationIndex="animationIndex" />
    </article>
    <article>
      <h2>Equestria Girls</h2>
      <PictureIndex :seasonList="seasonList" series="EqG" :animationIndex="animationIndex" />
    </article>
  </div>
</template>

