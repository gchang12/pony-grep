<script setup>

  import { computed } from "vue";

  import seasonList from "../../../../assets/json/seasonList.json";

  const route = useRoute()

  const response1 = await useFetch("../../../../json/transcriptLines.json");
  const response2 = await useFetch("../../../../json/animationIndex.json");

  const episode = computed(() => {
    if (response2.data.value == null) {
      response2.refresh();
      return {};
    }
    //console.log("response2.data.value", response2.data.value);
    //console.log("route.params", route.params);
    const season = seasonList.find(season => season.urlName === route.params.season).name;
    const currentEp = response2.data.value
      .filter(episode => episode.series === route.params.series)
      .filter(episode => episode.season === season)
      .find(episode => episode.episodeNo == route.params.episodeNo);
    //console.log("currentEp", currentEp);
    return currentEp;
  });

  const transcriptLines = computed(() => {
    if (response1.data.value == null) {
      response1.refresh();
      return [];
    }
    //console.log(episode);
    const lines = response1.data.value
      .filter(tline => tline.episodeId == episode.value.id);
    //console.log(lines);
    return lines;
  });

  //console.log("episode", episode);
  //console.log("transcriptLines", transcriptLines);

  // TODO: If the viewer chooses a 'CYOE' short, put the ending branches in the main transcript page.
  // TODO: If the viewer is in a 'CYOE' branched ending page, redirect him to the main short page.
  // TODO: Next and Back buttons probably.
  // TODO: Put line number id-attributes in each row of data.
  // TODO: Make use of 'dialoguePattern' search-param; highlight the relevant lines.

</script>

<template>
  <div class="Transcript">
    <aside class="EpisodeInfo">
      <h3>{{ episode.title }}</h3>
      <table>
        <tbody>
          <tr>
            <th>Season</th>
            <td>{{ episode.season }}</td>
          </tr>
          <tr>
            <th>Episode</th>
            <td>{{ episode.episodeNo }}</td>
          </tr>
          <tr>
            <th>Airdate</th>
            <td>{{ episode.airdate }}</td>
          </tr>
        </tbody>
      </table>
      <p v-for="line in episode.summary" :key="line">{{ line }}</p>
      <a target="_blank" :href="'https://mlp.fandom.com/wiki/' + episode.urlName">
        MLP Wikia Page
      </a>
    </aside>
    <div class="TranscriptLines">
      <table>
        <thead>
          <tr>
            <th>Character</th>
            <th>Line</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tline in transcriptLines.filter(tline => tline.episodeId === episode.id)" :key="tline.id">
            <th>
              {{ tline.speaker }}
            </th>
            <td>
              {{ tline.dialogue }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
