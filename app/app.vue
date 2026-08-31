<script setup>
  import '~/assets/css/app.scss';

  // TODO: Lay out all content.
  // TODO: - Dropdown menus for episode index.
  // TODO: - Display accordions when appropriate in search menu.
  // TODO: - Create new dynamic page containing episode transcript.
  // TODO: - In search result, link to episode transcript page with #ID.
  // TODO: - Add <select> input to allow user to select season.
  // TODO: Re-implement components from scratch, sourcing components as needed.
  // TODO: Re-style everything from scratch.
  // TODO: Redo all the Bootstrap classes so that they're up-to-date WRT BS5
  // TODO: Source comprehensive transcript file and index file.
  // TODO: Modify index file and update transcript file to match it.
  // TODO: Add dropdown menus to episode-directory
  // TODO: Add fieldset to search form to allow user to specify where to grep
  // TODO: Put episode-transcript into its own set of pages.
  // TODO: Add new accordions for search results.
  // TODO: Make accordions appear only for specified series.
  // TODO: Get new images to use for indexes of other MLP G4 series. 
  // TODO: For CYOA shorts, implement branched transcripts
  // TODO: Highlight matched patterns
  // TODO: add grepPattern query string to episode transcript

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
