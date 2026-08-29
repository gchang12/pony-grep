<script setup>
  import getSeasonList from "../functions/getSeasonList.js";
  const seasonList = getSeasonList();
</script>

<template>
  <h1>Search</h1>
  <article>
    <h2>Parameters</h2>
    <form>
      <div class="dialoguePattern field">
        <label for="dialoguePattern">Dialogue</label>
        <input placeholder="friendship is magic" id="dialoguePattern" type="text" name="dialoguePattern" required />
        <div class="help-text">Pattern to search for in all G4 dialogue.</div>
      </div>
      <div class="speaker field">
        <label for="speaker">Character</label>
        <input placeholder="discord|mane six" id="speaker" type="text" name="speaker" />
        <div class="help-text">Limit results to lines spoken only by specified character(s).</div>
      </div>
      <div class="season field">
        <label for="season">Seasons</label>
        <select id="season" name="speaker" multiple>
          <optgroup label="FiM">
            <option v-for="season in seasonList['FiM']" :value="season.name" :key="season.name">
              {{ season.alias }}
            </option>
          </optgroup>
          <optgroup label="EqG">
            <option v-for="season in seasonList['EqG']" :value="season.name" :key="season.name">
              {{ season.alias }}
            </option>
          </optgroup>
        </select>
        <div class="help-text">Limit results to lines in given seasons.</div>
      </div>
      <button id="search">Search</button>
      <button id="reset" type="button">Reset</button>
    </form>
  </article>
</template>

