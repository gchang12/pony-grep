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
     <div class="container d-flex justify-content-between flex-md-row flex-column">
       <div class="Credits m-4">
         <span class="Header">Credits</span>
         <div class="Disclaimer">All textual content is owned by <a target="_blank" href="https://www.fandom.com/licensing">Fandom</a></div>
         <div class="Disclaimer">Site logo provided by <a target="_blank" href="https://fontmeme.com/friendship-is-magic-font/">this site</a></div>
         <div class="Disclaimer">All images are owned by Hasbro</div>
       </div>
       <div class="About m-4">
         <span class="Header">About</span>
         <div class="Disclaimer">This project's <a target="_blank" href="https://github.com/gchang12/pony-grep">GitHub</a> page</div>
         <div class="Disclaimer">Made with no AI</div>
       </div>
     </div>
   </footer>
  </div>
</template>
