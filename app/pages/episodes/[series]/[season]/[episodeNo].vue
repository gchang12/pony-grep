<script setup>

  import { computed } from "vue";

  import seasonList from "../../../../assets/json/seasonList.json";
  import TranscriptLineTable from "../../../../components/TranscriptLineTable.vue";
  import RelativeEpisodeLink from "../../../../components/RelativeEpisodeLink.vue";
  import stringifyEpisodeNo from "../../../../functions/stringifyEpisodeNo.js";
  import getSeasonUrlName from "../../../../functions/getSeasonUrlName.js";
  import getSeasonName from "../../../../functions/getSeasonName.js";

  const route = useRoute();

  const response1 = await useFetch("../../../../json/transcriptLines.json");
  const response2 = await useFetch("../../../../json/animationIndex.json");

  if (response1.status.value !== "success") {
    response1.refresh();
  }
  if (response2.status.value !== "success") {
    response2.refresh();
  }

  function calculateThisEpisode() {
    if (response2.data.value == null) {
      response2.refresh();
      return {};
    }
    const season = getSeasonName(route.params.season);
    const currentEp = response2.data.value
      .filter(episode => episode.series === route.params.series)
      .filter(episode => episode.season === season)
      .find(episode => episode.episodeNo == route.params.episodeNo);
    return currentEp;
  }

  const episode = computed(() => calculateThisEpisode());

  //console.log("episode", episode);
  //console.log("episode.value", episode.value);

  if (Object.keys(episode.value).length === 0) {
    //console.log("response1.status.value", response1.status.value);
    //console.log("response2.status.value", response2.status.value);
    /*
    await navigateTo({
      path: "/episodes/not-found",
      query: {
        series: route.params.series,
        season: route.params.season,
        episodeNo: route.params.episodeNo,
      },
    });
    */
  }

  const transcriptLines = computed(() => {
    if (response1.data.value == null) {
      response1.refresh();
      return [];
    }
    const lines = response1.data.value
      .filter(tline => tline.episodeId == episode.value.id);
    return lines;
  });

  function compileEndingBranches() {
    if (response2.data.value == null) {
      response2.refresh();
      return [];
    }
    if (response1.data.value == null) {
      response1.refresh();
      return [];
    }
    const season = getSeasonName(route.params.season);
    const branchedEndings = response2.data.value
      .filter(someEpisode => someEpisode.series === route.params.series)
      .filter(someEpisode => someEpisode.season === season)
      .filter(someEpisode => someEpisode.title.startsWith(episode.value.title + " - "));
    const items = branchedEndings.map(someEpisode => {
      const title = someEpisode.title;
      const label = title.slice(title.indexOf(' - ') + 3);
      // transcript lines.
      const content = response1.data.value.filter(tline => tline.episodeId === someEpisode.id);
      return {
        label,
        content,
        episode: someEpisode,
      };
    });
    return items;
  }

  const items = computed(() => compileEndingBranches());

  function calculateRelativeEpisode(increment) {
    if (response2.data.value == null) {
      response2.refresh();
      return {};
    }
    const episode = calculateThisEpisode();
    console.log("episode", episode);
    const episodeNo = Number(episode.episodeNo);
    const newEpisodeNo = stringifyEpisodeNo(episodeNo + increment);
    const season = getSeasonName(route.params.season);
    const newEpisode = response2.data.value
      .filter(someEpisode => episode.series === route.params.series)
      .filter(someEpisode => someEpisode.season === season)
      .find(someEpisode => someEpisode.episodeNo == newEpisodeNo) ?? response2.data.value.find(someEpisode => someEpisode.id == episode.id + increment);
    //return newEpisode;
    //console.log(newEpisode);
    if (newEpisode == null) {
      return {};
    } else {
      return {
        id: newEpisode.id,
        title: newEpisode.title,
        series: newEpisode.series,
        seasonUrl: getSeasonUrlName(newEpisode.season),
        season: newEpisode.season,
        episodeNo: newEpisode.episodeNo,
      };
    };
  }

  const prevEpisode = computed(() => calculateRelativeEpisode(-1));
  const nextEpisode = computed(() => calculateRelativeEpisode(1));

</script>

<template>
  <div class="Transcript">
    <aside class="EpisodeInfo">
      <table>
        <tbody>
          <tr>
            <th>Series</th>
            <td>{{ episode.series }}</td>
          </tr>
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
      <h1>{{ episode.title }}</h1>
      <TranscriptLineTable :transcriptLines="transcriptLines" :episode="episode" :jumpedLine="route.hash.slice(2)" />
      <UAccordion :items="items">
        <template #body="{ item }">
          <TranscriptLineTable :transcriptLines="item.content" :episode="item.episode" jumpedLine="" />
        </template>
      </UAccordion>
    </div>
    <nav>
      <RelativeEpisodeLink naviText="Previous" :episode="prevEpisode" missingEpisodeMessage="Welcome to G4 Equestria!" />
      <RelativeEpisodeLink naviText="Next" :episode="nextEpisode" missingEpisodeMessage="" />
    </nav>
  </div>
</template>
