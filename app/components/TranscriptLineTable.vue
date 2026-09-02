<script setup>
  defineProps({
    transcriptLines: Array,
    episode: Object,
    jumpedLine: String,
  });
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Link</th>
        <th>Character</th>
        <th>Line</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tline in transcriptLines.filter(tline => tline.episodeId === episode.id)" :key="tline.id" :id="'L' + tline.lineNo" :class="jumpedLine == tline.lineNo ? 'JumpedLine' : ''">
        <td>
          <NuxtLink :href="'#L' + tline.lineNo">#</NuxtLink>
        </td>
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
