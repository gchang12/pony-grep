<script setup>
  defineProps({
    transcriptLines: Array,
    episode: Object,
    jumpedLine: String,
  });
</script>

<template>
  <table class="TranscriptLineTable">
    <tbody>
      <tr v-for="tline in transcriptLines.filter(tline => tline.episodeId === episode.id)" :key="tline.id" :id="'L' + tline.lineNo" :class="jumpedLine == tline.lineNo ? 'JumpedLine' : ''">
        <td>
          <NuxtLink class="me-3" :href="'#L' + tline.lineNo">#</NuxtLink>
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
