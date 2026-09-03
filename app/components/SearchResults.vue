<script setup>

  const props = defineProps({
    items: Array,
    vHighlight: Object,
  });

  const vHighlight = props.vHighlight;

</script>

<template>
  <UAccordion :items="items">
    <template #body="{ item }">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Speaker</th>
            <th>Dialogue</th>
            <th>Episode</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tline in item.content" :key="tline.id">
            <th>{{tline.speaker}}</th>
            <td v-highlight>{{tline.dialogue}}</td>
            <td>
              <NuxtLink :to="['/episodes', tline.series, tline.seasonCode, tline.episodeCode + '#L' + tline.lineNo].join('/')" :title="tline.episodeTitle">
                <i>{{ tline.seasonCode }} E{{tline.episodeCode}}</i>
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </UAccordion>
</template>
