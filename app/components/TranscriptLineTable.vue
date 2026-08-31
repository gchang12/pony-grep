<script setup>
  defineProps({
    transcriptLines: Array,
    episode: Object,
  });
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Character</th>
        <th>Line</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tline in transcriptLines.filter(tline => tline.episodeId === episode.id)" :key="tline.id" :id="'L' + tline.lineNo">
        <th>
          {{ tline.speaker }}
        </th>
        <td>
          {{ tline.dialogue }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
