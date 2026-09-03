<script setup>
  defineProps({
    header: String,
    imgSrc: String,
    imgAlt: String,
    subheader: String,
    rawHtmlList: Array,
  });
  function informUserAboutScreenshot() {
    alert('This is just a screenshot');
  }
</script>

<template>
  <section class="UsageArticle container">
    <h2>{{ header }}</h2>
    <slot name="paragraph">
    </slot>
    <div class="d-flex flex-column flex-lg-row">
      <button @click="informUserAboutScreenshot" class="btn btn-info">
        <figure>
          <figcaption>Screenshot of {{ imgAlt }}</figcaption>
          <img :src="imgSrc" :alt="imgAlt" title="This is just a screenshot" class="img-thumbnail w-100" />
        </figure>
      </button>
      <section class="container">
        <h3>{{ subheader }}</h3>
        <hr />
        <ol>
          <li class="mb-4 mt-4" v-for="rawHtml in rawHtmlList" v-html="rawHtml"></li>
        </ol>
      </section>
    </div>
  </section>
</template>
