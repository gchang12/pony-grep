<script setup>

  import Search from "../assets/usage/search.png";
  import EpisodeIndex from "../assets/usage/episode-index.png";
  import Transcript from "../assets/usage/transcript.png";

  import UsageArticle from "../components/UsageArticle.vue";

  useHead({
    title: "Pony Grep!",
  });

  const rawHtmlDict = {
    search: [
      '&ldquo;I want to see if &lsquo;friendship is magic&rsquo; is said in MLP G4. I\'ll input <span class="FieldValue">friendship is magic</span> into the <span class="FieldName">Dialogue</span> box now.&rdquo;',
      '&ldquo;I want to see if Discord or Twilight says it. I\'ll input <span class="FieldValue">Discord|Twilight</span> into the <span class="FieldName">Character</span> field.&rdquo;',
      '&ldquo;I want to see if they say it <span class="FieldValue">Seasons 1, 3, 9</span> in <span class="FieldValue">Friendship is Magic</span>. I\'ll check the <span class="FieldName">Friendship is Magic</span> box, hold <code>&lt;Shift&gt;</code>, and select <span class="FieldValue">S1, S3, S9</span>.&rdquo;',
      '&ldquo;Let\'s see if either Discord or Twilight say &lsquo;friendship is magic&rsquo; by hitting the <span class="FieldName">Search</span> button.&rdquo;',
    ],
    index: [
      'Hover over an image to see the season it represents.',
      'Click on the image to view the episodes for that season.',
      'Select the episode name from the dropdown menu to view the transcript for the episode.',
    ],
    transcript: [
      'Click on the <span class="FieldName">Load Image</span> button.',
      'Wait for the data to load from <a target="_blank" href="https://ponyapi.net/">PonyAPI</a>.',
      'Get data for the episode\'s wikia page, writer, storyboarder, plus the image thumbnail.',
    ],
  };

</script>

<template>
  <div id="index">
    <article class="container mb-5">
      <h1>Welcome to <code>pony grep</code>!</h1>
      <p>Trying to remember a line from MLP G4?</p>
      <p>You've come to the right place!</p>
      <hr />
      <UsageArticle header="Search" :imgSrc="Search" imgAlt="search page" subheader="Example" :rawHtmlList="rawHtmlDict.search">
        <template #paragraph>
          <p>Use our <NuxtLink to="/search" target="_blank">search</NuxtLink> feature to search all MLP G4 dialogue for a <code>regex</code> pattern.</p>
        </template>
      </UsageArticle>
      <hr />
      <UsageArticle header="Episode Index" :imgSrc="EpisodeIndex" imgAlt="episode index" subheader="How to Use" :rawHtmlList="rawHtmlDict.index">
        <template #paragraph>
           <p>Browse our <NuxtLink to="/episodes" target="_blank">comprehensive list of G4 transcripts</NuxtLink>, which include transcripts from the episodes, movies, specials, shorts, and clip-shows from <span class="Franchise">Friendship is Magic</span> and <span class="Franchise">Equestria Girls</span>.</p>
        </template>
      </UsageArticle>
      <hr />
      <UsageArticle header="Episode Transcript" :imgSrc="Transcript" imgAlt="episode transcript" subheader="Fetch from PonyAPI" :rawHtmlList="rawHtmlDict.transcript">
        <template #paragraph>
          <p>Have no idea where to start? Try reading the <NuxtLink to="/episodes/FiM/S1/01" target="_blank">episode transcript for episode one</NuxtLink>!</p>
        </template>
      </UsageArticle>
    </article>
  </div>
</template>
