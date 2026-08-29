<script setup>
  import '~/assets/css/app.scss';

  /* TODO
  Lay out all content.
  - Dropdown menus for episode index.
  - Display accordions when appropriate in search menu.
  - Create new dynamic page containing episode transcript.
  - In search result, link to episode transcript page with #ID.
  - Add <select> input to allow user to select season.
  Re-implement components from scratch, sourcing components as needed.
  Re-style everything from scratch.
  Redo all the Bootstrap classes so that they're up-to-date WRT BS5

  Source comprehensive transcript file and index file.
  Modify index file and update transcript file to match it.
  Add dropdown menus to episode-directory
  Add fieldset to search form to allow user to specify where to grep
  Put episode-transcript into its own set of pages.
  Add new accordions for search results.
  Make accordions appear only for specified series.
  Get new images to use for indexes of other MLP G4 series. 
  For CYOA shorts, implement branched transcripts
  Highlight matched patterns
  */

</script>

<template>
  <UApp>
    <div id="app">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <!-- <NuxtRouteAnnouncer /> -->
      <!-- <NuxtWelcome /> -->
    </div>
  </UApp>
</template>
