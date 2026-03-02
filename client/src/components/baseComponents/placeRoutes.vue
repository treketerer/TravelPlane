<script setup lang="ts">
// Логика компонента (при необходимости)
interface TripItem {
    type: 'place' | 'flight' | 'hotel'; // Указываем возможные типы
    data: object; // Позволяет иметь любые другие свойства, включая `data`
  }

const props = defineProps<{ itemData: TripItem }>()
// const props: TripItem = {
//     "type": "place",
//     "data": {
//       "formatted": "Грановитая палата, Тверской район, Москва, Россия, 103073",
//       "address_line1": "Грановитая палата",
//       "coordinates": [55.7505101, 37.6167066011401],
//       "categories": [
//         "entertainment",
//         "entertainment.museum"
//       ],
//       "cute_answer_to_user": "Грановитая палата — это одно из самых старых зданий Московского Кремля, построенное в XVI веке. Здесь можно увидеть уникальные архитектурные элементы и узнать много интересного о истории России. Это место обязательно стоит посетить, чтобы почувствовать дух древней Москвы!"
//     }
// }

</script>
   <template v-if="(props.itemData.data).length > 2">
      <details class="destination-input" >
        <summary>{{ props.itemData.data.address_line1 }}</summary>
        <p>{{ props.itemData.data.answer_to_user }}</p>
        <p> ({{ props.itemData.data.formatted }} )</p>
        <a :href="'https://yandex.ru/maps/?mode=search&text=' + props.itemData.data.coordinates[0] + '%2C' + props.itemData.data.coordinates[1]"  target="_blank">Смотреть на Яндекс Картах</a>
      </details>
    </template>
<style scoped>


.destination-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #0051ffb0;
  border-radius: 12px;
  font-size: 16px;
  transition: border-color 0.3s;

  color: #0051ffb0;
}

.destination-input summary{
  color: #0051ffb0;
  font-weight: 750;
}

.destination-input:focus {
  outline: none;
  border-color: #0051ff;
}

/* .destination-input::placeholder {
  color: #757575;
  font-weight: 500;
 } */

</style>
