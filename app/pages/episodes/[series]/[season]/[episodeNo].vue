<script setup>

  // https://ponyapi.net/

  import { computed } from "vue";

  import seasonList from "../../../../assets/json/seasonList.json";
  import TranscriptLineTable from "../../../../components/TranscriptLineTable.vue";
  import RelativeEpisodeLink from "../../../../components/RelativeEpisodeLink.vue";
  //import EpisodeInfoBox from "../../../../components/EpisodeInfoBox.vue";
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

  const props = ref({});
  const episode = computed(() => calculateThisEpisode());

  //console.log("episode.value", episode);

  useHead({
    title: computed(() => `My Little Grep – "${episode.value.title}" (MLP:${episode.value.series} ${episode.value.season} E${episode.value.episodeNo}) Transcript`),
    meta: [
      {
        name: "description",
        content: computed(() => `Transcript data and metadata for "[${episode.value.title}]" (MLP:${episode.value.series} ${episode.value.season} E${episode.value.episodeNo})`),
      },
    ],
  });

  const transcriptLines = computed(() => {
    if (response1.data.value == null) {
      response1.refresh();
      return [];
    }
    const lines = response1.data.value
      .filter(tline => tline.episodeId == episode.value.id)
      .filter(tline => tline.path == null);
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
    const mainEp = response2.data.value
      .filter(someEpisode => someEpisode.series === route.params.series)
      .filter(someEpisode => someEpisode.season === season)
      .find(someEpisode => someEpisode.title === episode.value.title);
    const branchedEndings = response2.data.value
      .filter(someEpisode => someEpisode.series === route.params.series)
      .filter(someEpisode => someEpisode.season === season)
      .filter(someEpisode => someEpisode.title.startsWith(episode.value.title))
      .filter(someEpisode => typeof(someEpisode.path) === 'string');
    if (mainEp.paths != null) {
      return mainEp.paths.map(path => {
        const label = path;
        // transcript lines.
        const content = response1.data.value.filter(tline => tline.path === label);
        return {
          label,
          content,
          episode: mainEp,
        };
      });
    } else {
      return [];
    }
  }

  const items = computed(() => compileEndingBranches());

  function calculateRelativeEpisode(increment) {
    if (response2.data.value == null) {
      response2.refresh();
      return {};
    }
    const episode = calculateThisEpisode();
    const episodeNo = Number(episode.episodeNo);
    const newEpisodeNo = stringifyEpisodeNo(episodeNo + increment);
    const season = getSeasonName(route.params.season);
    const newEpisode = response2.data.value
      .filter(someEpisode => episode.series === route.params.series)
      .filter(someEpisode => someEpisode.season === season)
      .find(someEpisode => someEpisode.episodeNo == newEpisodeNo) ?? response2.data.value.find(someEpisode => someEpisode.id == episode.id + increment);
    if (newEpisode == null) {
      return {};
    } else {
      return {
        id: newEpisode.id,
        title: newEpisode.title,
        series: newEpisode.series,
        seasonUrl: getSeasonUrlName(newEpisode.season),
        season: newEpisode.season,
        episodeNo: stringifyEpisodeNo(newEpisode.episodeNo),
      };
    };
  }

  async function fetchImage() {
    const url = `https://ponyapi.net/v1/episode/by-season/${episode.value.season.slice(1)}/all`;
    const response = await useFetch(url);
    const episode2 = response.data.value.data.find(someEpisode => someEpisode.episode == episode.value.episodeNo);
    props.value = {
      image: episode2.image,
      url: episode2.url,
      writtenby: episode2.writtenby,
      storyboard: episode2.storyboard,
    };
  }

  const prevEpisode = computed(() => calculateRelativeEpisode(-1));
  const nextEpisode = computed(() => calculateRelativeEpisode(1));


</script>

<template>
  <div class="Transcript container" v-if="transcriptLines.filter(tline => tline.episodeId === episode.id).length > 0">
    <h1 class="sticky-top d-flex justify-content-center align-items-center">{{ episode.title }}</h1>
    <div class="row d-flex flex-column flex-xxl-row">
      <aside class="col-xxl-4 col-auto mb-3">
        <div class="EpisodeInfo p-4">
          <h2 class="mb-3">Metadata</h2>
          <table class="mb-4">
            <!-- <table class="table table-striped"> NOTE: Negates highlighting of rows. -->
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
          <article>
            <h3>Summary</h3>
            <p v-for="line in episode.summary" :key="line">{{ line }}</p>
          </article>
          <div class="EpisodeLink">
            <a class="d-flex justify-content-center align-items-center" target="_blank" :href="'https://mlp.fandom.com/wiki/' + episode.urlName">
              MLP Wikia Page
            </a>
          </div>
        </div>
      </aside>
      <div class="TranscriptLines col-xxl-8 col-auto">
        <!-- TODO: Replace with 'Transcript' in final draft. -->
        <h2>Transcript</h2>
        <TranscriptLineTable :transcriptLines="transcriptLines.filter(tline => tline.episodeId === episode.id)" :jumpedLine="route.hash.slice(2)" />
        <UAccordion type="multiple" :defaultValue="route.hash ? ['0', '1', '2'] : []" :items="items">
          <template #body="{ item }">
            <TranscriptLineTable :transcriptLines="item.content.filter(tline => tline.episodeId === item.episode.id)" :jumpedLine="route.hash.slice(2)" />
          </template>
        </UAccordion>
      </div>
    </div>
    <hr>
    <nav class="d-flex justify-content-between mb-4">
      <RelativeEpisodeLink naviText="Previous" :episode="prevEpisode" />
      <RelativeEpisodeLink naviText="Next" :episode="nextEpisode" />
    </nav>
  </div>
  <article v-else class="container d-flex flex-column align-items-center">
    <h1>Episode Not Found</h1>
    <p>No episode with these parameters was found.</p>
    <table class="m-4">
      <tbody>
        <tr>
          <th>Series</th>
          <td>{{ route.params.series }}</td>
        </tr>
        <tr>
          <th>Season</th>
          <td>{{ route.params.season }}</td>
        </tr>
        <tr>
          <th>Episode</th>
          <td>{{ route.params.episodeNo }}</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>
