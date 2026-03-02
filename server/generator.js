  import flyHanlder from './handlers/flyHanlder.js';
  import hotelsHandler from './handlers/hotelsHandler.js';
  import PlacesControlleClass from './handlers/placesHandlerClass.js';
  import { filterGeoPoints } from './handlers/utils.js';

export default async function generateTrip(prompt, placesLimit, callback){
   const placesHandler = new PlacesControlleClass(prompt, placesLimit) // Создание экзмепляра генератора маршрута

   let placesArr = [] // Массив точек маршрута
   let shortedPlacesArr = [] // Сокращенное описание точек, предоставляемое ии

    for (let i = 0; i < placesHandler.countOfPoints; i++){ // Цикл длиной в число точек
        await placesHandler.findIteretion(placesArr, shortedPlacesArr) // Генерация одной точки маршрута
    }

    let finalRoute = filterGeoPoints(placesArr) // Фильтрация полученных точек по расстоянию,
                                                // составление последовательного маршрута

    await flyHanlder.findFlightTickets(finalRoute) // Поиск авиабилетов для отдаленных точек
    await hotelsHandler.findHotels(finalRoute) // Поиск отелей для отдаленных точек

    console.log(finalRoute) // Вывод в консоль финального маршрута для отладки

    callback(finalRoute) // Возрат ответа из функции
}
