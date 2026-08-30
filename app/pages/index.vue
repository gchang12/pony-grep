<script setup>

  const items = ref([
    {
      label: 'Icons',
      icon: 'i-lucide-smile',
      content: 'You have nothing to do, @nuxt/icon will handle it automatically.'
    },
    {
      label: 'Colors',
      icon: 'i-lucide-swatch-book',
      content: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      content: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
    }
  ])

</script>

<template>
  <UAccordion :items="items">
    <template #body="{ item }">
      <table>
        <thead>
          <tr>
            <th>This</th>
            <th>is</th>
            <th>Sparta</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in [1, 2, 3]">
            <td>This</td>
            <td>is</td>
            <td>Sparta</td>
          </tr>
        </tbody>
      </table>
    </template>
  </UAccordion>
</template>
