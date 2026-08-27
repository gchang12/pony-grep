<script setup>

  import { ref, computed } from "vue";

  import IndexPage from './pages/IndexPage.vue'
  import EpisodeDirectory from './pages/EpisodeDirectory.vue'
  import TranscriptSearch from './pages/TranscriptSearch.vue'

  // Excerpted from code in video demonstration.
  /* Start: Routing. */
  const routes = {
    "/": TranscriptSearch,
    "/about": IndexPage,
    "/transcripts": EpisodeDirectory,
  }
  const currentPath = ref(window.location.hash);
  window.addEventListener("hashchange", () => {
    currentPath.value = window.location.hash;
  });
  const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || "/"] || IndexPage;
  });
  /* End: Routing. */

  /* TODO
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
  <div id="app">
    <header>
      <!-- Bootstrap: 'container' declares grid layout; 1 row, 2 columns. (Logo, Navibar) -->
      <div class="container"> 
        <div class="NaviBar row justify-content-between align-items-center">
          <!-- Bootstrap: 'col-auto' makes container width shrink to fit contents -->
          <div class="col-auto">
            <a href="/#/" class="img-link Logo">
              <img src="./assets/banner.png" />
            </a>
          </div>
          <div class="col-auto">
            <nav>
              <!-- Bootstrap: 'nav' makes container an actual navibar -->
              <ul class="nav">
                <li class="nav-item">
                  <a class="nav-link" href="/#/about">About</a>
                </li>
                <li class="nav-item">
                  <!-- Bootstrap: 'nav-link' provides v-centering. -->
                  <a class="nav-link" href="/#/transcripts">Transcripts</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div> 
    </header>
    <main>
      <component :is="currentView" />
    </main>
    <footer>
      <article class="Credits">
        <span class="FooterSectionHeader">
          Credits
        </span>
        <ul>
          <li>
            All textual content is owned by <a target="_blank" class="External" href="https://www.fandom.com/licensing">Fandom</a>
          </li>
          <li>
            This project's <a target="_blank" class="External" href="https://github.com/gchang12/html300-2024/tree/lesson8">GitHub</a> page
          </li>
          <li>
            Site logo provided by <a href="https://fontmeme.com/friendship-is-magic-font/" target="_blank" class="External">this site</a>
          </li>
        </ul>

        <div class="Disclaimer">All images are owned by Hasbro</div>
        <div class="Disclaimer">Made with no AI</div>
      </article>
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  /*min-height: 100%;*/
}
</style>


<!--
# Instructions
We'll spend our final couple of lessons working on the final project, so this will act as the final project rubric. We'll be using Nuxt, so please watch the video on Nuxt for a walkthrough of starting up a new project. Nuxt is very similar to Vue CLI, and we'll be able to deploy the course projects for free on Netlify automatically. We'll also be adding in our API calls and tying everything together.

## Requirements
- Create a new Nuxt app in a new repository, and push it to Github. Do not create it in the html300 repository that other assignments have been in.
- In your newly created Nuxt app, start migrating over your Vue template files and assets from the Vue CLI project to their respective spots. Basically any content in the App.vue file now goes in the layouts/default.vue The <nuxt-link> tag acts like the <router-view />.
- For internal links, now use <nuxt-link> components.
- Migrate any views/page components to the pages directory. You can create folder structures, or have an index.vue file within a folder that will generate the route to the folder's name (i.e. about/index.vue shows up in the browser at /about).
- Routes are generated based on the pages file structure, don't worry about a router file.
- Migrate any components or additional assets
- Add any additional packages you are using
- Incorporate data from an API. You may use this on various components or pages, but at least 1 instance of retrieving data from an API and:
-     With that returned data, build a corresponding component and use v-for to loop over the data
-     That component should have props validation as well as use at least 4 data points in the template itself (heading, description, image, statistics, etc)
-     The component should have some sort of method that causes a UI interaction on that instance of the component (show/hide, change the CSS, animation, etc)
- Your site should have at least 4 pages (including the home) with <nuxt-link> used to navigate between them in your nav
- Feel free to reuse as much content as you'd like from what you created in previous assignments.
- Deploy to Netlify. Remember that this will not work if the final assignment code is in the html300 repository. It must be in a new repository. -->
