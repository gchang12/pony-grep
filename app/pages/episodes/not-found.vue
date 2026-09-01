<script setup>

  import { ref } from "vue";

  const route = useRoute();

  const series = ref(route.query.series);
  const season = ref(route.query.season);
  const episodeNo = ref(route.query.episodeNo);

  console.log(route.query);

</script>

<template>
  <div id="EpisodeNotFound">
    <h1>Episode Not Found!</h1>
    <p>No episode with these attributes was found:</p>
    <table>
      <tbody>
        <tr>
          <th>Series</th>
          <td>{{ series }}</td>
        </tr>
        <tr>
          <th>Season</th>
          <td>{{ season }}</td>
        </tr>
        <tr>
          <th>Episode</th>
          <td>{{ episodeNo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
