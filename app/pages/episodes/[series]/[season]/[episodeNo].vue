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

  function calculateThisEpisode() {
    if (response2.data.value == null) {
      response2.refresh();
      return {};
    }
    //console.log("response2.data.value", response2.data.value);
    //console.log("route.params", route.params);
    const season = getSeasonName(route.params.season);
    const currentEp = response2.data.value
      .filter(episode => episode.series === route.params.series)
      .filter(episode => episode.season === season)
      .find(episode => episode.episodeNo == route.params.episodeNo);
    //console.log("currentEp", currentEp);
    return currentEp;
  }

  const episode = computed(() => calculateThisEpisode());

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

  // items: Array
  // - item: {
  //     disabled: false,
  //     label: title.textAfter(' - '),
  //     content: transcriptLines.filter(title matches),
  //   }

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
    console.log("episode", episode);
    console.log("episode.value", episode.value);
    const branchedEndings = response2.data.value
      .filter(someEpisode => someEpisode.series === route.params.series)
      .filter(someEpisode => someEpisode.season === season)
      .filter(someEpisode => someEpisode.title.startsWith(episode.value.title + " - "));
    console.log("branchedEndings", branchedEndings);
    const items = branchedEndings.map(someEpisode => {
      const title = someEpisode.title;
      const label = title.slice(title.indexOf(' - ') + 3);
      console.log(someEpisode.id);
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

  //console.log("episode", episode);
  //console.log("transcriptLines", transcriptLines);

  console.log("items", items);
  console.log("items.value", items.value);

  // TODO: If the viewer chooses a 'CYOE' short, put the ending branches in the main transcript page.
  // TODO: If the viewer is in a 'CYOE' branched ending page, redirect him to the main short page.
  // TODO: Next and Back buttons probably.
  // TODO: Make use of 'dialoguePattern' search-param; highlight the relevant lines.
  // TODO: Highlight jumped-to line.
  // TODO: Append summary of ending branch.
  // TODO: Put branched endings at the end.

  console.log("route.hash", route.hash);
  //console.log("route.query", route.query);
  //console.log("Object.keys(route.query)", Object.keys(route.query));

  function calculateRelativeEpisode(increment) {
    if (response2.data.value == null) {
      response2.refresh();
      return {};
    }
    const episode = calculateThisEpisode();
    const episodeNo = Number(episode.episodeNo);
    const newEpisodeNo = stringifyEpisodeNo(episodeNo + increment);
    const season = getSeasonName(route.params.season);
    let newEpisode = response2.data.value
      .filter(someEpisode => episode.series === route.params.series)
      .filter(someEpisode => someEpisode.season === season)
      .find(someEpisode => someEpisode.episodeNo == newEpisodeNo) ?? response2.data.value.find(someEpisode => someEpisode.id == episode.id + increment);
    if (newEpisode == null) {
      return null;
    } else {
      return {
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

  console.log(nextEpisode);

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
      <TranscriptLineTable :transcriptLines="transcriptLines" :episode="episode" :jumpedLine="route.hash.slice(2)" />
      <UAccordion :items="items">
        <template #body="{ item }">
          <TranscriptLineTable :transcriptLines="item.content" :episode="item.episode" />
        </template>
      </UAccordion>
    </div>
    <!-- TODO: Accordions each containing transcript table -->
    <nav>
      <RelativeEpisodeLink :episode="prevEpisode" missingEpisodeMessage="Welcome to G4 Equestria!" />
      <RelativeEpisodeLink :episode="nextEpisode" missingEpisodeMessage="No more episodes to show. You're done with the series." />
    </nav>
  </div>
</template>
