<script setup>

  const response1 = await useFetch("json/transcriptLines.json");

  function reloadTranscript() {
    if (response1.data.value == null) {
      console.log("refreshing");
      response1.refresh();
    }
    console.log(response1);
    console.log(response1.data.value.length);
  }

</script>

<template>
  <div>
    <button @click="reloadTranscript">Reload Transcript</button>
  </div>
</template>
