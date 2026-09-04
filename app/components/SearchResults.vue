<script setup>

  import { ref } from "vue";

  const props = defineProps({
    items: Array,
    vHighlight: Object,
  });

  const vHighlight = props.vHighlight;

  const maxResultCount = 100;

  const pageRange = ref([0, maxResultCount]);

  function incrementPageRange() {
    pageRange.value = [pageRange.value[0] + maxResultCount, pageRange.value[1] + maxResultCount];
  }

  function decrementPageRange() {
    pageRange.value = [pageRange.value[0] - maxResultCount, pageRange.value[1] - maxResultCount];
  }

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
          <tr v-for="tline in item.content.slice(...pageRange)" :key="tline.id">
            <th>{{tline.speaker}}</th>
            <td v-highlight>{{tline.dialogue}}</td>
            <td>
              <NuxtLink :to="['/episodes', tline.series, tline.seasonCode, tline.episodeCode + '#L' + tline.lineNo].join('/')" :title="tline.episodeTitle" target="_blank">
                <i>{{ tline.seasonCode }} E{{tline.episodeCode}}</i>
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="item.content.length > 100">
        <div class="PageRange w-100 text-center">
          Showing results: {{ pageRange[0] + 1}} – {{ Math.min(pageRange[1], item.content.length) }}
        </div>
        <div class="NaviButtons d-flex justify-content-between">
          <button class="btn w-50 btn-secondary" type="button" v-if="pageRange[0] > 0" @click="decrementPageRange">
            Previous
          </button>
          <div class="invisible" v-else></div>
          <button class="btn w-50 btn-secondary" type="button" v-if="pageRange[1] < item.content.length" @click="incrementPageRange">
            Next
          </button>
          <div class="invisible" v-else></div>
        </div>
      </div>
    </template>
  </UAccordion>
</template>
