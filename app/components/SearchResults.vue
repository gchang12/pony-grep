<script setup>

  import { ref } from "vue";

  import animationTypes from "../assets/json/animationTypes.json";

  const props = defineProps({
    items: Array,
    vHighlight: Object,
  });

  const vHighlight = props.vHighlight;

  const maxResultCount = 100;

  const pageRanges = ref(animationTypes.map(animationType => {
    return {
      "animationType": animationType.name,
      "pageRange": [0, maxResultCount],
    };
    })
  );

  function incrementPageRange(e) {
    const animationType = e.currentTarget.dataset.animationtype;
    const item = pageRanges.value.find(item => item.animationType === animationType);
    item.pageRange = [item.pageRange[0] + maxResultCount, item.pageRange[1] + maxResultCount];
    pageRanges.value = [...pageRanges.value.filter(item2 => item2.animationType !== animationType), item];
  }

  function decrementPageRange(e) {
    //pageRange.value = [pageRange.value[0] - maxResultCount, pageRange.value[1] - maxResultCount];
    const animationType = e.currentTarget.dataset.animationtype;
    const item = pageRanges.value.find(item => item.animationType === animationType);
    item.pageRange = [item.pageRange[0] - maxResultCount, item.pageRange[1] - maxResultCount];
    pageRanges.value = [...pageRanges.value.filter(item2 => item2.animationType !== animationType), item];
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
          <tr v-for="tline in item.content.slice(...pageRanges.find(item2 => item2.animationType === item.animationType).pageRange)" :key="tline.id">
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
      <div v-if="item.content.length > 100">
        <!-- NOTE: Counter no longer shows the correct result numbers -->
        <!-- <div class="PageRange w-100 text-center"> Showing results: {{ pageRanges.find(item2 => item.animationType === item.animationType).pageRange[0] + 1}} – {{ Math.min(pageRanges.find(item2 => item.animationType === item.animationType).pageRange[1], item.content.length) }} </div> -->
        <div class="NaviButtons d-flex justify-content-between">
          <button :data-animationtype="item.animationType" class="btn w-50 btn-secondary" type="button" v-if="pageRanges.find(item2 => item2.animationType === item.animationType).pageRange[0] > 0" @click="decrementPageRange">
            Previous
          </button>
          <div class="invisible" v-else></div>
          <button :data-animationtype="item.animationType" class="btn w-50 btn-secondary" type="button" v-if="pageRanges.find(item2 => item2.animationType === item.animationType).pageRange[1] < item.content.length" @click="incrementPageRange">
            Next
          </button>
          <div class="invisible" v-else></div>
        </div>
      </div>
    </template>
  </UAccordion>
</template>
