<script setup>

  import { ref } from "vue";

  import animationTypes from "../assets/json/animationTypes.json";

  const props = defineProps({
    items: Array,
    vHighlight: Object,
  });

  const vHighlight = props.vHighlight;

  const maxResultCount = 100;

  const pageRanges = ref(Object.fromEntries(animationTypes.map(animationType => [animationType.name, 0])));

  function incrementPageRange(e) {
    const animationType = e.currentTarget.dataset.animationtype;
    pageRanges.value[animationType] += 1;
  }

  function decrementPageRange(e) {
    const animationType = e.currentTarget.dataset.animationtype;
    pageRanges.value[animationType] -= 1;
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
          <tr v-for="tline in item.content.slice(pageRanges[item.animationType] * maxResultCount, (pageRanges[item.animationType] + 1) * maxResultCount)" :key="tline.id">
            <th>{{tline.speaker}}</th>
            <td v-highlight>{{tline.dialogue}}</td>
            <td>
              <NuxtLink :to="['/episodes', tline.series, tline.seasonCode, tline.episodeCode + '#L' + tline.lineNo].join('/')" :title="[tline.season, 'E' + tline.episodeCode].join(' ')">
                <i>{{ tline.episodeTitle }}</i>
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="item.content.length > maxResultCount">
        <!-- NOTE: Counter no longer shows the correct result numbers -->
        <!-- <div class="PageRange w-100 text-center"> Showing results: {{ pageRanges.find(item2 => item.animationType === item.animationType).pageRange[0] + 1}} – {{ Math.min(pageRanges.find(item2 => item.animationType === item.animationType).pageRange[1], item.content.length) }} </div> -->
        <div class="PageRange w-100 text-center">
          Showing results:
          <span v-text="(maxResultCount * pageRanges[item.animationType]) + 1">
          </span>
          –
          <span v-text="Math.min((pageRanges[item.animationType] + 1) * maxResultCount, item.content.length)">
          </span>
        </div>
        <div class="NaviButtons d-flex justify-content-between">
          <button :data-animationtype="item.animationType" class="btn w-50 btn-secondary" type="button" v-if="pageRanges[item.animationType] > 0" @click="decrementPageRange">
            Previous
          </button>
          <div class="invisible" v-else></div>
          <button :data-animationtype="item.animationType" class="btn w-50 btn-secondary" type="button" v-if="(maxResultCount * (pageRanges[item.animationType] + 1)) < item.content.length" @click="incrementPageRange">
            Next
          </button>
          <div class="invisible" v-else></div>
        </div>
      </div>
    </template>
  </UAccordion>
</template>
