<script setup>
  const props = defineProps({
    transcriptLines: Array,
    episode: Object,
    jumpedLine: String,
  });
</script>

<template>
  <table class="TranscriptLineTable table table-striped">
    <tbody>
      <tr v-for="tline in transcriptLines.filter(tline => tline.episodeId === episode.id)" :key="tline.id" :id="'L' + tline.lineNo">
        <td>
          <NuxtLink :href="'#L' + tline.lineNo">#</NuxtLink>
        </td>
        <th>
          <span :class="jumpedLine == tline.lineNo ? 'JumpedLine' : ''">
            {{ tline.speaker }}
          </span>
        </th>
        <td>
          <span :class="jumpedLine == tline.lineNo ? 'JumpedLine' : ''">
            {{ tline.dialogue }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
