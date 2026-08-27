<script setup>

  import defineProps from 'vue';

  defineProps({
    //searchResults: Array,
    //seriesTitle: String,
    seriesName: String,
    collapseKey: String,
  });

</script>

<template>
  <Accordion parent>
    <AccordionItem>
      <AccordionHeader level="3">
        <!-- Bootstrap: 'd-flex', 'justify-content-between' to separate series title and result-count.-->
        <!-- Bootstrap: 'btn-block' so that it spans entire width of container.-->
        <AccordionButton :data-series="seriesName" class="ShowResults d-flex justify-content-between btn btn-lg btn-block accordion-button" aria-expanded="true" :aria-controls="'collapse-' + collapseKey">
          <slot name="header">
          </slot>
        </AccordionButton>
      </AccordionHeader>
      <AccordionCollapse :id="'collapse-' + collapseKey" :aria-labelledby="'heading-' + collapseKey">
        <AccordionBody class="SearchResults accordion-body">
          <!-- Bootstrap: 'table-striped' for line visibility. -->
          <slot name="body">
          </slot>
        </AccordionBody>
      </AccordionCollapse>
    </AccordionItem>
  </Accordion>
</template>

