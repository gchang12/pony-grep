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
       <NuxtLink to="/episode-index">Episode Index</NuxtLink>
     </nav>
   </header>
   <main>
     <slot />
   </main>
   <footer>
     All textual content is owned by <a target="_blank" href="https://www.fandom.com/licensing">Fandom</a>
     This project's <a target="_blank" href="https://github.com/gchang12/pony-grep">GitHub</a> page
     Site logo provided by <a target="_blank" href="https://fontmeme.com/friendship-is-magic-font/">this site</a>
     All images are owned by Hasbro
     Made with no AI
   </footer>
  </div>
</template>
