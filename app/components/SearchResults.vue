<script setup>

  // NOTE: Does not work as intended. Accordions do not populate properly.
  // TODO: Fix this. Seriously. Also, consider passing in ref as props, not values.

  import { computed } from "vue";
  import makeVHighlight from "../mixins/makeVHighlight.js";
  import animationTypes from "../assets/json/animationTypes.json";
  import seasonList from "../assets/json/seasonList.json";
  import stringifyEpisodeNo from "../functions/stringifyEpisodeNo.js";

  const props = defineProps({
    dialoguePattern: String,
    items: Array,
  });

  const { dialoguePattern } = props;

  console.log("dialoguePattern", dialoguePattern);
  console.log("dialoguePattern.value", dialoguePattern.value);

  const vHighlight = makeVHighlight({value: dialoguePattern ?? ""});

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
