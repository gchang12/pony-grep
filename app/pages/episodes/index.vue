<script setup>

  import seasonList from "../../assets/json/seasonList.json";

  const response2 = await useFetch("json/animationIndex.json");

</script>

<template>
  <div id="episodes">
    <h1>Episodes</h1>
    <article>
      <h2>Friendship is Magic</h2>
      <ol class="SeasonIndex FiM">
        <!-- Each of these has to be a dropdown menu. -->
        <li :id="season.urlName" v-for="season in seasonList.filter(season => season.series === 'FiM')" :key="season.urlName">
          <figure>
            <img width="300" :src="'/images/' + season.imgName + '.webp'" />
            <figcaption class="SeasonName">{{ season.name }}</figcaption>
          </figure>
        </li>
      </ol>
    </article>
    <article>
      <h2>Equestria Girls</h2>
      <ol class="SeasonIndex FiM">
        <!-- Each of these has to be a dropdown menu. -->
        <li :id="season.urlName" v-for="season in seasonList.filter(season => season.series === 'EqG')" :key="season.urlName">
          <figure>
            <img width="300" :src="'/images/' + season.imgName + '.webp'" />
            <figcaption class="SeasonName">{{ season.name }}</figcaption>
          </figure>
        </li>
      </ol>
    </article>
  </div>
</template>

<!--
#S1 {
  background-image: url("../images/My_Little_Pony_Theme_Song.webp");
}
#S2 {
  background-image: url("../images/My_Little_Pony_Theme_Song.webp");
}
#S3 {
  background-image: url("../images/My_Little_Pony_Theme_Song.webp");
}
#S4 {
  background-image: url("../images/Photo_Finish_taking_photo_S4_Opening.webp");
}
#S5 {
  background-image: url("../images/Photo_Finish_taking_photo_S4_Opening.webp");
}
#S6 {
  background-image: url("../images/Photo_Finish_taking_photo_S6_opening.webp");
}
#S7 {
  background-image: url("../images/Photo_Finish_taking_photo_S7_opening.webp");
}
#The_Movie {
  background-image: url("../images/My_Little_Pony_The_Movie_new_poster_by_Lionsgate.webp");
}
#S8 {
  background-image: url("../images/Photo_Finish_taking_the_class_photo_S8_opening.webp");
}
#Best_Gift_Ever {
  background-image: url("../images/My_Little_Pony_Best_Gift_Ever_promotional_title_card.webp");
}
#Shorts {
  background-image: url("../images/Twilight_stares_at_ladybug_with_fright_MLPS4.webp");
}
#S9 {
  background-image: url("../images/Photo_Finish_taking_the_class_photo_S8_opening.webp");
}
#Rainbow_Roadtrip {
  background-image: url("../images/My_Little_Pony_Rainbow_Roadtrip_title_card.webp");
}
#Friendship_is_Forever {
  background-image: url("../images/Mane_Six,_Starlight,_and_Spike_after_the_coronation_MLPCS6.webp");
}
#Equestria_Girls {
  background-image: url("../images/Equestria_Girls_second_movie_poster.webp");
}
#Rainbow_Rocks {
  background-image: url("../images/Rainbow_Rocks_Poster_2.webp");
}
#Friendship_Games {
  background-image: url("../images/Friendship_Games_Shout!_Factory_poster.webp");
}
#Legend_of_Everfree {
  background-image: url("../images/Legend_of_Everfree_poster.webp");
}
#Dance_Magic {
  background-image: url("../images/Dance_Magic_title_card_EGS1.webp");
}
#Movie_Magic {
  background-image: url("../images/Movie_Magic_title_card_EGS2.webp");
}
#Mirror_Magic {
  background-image: url("../images/Mirror_Magic_title_card_EGS3.webp");
}
#Summertime_Shorts {
  background-image: url("../images/Sunset_and_Twilight_enter_Canterlot_High_School_SS6.webp");
}
#Better_Together-S1 {
  background-image: url("../images/Rarity_singing_her_heart_out_EGDS27.webp");
}
#Choose_Your_Own_Ending-S1 {
  background-image: url("../images/Twilight_Sparkle_in_contemplative_thought_CYOE3.webp");
}
#Forgotten_Friendship {
  background-image: url("../images/Forgotten_Friendship_Netflix_poster.webp");
}
#Rollercoaster_of_Friendship {
  background-image: url("../images/Rollercoaster_of_Friendship_Netflix_thumbnail.webp");
}
#Better_Together-S2 {
  background-image: url("../images/Dazzlings_lying_in_the_neon_garden_EGDS48.webp");
}
#Spring_Breakdown {
  background-image: url("../images/Spring_Breakdown_title_card_EGSB.webp");
}
#Sunsets_Backstage_Pass {
  background-image: url("../images/Sunset's_Backstage_Pass_title_card_EGSBP.webp");
}
#Choose_Your_Own_Ending_S2 {
  background-image: url("../images/Rainbow_Dash_wondering_who_to_choose_CYOE17.webp");
}
#Holidays_Unwrapped {
  background-image: url("../images/Holidays_Unwrapped_title_card_EGHU.webp");
}
-->
