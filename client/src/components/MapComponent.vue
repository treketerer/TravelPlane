<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, watch } from 'vue';
import hotelIconUrl from '@/assets/hotel-icon.png';
import leafIconUrl from '@/assets/marker-icon-2x.png';
import airportIconUrl from '@/assets/airport-icon.png';

  // Ref для DOM-элемента карты
  // let mapContainer = ref<HTMLElement | null>(null);
  // Переменная для хранения экземпляра карты Leaflet
  let mapInstance: L.Map | null = null;
  // Слой для маркеров, чтобы легко их удалять/добавлять
  const markersLayer = L.layerGroup();
  // Слой для линий маршрута
  const polylinesLayer = L.layerGroup();

  // Определяем тип данных для элемента путешествия (опционально, но полезно для TS)
  interface TripItem {
    type: 'place' | 'flight' | 'hotel'; // Указываем возможные типы
    key: string; // Позволяет иметь любые другие свойства, включая `data`
  }

  const AnotherIconPrefub = L.Icon.extend({
      options: {
        iconSize:     [20, 20],
        iconAnchor:   [10, 10],
        popupAnchor:  [10, 0]
      }
  });

  const LeafIconPrefub = L.Icon.extend({
    options: {
        iconSize:     [25, 37,5],
        iconAnchor:   [12, 37.5],
        popupAnchor:  [0, -0]
      }
  });

  const AirportIconPrefub = L.Icon.extend({
    options: {
        iconSize:     [35, 35],
        iconAnchor:   [18, 22],
        popupAnchor:  [0, 0]
      }
  });

  const hotelIcon = new AnotherIconPrefub({
      iconUrl: hotelIconUrl
  })

  const airportIcon = new AirportIconPrefub({
      iconUrl: airportIconUrl
  })

  const leafIcon = new LeafIconPrefub({
      iconUrl: leafIconUrl
  })

  const props = defineProps<{
    tripData: TripItem[] | null;
  }>();

  onMounted(() => {

    mapInstance = L.map('map', {attributionControl: false}).setView([55.753615, 37.605562], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '',
        // scrollWheelZoom: false,
        // style: "height:'450px'"
    }).addTo(mapInstance);


    // printMarker([55.7536, 37.6055])
    // printMarker([55.753615, 37.605562], 1)
    // printMarker([55.753615, 37.605562], 2)

      // L.polyline([
      //   [17.385044, 78.486671],
      //   [16.506174, 80.648015]
      // ], {color: 'blue'}).addTo(map);

         // Добавляем слои для маркеров и линий на карту
      markersLayer.addTo(mapInstance);
      polylinesLayer.addTo(mapInstance);
  })

  function printLine(coordinates, color){
    L.polyline(coordinates, {color:  color}).addTo(polylinesLayer);
  }


  const iconsObjects = {
    0: leafIcon,
    1: hotelIcon,
    2: airportIcon
  }

  function printMarker(coordinates, iconType = 0){
    L.marker(coordinates, {icon: iconsObjects[iconType]}).addTo(markersLayer);
  }

  function clearMarkers() {
    markersLayer.clearLayers(); // Это удаляет все маркеры из группы слоёв [3](https://stackforgeeks.com/blog/clear-marker-layers-leaflet)
    polylinesLayer.clearLayers();
  };

  watch(() => props.tripData, (newTripData: any) => {
      clearMarkers()

      console.log("MapComponent: tripData изменился:", newTripData);
      try{
      let lastCoords = null
      for (let i = 0; i < newTripData.length; i++){
        console.log(newTripData[i])

        if (newTripData[i].type == "flight"){
          try{
            console.log(newTripData[i].data.from.coordinates,
                        newTripData[i].data.to.coordinates)

            printLine([
              newTripData[i].data.from.coordinates,
              newTripData[i].data.to.coordinates
            ], 'red')

            printMarker(newTripData[i].data.from.coordinates, 2)
            printMarker(newTripData[i].data.to.coordinates, 2)

            printLine([ newTripData[i].data.from.coordinates, lastCoords
              ], 'blue')

            lastCoords = newTripData[i].data.to.coordinates;
          } catch(err){
            console.error(err)
          }
        }

        else if (newTripData[i].type == "place"){
          try{
            if (i == 0){ mapInstance.setView(newTripData[i].data.coordinates, 15); }
            console.log(newTripData[i].data.coordinates)
            printMarker(newTripData[i].data.coordinates);

            if (lastCoords != newTripData[i].data.coordinates && lastCoords != null){
              printLine([
                lastCoords,
                newTripData[i].data.coordinates
              ], 'blue');
            }
            lastCoords = newTripData[i].data.coordinates
          } catch(err){
            console.error(err)
          }
        }

        else if (newTripData[i].type == "hotel"){
          try{
            for (const hotel of newTripData[i].data.hotels){
              console.log(hotel)
              const coords = [hotel.location.lat, hotel.location.lon]
              console.log(coords)
              printMarker(coords, 1);
            }
          } catch(err){
              console.error(err)
          }
        }
      }
    } catch (err){
      console.error(err)
    }
  }, {deep: true})

</script>

<template>
    <div id="map"></div>
</template>

<style scoped>
    #map  {
        height: 300px;
        /* width: 100%; */
    }
</style>
