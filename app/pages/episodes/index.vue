<script setup>

  import seasonList from "../../assets/json/seasonList.json";

  const response2 = await useFetch("json/animationIndex.json");

</script>

<template>
  <div id="episodes">
    <h1>Episodes</h1>
    <article>
      <h2>Friendship is Magic</h2>
      <ol>
        <!-- Each of these has to be a dropdown menu. -->
        <li class="ImageDropdown" :id="season.urlName" v-for="season in seasonList.filter(season => season.series === 'FiM')" :key="season.urlName">
          {{ season.name }}
        </li>
      </ol>
    </article>
    <article>
      <h2>Equestria Girls</h2>
      <ol>
        <li class="ImageDropdown" :id="season.urlName" v-for="season in seasonList.filter(season => season.series === 'EqG')" :key="season.urlName">
          {{ season.name }}
        </li>
      </ol>
    </article>
  </div>
</template>
