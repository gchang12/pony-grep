<script setup>
  defineProps({
    header: String,
    imgSrc: String,
    imgAlt: String,
    subheader: String,
    rawHtmlList: Array,
    href: String,
  });
</script>

<template>
  <section class="UsageArticle container">
    <h2>{{ header }}</h2>
    <slot name="paragraph">
    </slot>
    <div class="d-flex flex-column flex-lg-row">
      <NuxtLink :to="href" class="btn btn-info">
        <figure>
          <figcaption>Go to {{ imgAlt }}</figcaption>
          <img :src="imgSrc" :alt="imgAlt" :title="'Go to ' + imgAlt" class="img-thumbnail w-100" />
        </figure>
      </NuxtLink>
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
