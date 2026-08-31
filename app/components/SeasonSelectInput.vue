<script setup>

  import seasonList from "../assets/json/seasonList.json";

  const props = defineProps({
    series: String,
    label: String,
    checked: String,
  });

  function toggleSeason(e) {
    const checkbox = e.currentTarget;
    const selectList = document.getElementById(props.series + "-season");
    selectList.disabled = !checkbox.checked;
  }

  const defaultSeasons = [
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "S9",
    'Equestria Girls',
    'Rainbow Rocks',
    'Friendship Games',
    'Legend of Everfree',
  ];

</script>

<template>
  <div :class="'SeasonSelectInput field ' + series">
    <label :for="series">{{ label }}</label>
    <input :value="series" name="series" :checked="checked" :id="series" type="checkbox" @click="toggleSeason" />
    <div class="season field">
      <select :id="series + '-season'" :name="series + '-season'" multiple>
        <option v-for="season in seasonList.filter(season => season.series === series)" :value="season.name" :key="season.name" :selected="defaultSeasons.includes(season.name)">
          {{ season.name }}
        </option>
      </select>
    </div>
  </div>
</template>
