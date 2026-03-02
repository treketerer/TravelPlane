<script setup lang="ts">
import HeadComponent from './components/HeadComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import MainComponent from './components/MainPlannerComponent.vue'
import MapComponent from './components/MapComponent.vue'
// import FiltersComponent from './components/FiltersComponent.vue'
// import ItemCardComponent from './components/ItemCardComponent.vue'
import {ref} from 'vue'

const tripData = ref<object | null>(null);
function saveTripData(data){
  console.log("Поймал на вершине", data)
  tripData.value = data
}

</script>



<template>
  <HeadComponent />
  <MainComponent @data-generated-up="saveTripData"/>
  <MapComponent :trip-data="tripData"/>
  <FooterComponent />


</template>

<style scoped>
/* template {
  margin-top: 8%;
  display: flex;
  flex-direction: row;
  width: 100%;
} */
</style>
