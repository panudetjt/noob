<template>
  <p>Hello world! This is fastest site ภาษาไทย</p>

  <!-- <img
    :src="responsiveImage"
    alt="The choir inside Worcester Cathedral. Located in Worcester, Worcestershire, England. Photo by Michael D Beckwith on Unsplash"
  /> -->
  <picture>
    <source :srcSet="responsiveImageWebP.srcSet" type="image/webp" />
    <img
      :src="responsiveImage.src"
      :srcSet="responsiveImage.srcSet"
      :width="responsiveImage.width"
      :height="responsiveImage.height"
      sizes="(min-width: 1024px) 1024px, 100vw"
      alt="The choir inside Worcester Cathedral. Located in Worcester, Worcestershire, England. Photo by Michael D Beckwith on Unsplash"
    />
  </picture>
</template>

<script lang="ts">
// const responsiveImage = require("./assets/michael-d-beckwith-CDOl9BL8Qic-unsplash.jpg");
import responsiveImage from "./assets/michael-d-beckwith-CDOl9BL8Qic-unsplash.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048";
import responsiveImageWebp from "./assets/michael-d-beckwith-CDOl9BL8Qic-unsplash.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp";
import { Vue } from "vue-class-component";

export default class App extends Vue {
  responsiveImage = responsiveImage;
  responsiveImageWebP = responsiveImageWebp;
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  max-width: 100%;
  display: block;
}
</style>
