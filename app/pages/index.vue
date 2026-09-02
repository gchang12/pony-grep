<script setup>

  import Search from "../assets/usage/search.png";
  import EpisodeIndex from "../assets/usage/episode-index.png";
  import Transcript from "../assets/usage/transcript.png";

</script>

<template>
  <div id="index">
    <article class="container">
      <h1>Welcome to <code>pony grep</code>!</h1>
      <p>Trying to remember a line from MLP G4?</p>
      <p>You've come to the right place!</p>
      <hr />
      <section class="container">
        <h2>Search</h2>
        <p>Use our <NuxtLink to="/search">search</NuxtLink> feature to search for a <code>regex</code> pattern.</p>
        <div class="d-flex">
          <img :src="Search" class="img-thumbnail" />
          <section class="container">
            <h3>Example</h3>
            <ol>
              <li class="mb-4 mt-4">&ldquo;I want to see if &lsquo;friendship is magic&rsquo; is said in MLP G4. I'll input <span class="FieldValue">friendship is magic</span> into the <span class="FieldName">Dialogue</span> box now.&rdquo;</li>
              <li class="mb-4 mt-4">&ldquo;I want to see if Discord or Twilight says it. I'll input <span class="FieldValue">Discord|Twilight</span> into the <span class="FieldName">Character</span> field.&rdquo;</li> 
              <li class="mb-4 mt-4">&ldquo;I want to see if they say it <span class="FieldValue">Seasons 1, 3, 9</span> in <span class="FieldValue">Friendship is Magic</span>. I'll check the <span class="FieldName">Friendship is Magic</span> box, hold <code>&lt;Shift&gt;</code>, and select <span class="FieldValue">S1, S3, S9</span>.&rdquo;</li> 
              <li class="mb-4 mt-4">&ldquo;Let's see if either Discord or Twilight say &lsquo;friendship is magic&rsquo; by hitting the <span class="FieldName">Search</span> button.&rdquo;</li>
            </ol>
          </section>
        </div>
      </section>
      <hr />
      <section class="container">
        <h2>Episode Index</h2>
        <p>Browse our <NuxtLink to="/episodes">comprehensive list of G4 transcripts</NuxtLink>, which include transcripts from the episodes, movies, specials, shorts, and clip-shows from <span class="Franchise">Friendship is Magic</span> and <span class="Franchise">Equestria Girls</span>.</p>
        <div class="d-flex">
          <img :src="EpisodeIndex" class="img-thumbnail" />
          <ol>
            <li class="mb-4 mt-4">Hover over an image to see the season it represents.</li>
            <li class="mb-4 mt-4">Click on the image to view the episodes for that season.</li>
            <li class="mb-4 mt-4">Select the episode name from the dropdown menu to view the transcript for the episode.</li>
          </ol>
        </div>
      </section>
      <hr />
      <section class="container">
        <h2>Episode</h2>
        <p>Have no idea where to start? Try reading the <NuxtLink to="/episodes/FiM/S1/01">episode transcript for episode one</NuxtLink>!</p>
        <div class="d-flex">
          <img :src="Transcript" width="1000" class="img-thumbnail" />
          <section>
            <h3>Fetch from <a target="_blank" href="https://ponyapi.net/">PonyAPI</a></h3>
            <ol>
              <li class="mb-4 mt-4">Click on the <span class="FieldName">Load Image</span> button.</li>
              <li class="mb-4 mt-4">Wait for the data to load.</li>
              <li class="mb-4 mt-4">Get data for the episode's wikia page, writer, storyboarder, plus the image thumbnail.</li>
            </ol>
          </section>
        </div>
      </section>
      <hr />
    </article>
    <!-- <button @click="reloadTranscript">Reload Transcript</button> -->
  </div>
</template>

<!--
<article class="container w-75">
<h1>Welcome to <code>ponygrep</code>!</h1>
<div class="WelcomeMessage">
<p>Trying to remember something a MLP:FiM character might have said?</p>
<p>You've come to the right place!</p>
<p><code>ponygrep</code> allows you to search all of MLP G4 for the bit of dialogue you're thinking of.</p>
</div>
<hr />
<article class="container">
<h2>Searching</h2>
<section class="Usage-Example">
<h3>Example</h3>
<div class="Usage-Step d-flex">
<img class="img-thumbnail" :src="SearchFormImg" />
</div>
</section>
</article>
<hr />
<article class="BrowsingTranscripts w-75 container">
<h2>Browsing Transcripts</h2>
<hr />
<section class="BrowsingStep">
<h3>1. Select Season</h3>
<img width="500px" class="img-thumbnail" :src="SeasonIndexImg" />
</section>
<hr />
<section class="BrowsingStep">
<h3>2. Select Episode</h3>
<img width="500px" class="img-thumbnail" :src="EpisodeIndexImg" />
</section>
<hr />
<section class="BrowsingStep">
<h3>3. Scroll Down and View</h3>
<img width="500px" class="img-thumbnail" :src="TranscriptImg" />
</section>
<hr />
<section class="BrowsingStep">
<h3>4. Close Transcript</h3>
<img width="500px" class="img-thumbnail" :src="CloseTranscriptImg" />
</section>
<hr />
</article>
</article>
-->
