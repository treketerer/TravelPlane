<script setup lang="ts">
// Логика компонента (при необходимости)
interface TripItem {
    type: 'place' | 'flight' | 'hotel'; // Указываем возможные типы
    data: object; // Позволяет иметь любые другие свойства, включая `data`
  }

const props = defineProps<{ itemData: TripItem }>()
// const props: TripItem =  {
//   "type": "hotel",
//   "data": {
//     "locations": [
//       {
//         "id": "12153",
//         "type": "City",
//         "state": "",
//         "countryIso": "RU",
//         "name": "Москва",
//         "fullname": "Москва, Россия",
//         "hotelsCount": "0",
//         "geo": {
//           "lat": "55.752041",
//           "lon": "37.617508"
//         }
//       }
//     ],
//     "hotels": [
//       {
//         "id": 1912615951,
//         "location": {
//           "lon": 37.61915,
//           "lat": 55.74992
//         },
//         "locationId": 12153,
//         "name": "Гостевой Дом Уланский"
//       }
//     ]
//   }
// }

</script>


<template v-if="(props.itemData.data).length > 2">
  <div class="item">
      <h2>Ближайшие отели</h2>
      <div v-for="(hotel, index) in props.itemData.data.hotels" :key="index">
        <details class="hotel-accord" >
          <summary>{{ hotel.name }}</summary>
          <p>{{ hotel.fullname }}</p>
          <p>Координаты {{ hotel.location.lat }} {{ hotel.location.lon }}</p>
          <a :href="'https://yandex.ru/maps/?mode=search&text=' + hotel.location.lat + '%2C' + hotel.location.lon"  target="_blank">Смотреть на Яндекс Картах</a>

        </details>
      </div>


      <!-- <input type="text" placeholder="Отель" class="hotel-input" />
      <div class="dates">
        <input type="date" placeholder="Дата" class="hotel-input" />
        <input type="date" placeholder="Дата" class="hotel-input" />
      </div> -->
  </div>


</template>

<style scoped>
.item{
  background-color: rgb(60, 57, 255);
  opacity: 0.8;
  width: 100%;
  max-width: 600px; /* ограничиваем максимальную ширину */
  margin: 0 auto; /* центрируем */
  padding: 12px;
  border-radius: 12px;
  box-sizing: border-box;
}

.hotel-accord{
  width: 100%;
  height: auto;
  font-size: 16px;
  transition: border-color 0.3s;

  color: white;
  font-weight: 750;
}

.hotel-accord summary{
  color: white;
  font-weight: 750;
  font-size: 17px;
}

.hotel-accord p{
  color: white;
  font-weight: 550;
}


h2 {
  text-align: center;
  font-weight: 700;
  /* background-color: ; */
}

.hotel-accord {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgb(60, 57, 255);
  border-radius: 12px;
  font-size: 16px;
  transition: border-color 0.3s;

  color: #757575;
  font-weight: 500;
}

.hotel-accord:focus {
  outline: none;
  border: 2px solid rgb(97, 57, 255)
}

.dates{
  display: grid;
  grid-template-columns: 50% 50%;
}

</style>
