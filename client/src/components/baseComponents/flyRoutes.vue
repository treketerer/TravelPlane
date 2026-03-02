<script setup lang="ts">
// Логика компонента (при необходимости)
interface TripItem {
    type: 'place' | 'flight' | 'hotel'; // Указываем возможные типы
    data: object; // Позволяет иметь любые другие свойства, включая `data`
  }

const props = defineProps<{ itemData: TripItem }>()
// const props: TripItem =  {
//     "type": "flight",
//     "data": {
//       "from": {
//         "name": "Шереметьево",
//         "country": "Россия",
//         "country_code": "ru",
//         "region": "Центральный федеральный округ",
//         "state": "Московская область",
//         "county": "городской округ Химки",
//         "city": "Химки",
//         "postcode": "141446",
//         "street": "Ленинградское шоссе",
//         "iso3166_2": "RU-MOS",
//         "lon": 37.4238008194297,
//         "lat": 55.97608755,
//         "formatted": "Шереметьево, Ленинградское шоссе, Химки, Московская область, Россия, 141446",
//         "address_line1": "Шереметьево",
//         "address_line2": "Ленинградское шоссе, Химки, Московская область, Россия, 141446",
//         "categories": [
//           "airport",
//           "airport.international"
//         ],
//         "operator": "АО «Международный аэропорт Шереметьево»",
//         "name_other": {
//           "official_name": "Международный аэропорт Шереметьево имени А. С. Пушкина"
//         },
//         "name_international": {
//           "af": "Internasionale Lughawe Sjeremetjewo",
//         },
//         "ele": 192,
//         "wiki_and_media": {
//           "wikidata": "Q192733",
//           "wikipedia": "ru:Шереметьево"
//         },
//         "airport": {
//           "iata": "SVO",
//           "icao": "UUEE"
//         },
//         "distance": 24329,
//         "coordinates": [55.97608755, 37.4238008194297]
//       },
//       "to": {
//         "name": "Пулково",
//         "old_name": "Шоссейная",
//         "country": "Россия",
//         "country_code": "ru",
//         "region": "Северо-Западный федеральный округ",
//         "state": "Санкт-Петербург",
//         "city": "Санкт-Петербург",
//         "postcode": "196210",
//         "district": "округ Пулковский меридиан",
//         "suburb": "Авиагородок",
//         "street": "Толмачёвская улица",
//         "iso3166_2": "RU-SPE",
//         "lon": 30.2676011131095,
//         "lat": 59.8016986,
//         "formatted": "Пулково, Толмачёвская улица, Авиагородок, Санкт-Петербург, Россия, 196210",
//         "address_line1": "Пулково",
//         "address_line2": "Толмачёвская улица, Авиагородок, Санкт-Петербург, Россия, 196210",
//         "categories": [
//           "airport",
//           "airport.international"
//         ],
//         "website": "https://pulkovoairport.ru/",
//         "name_other": {
//           "old_name": "Шоссейная"
//         },
//         "name_international": {
//           "de": "Pulkowo",
//           "en": "Pulkovo Airport",
//           "ru": "Пулково"
//         },
//         "ele": 24,
//         "wiki_and_media": {
//           "wikidata": "Q690122",
//           "wikipedia": "ru:Пулково (аэропорт)"
//         },
//         "airport": {
//           "iata": "LED",
//           "icao": "ULLI"
//         },
//         "distance": 13980,
//         "coordinates": [59.8016986, 30.2676011131095]
//       },
//       "flight_data": {
//         "flight_number": "275",
//         "link": "/search/SVO0205LED1?t=5N17462052001746210000000080SVOLED_7f3126f1dc4eb641b4a766ced1dd3fb8_4213&search_date=01052025&expected_price_uuid=e181fda3-37bc-4d4b-bf98-b2a4c819bb00&origin_airports=0&expected_price_source=share&expected_price_currency=rub&expected_price=4213",
//         "origin_airport": "SVO",
//         "destination_airport": "LED",
//         "departure_at": "2025-05-02T17:00:00+03:00",
//         "airline": "5N",
//         "destination": "LED",
//         "origin": "MOW",
//         "price": 4213,
//         "return_transfers": 0,
//         "duration": 80,
//         "duration_to": 80,
//         "duration_back": 0,
//         "transfers": 0
//       }
//     }
//   }
</script>

<template>
  <div class="item">
    <h2>Авиаперелет</h2>
    <div class="fly-card">
      <div class="fly-data from">{{ props.itemData.data.from.name }}</div>
      <div class="arrow">→</div>
      <div class="fly-data to">{{ props.itemData.data.to.name }}</div>
      <div class="fly-data info">Стоимость {{ props.itemData.data.flight_data.price }}₽</div>
      <div class="fly-data info">Продлится {{ new Date(props.itemData.data.flight_data.duration * 1000).toISOString().substr(14, 5) }}</div>
      <a :href="'https://www.aviasales.ru' + props.itemData.data.flight_data.link" class="fly-data link" target="_blank">Купить билет</a>
    </div>
  </div>
</template>

<style scoped>
.item {
  background-color: #1b6eff;
  opacity: 0.8;
  width: 100%;
  max-width: 600px; /* ограничиваем максимальную ширину */
  margin: 0 auto; /* центрируем */
  padding: 12px;
  border-radius: 12px;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  font-weight: 700;
  margin-bottom: 12px;
  color: white;
}

.fly-card {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 4px;
  align-items: center;
}

.fly-data {
  padding: 10px 12px;
  border-radius: 8px;
  /* border: 2px solid #0051ffb0; */
  background-color: white;
  color: #0e00d2;
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow {
  color: white;
  font-size: 18px;
  padding: 0 4px;
}

.info {
  grid-column: span 3;
}

.link {
  grid-column: span 3;
  background-color: #000dff;
  color: white !important;
  text-decoration: none;
  font-weight: 750;
  font-size: 15px;
  transition: background-color 0.2s;
}

.link:hover {
  background-color: #001ae0;
}

@media (max-width: 480px) {
  .fly-card {
    grid-template-columns: 1fr;
  }

  .arrow {
    display: none;
  }

  .fly-data {
    grid-column: span 1 !important;
  }
}
</style>
