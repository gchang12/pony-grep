<script setup>
  import { ref } from "vue";

  import getSeasonList from "../functions/getSeasonList.js";

  const seasonList = getSeasonList();

  const selectedSeasons = ref([]);
  const searchResults = ref([]);
  const dialoguePattern = ref([]);

  function ponyGrep(e) {
    const formData = new FormData(e.currentTarget.form);
    if (!e.currentTarget.reportValidity() || formData.get("dialoguePattern") === "") {
      return;
    }
    console.log(formData);
    e.preventDefault();
  }

  const items = [
    {
      label: "Rainbow Dash",
      icon: "Aye",
    },
    {
      label: "Applejack",
      icon: "Aye",
    },
  ];

</script>

<template>
  <h1>Search</h1>

  <article>
    <h2>Parameters</h2>
    <form>
      <div class="dialoguePattern field" title="Pattern to search for in all G4 dialogue.">
        <label for="dialoguePattern">Dialogue</label>
        <input placeholder="friendship is magic" id="dialoguePattern" type="text" name="dialoguePattern" required />
      </div>
      <div class="speaker field" title="Limit results to lines spoken only by specified character(s).">
        <label for="speaker">Character</label>
        <input placeholder="discord|mane six" id="speaker" type="text" name="speaker" />
      </div>
      <fieldset title="Only selected series will be searched.">
        <legend>Series</legend>
        <div class="FiM field">
          <label for="FiM">Friendship is Magic</label>
          <input checked id="FiM" type="checkbox" />
        </div>
        <div class="EqG field">
          <label for="EqG">Equestria Girls</label>
          <input id="EqG" type="checkbox" />
        </div>
      </fieldset>
      <fieldset title="Only seasons belonging to selected series will be searched.">
        <legend>Seasons</legend>
        <div class="FiM-season field">
          <label for="FiM-season">Friendship is Magic</label>
          <select id="FiM-season" name="FiM-season" multiple>
            <option v-for="season in seasonList['FiM']" :value="season.name" :key="season.name" :selected="season.name.startsWith('S') && season.name.length === 2">
              {{ season.alias }}
            </option>
          </select>
        </div>
        <div class="EqG-season field">
          <label for="EqG-season">Equestria Girls</label>
          <select id="EqG-season" name="EqG-season" multiple disabled>
            <option v-for="season in seasonList['EqG']" :value="season.name" :key="season.name" :selected="season.name.startsWith('My Little Pony Equestria Girls')">
              {{ season.alias }}
            </option>
          </select>
        </div>
      </fieldset>
      <button @click="ponyGrep" id="search">Search</button>
      <button id="reset" type="button">Reset</button>
    </form>
  </article>

  <article>
    <h2>Results</h2>
    <!-- List of accordions, each corresponding to a season, which are classed by series. -->
    <UAccordion :items="selectedSeasons.map(season => season)">
      <template #body="{ season }">
        <table>
          <thead>
            <tr>
              <th>Let</th>
              <th>Darkness</th>
              <th>Take</th>
              <th>You</th>
            </tr>
          </thead>
        </table>
        {{ item.icon }}
        {{ item.label }}
      </template>
    </UAccordion>
  </article>

</template>

