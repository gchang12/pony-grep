<script setup>

  const props = defineProps({
    image: String,
    url: String,
    writtenby: String,
    storyboard: String,
  });

</script>

<template>
  <div class="EpisodeInfoBox">
    <div class="EpisodeImageContainer">
      <img width="400" :src="image" />
    </div>
    <table>
      <tbody>
        <tr>
          <th>Wikia Page</th>
          <td>
            <a target="_blank" :href="url" v-if="url != null">{{ url }}</a>
            <span class="MissingLink" v-else>???</span>
          </td>
        </tr>
        <tr>
          <th>Written by</th>
          <td>
            <span class="Author" v-if="writtenby != null">{{ writtenby }}</span>
            <span v-else class="Author">???</span>
          </td>
        </tr>
        <tr>
          <th>Storyboarded by</th>
          <td>
            <span class="Storyboard" v-if="storyboard != null">{{ storyboard }}</span>
            <span class="Storyboard" v-else>???</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

