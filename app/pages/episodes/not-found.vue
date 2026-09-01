<script setup>
  defineProps({
    series: String,
    season: String,
    episodeNo: String,
  });
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
          <td>{{ episode }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
