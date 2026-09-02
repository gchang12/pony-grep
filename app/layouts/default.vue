<script setup>
  import Banner from '~/assets/images/banner.png';
</script>

<template>
  <div>
   <header>
     <div class="container-sm">
       <div class="row flex-sm-row flex-column">
         <div class="col">
           <NuxtLink to="/">
             <img :src="Banner" class="w-100" />
           </NuxtLink>
         </div>
         <div class="col-auto d-flex align-items-center justify-content-center">
           <nav>
             <ul class="nav">
               <li class="nav-item">
                 <NuxtLink class="nav-link" to="/search">Search</NuxtLink>
               </li>
               <li class="nav-item">
                 <NuxtLink class="nav-link" to="/episodes">Episodes</NuxtLink>
               </li>
             </ul>
           </nav>
         </div>
       </div>
     </div>
   </header>
   <main>
     <slot />
   </main>
   <footer>
     <div class="container d-flex justify-content-between">
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
     </div>
   </footer>
  </div>
</template>
