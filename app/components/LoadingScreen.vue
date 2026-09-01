<script setup>
  defineProps({
    message: String,
  });
</script>

<template>
  <div class="LoadingScreen">
    <NuxtLoadingIndicator />
    <span class="LoadingMessage">{{ message }}</span>
  </div>
</template>
