<script setup>

  import seasonList from "../../assets/json/seasonList.json";

  const response2 = await useFetch("json/animationIndex.json");

</script>

<template>
  <div id="episodes">
    <h1>Episodes</h1>
    <article>
      <h2>Friendship is Magic</h2>
      <ol class="SeasonIndex FiM">
        <!-- Each of these has to be a dropdown menu. -->
        <li :id="season.urlName" v-for="season in seasonList.filter(season => season.series === 'FiM')" :key="season.urlName">
          <!-- <figure> -->
            <!-- <img width="300" :src="'/images/' + season.imgName + '.webp'" /> -->
          <div class="SeasonImage">
            <span class="SeasonName">{{ season.name }}</span>
          </div>
            <!-- </figure> -->
        </li>
      </ol>
    </article>
  </div>
</template>

<!--
-->
