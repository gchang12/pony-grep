<script setup>
  import Banner from '~/assets/images/banner.png';
</script>

<template>
  <div>
   <header>
     <NuxtLink to="/">
       <img :src="Banner" />
     </NuxtLink>
     <nav>
       <NuxtLink to="/search">Search</NuxtLink>
       <NuxtLink to="/episodes">Episodes</NuxtLink>
     </nav>
   </header>
   <main>
     <slot />
   </main>
   <footer>
     <div class="Credits">
       <span class="Header">Credits</span>
       <p>All textual content is owned by <a target="_blank" href="https://www.fandom.com/licensing">Fandom</a></p>
       <p>Site logo provided by <a target="_blank" href="https://fontmeme.com/friendship-is-magic-font/">this site</a></p>
       <p>All images are owned by Hasbro</p>
     </div>
     <div class="About">
       <span class="Header">About</span>
       <p>This project's <a target="_blank" href="https://github.com/gchang12/pony-grep">GitHub</a> page</p>
       <p>Made with no AI</p>
     </div>
   </footer>
  </div>
</template>
