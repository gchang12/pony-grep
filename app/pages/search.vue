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
      <fieldset>
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
      <fieldset>
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
          <select id="EqG-season" name="EqG-season" multiple>
            <option v-for="season in seasonList['EqG']" :value="season.name" :key="season.name" :selected="season.name.startsWith('My Little Pony Equestria Girls')">
              {{ season.alias }}
            </option>
          </select>
        </div>
        <div class="help-text">Seasons to limit results to.</div>
      </fieldset>
      <button id="search">Search</button>
      <button id="reset" type="button">Reset</button>
    </form>
  </article>
</template>

