<script setup>

</script>


<template>
  <div id="app">
    <!-- <NuxtRouteAnnouncer /> -->
    <!-- <NuxtWelcome /> -->
    <header>
      <!-- Bootstrap: 'container' declares grid layout; 1 row, 2 columns. (Logo, Navibar) -->
      <div class="container"> 
        <div class="NaviBar row justify-content-between align-items-center">
          <!-- Bootstrap: 'col-auto' makes container width shrink to fit contents -->
          <div class="col-auto">
            <a href="/" class="img-link Logo">
              <img src="./assets/banner.png" />
            </a>
          </div>
          <div class="col-auto">
            <nav>
              <!-- Bootstrap: 'nav' makes container an actual navibar -->
              <ul class="nav">
                <li class="nav-item">
                  <a class="nav-link" href="/search">Search</a>
                </li>
                <li class="nav-item">
                  <!-- Bootstrap: 'nav-link' provides v-centering. -->
                  <a class="nav-link" href="/episode-transcripts">Transcripts</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div> 
    </header>
    <main>
      <NuxtPage />
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

