<script setup>
  defineProps({
    header: String,
    imgSrc: Object,
    imgAlt: String,
    subheader: String,
    rawHtmlList: Array,
  });
</script>

<template>
  <section class="UsageArticle container">
    <h2>{{ header }}</h2>
    <slot name="paragraph">
    </slot>
    <div class="d-flex flex-column flex-lg-row">
      <img :src="imgSrc" :alt="imgAlt" title="This is just a screenshot" class="img-thumbnail w-100" />
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
