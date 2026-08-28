<script setup>
  /* Landing Page */
  /* Image Page */
  import SearchFormImg from "~/assets/images/search-form.png";
  import SeasonIndexImg from "~/assets/images/season-index.png";
  import EpisodeIndexImg from "~/assets/images/episode-index.png";
  import TranscriptImg from "~/assets/images/transcript.png";
  import CloseTranscriptImg from "~/assets/images/close-transcript.png";
</script>

<template>
  <div id="index">
    <!-- Bootstrap: 'w-75' to make text within more compact and readable. -->
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
            <!-- Bootstrap: 'img-thumbnail' for the image border. -->
            <img class="img-thumbnail" :src="SearchFormImg" />
            <ol class="m-5">
              <!-- Bootstrap: 'm-3' because the spaces between each line of instruction makes it more readable. -->
              <li class="Help m-3">&ldquo;I want to see if &lsquo;friendship is magic&rsquo; is said in MLP G4. I'll input <span class="_fieldValue">friendship is magic</span> into the <span class="_fieldName">Dialogue</span> box now.&rdquo;</li>
              <li class="Help m-3">&ldquo;I want to see if Discord or Twilight says it. I'll input <span class="_fieldValue">Discord|Twilight</span> into the <span class="_fieldName">Character</span> field.&rdquo;</li> 
              <li class="Help m-3">&ldquo;Let's see if either Discord or Twilight say &lsquo;friendship is magic&rsquo; by hitting the <span class="_fieldName">Search</span> button.&rdquo;</li>
            </ol>
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
  </div>
</template>
