<script setup>
  import '~/assets/css/app.scss';

  // TODO: Substitute NuxtUI components for BS5 components

</script>

<template>
  <UApp>
    <div id="app">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>

<!--
### Additional items:
- The site should have at least 4 pages (including the home) with `<nuxt-link>` used to navigate between them in the nav
- Feel free to reuse as much content as you'd like from what you created in previous assignments
- Incorporate data from an API. (See below for API suggestions)
  - 1 instance of retrieving data from an API
  - Build a custom component to display the data returned from the API
  - That component should have props validation and use at least 4 pieces of data from the API (if possible). For example, if the returned data is of the format `{image: 'http://path.com/123', name: 'stingray', created: '10-12-2019', author: 'Claude'}`, the component should display the image, name, created date, and author information
- Deploy to Netlify https://app.netlify.com/start
- **Bonus:**  Create UI interactions to interact with your API data   
- **Extra Bonus:**  Create dynamic routing with your data through components with single pages
-	**Super Extra Bonus:** Point a custom domain to your site
-->

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
  - With that returned data, build a corresponding component and use v-for to loop over the data
  - That component should have props validation as well as use at least 4 data points in the template itself (heading, description, image, statistics, etc)
  - The component should have some sort of method that causes a UI interaction on that instance of the component (show/hide, change the CSS, animation, etc)
- Your site should have at least 4 pages (including the home) with <nuxt-link> used to navigate between them in your nav
- Feel free to reuse as much content as you'd like from what you created in previous assignments.
- Deploy to Netlify. Remember that this will not work if the final assignment code is in the html300 repository. It must be in a new repository.
-->

<!--
Lesson 09 Assignment
====================
Criteria Ratings Pts
Nuxt
----
- 2 pts - Complete - Converted to Nuxt framework
- 1 pts - Incomplete - Missing Nuxt integration
- 0 pts - Missing - Not refactored
API
---
- 2 pts - Complete - Returned data from API correctly
- 1 pts - Incomplete - Returned data, didn’t use components or not enough data
- 0 pts - Missing - Didn’t use an API
Routing
-------
- 2 pts - Complete - Added routing for all pages using pages directory and <nuxt-link>
- 1 pts - Incomplete - Routing not available for all pages
- 0 pts - Missing - No use of routing
Props on Data Component
-----------------------
- 2 pts - Complete - Created props validation and correctly used props in component
- 1 pts - Incomplete - Didn't create props validation or incorrectly used props in component
- 0 pts - Missing - Didn't use a component
Data Component
--------------
- 3 pts - Complete - Used 4 data points in component from returned API and UI interaction
- 2 pts - Approaching Complete - Used less than 4 data points in component from returned API data or missing UI interaction
- 1 pts - Incomplete - Used less than 1 or 2 data points in component from returned API data and missing UI interaction
- 0 pts - Missing - Didn't use a component
Pages
-----
- 3 pts - Complete - Created all 4 required pages
- 2 pts - Approaching Complete - Missing a page or missing API usage
- 1 pts - Incomplete - Only 1 or 2 pages
- 0 pts - Missing - Static HTML instead of Nuxt
Netlify Hosting
---------------
- 2 pts - Complete - Created Netlify account and connected to project GitHub repo for automated deployment
- 1 pts - Incomplete - Netlify deployment/link not working correctly
- 0 pts - Missing - No Netlify link
-->

