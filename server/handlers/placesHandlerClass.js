import requestsHandler from "./requestsHandler.js";
import { PROMPT, FIRST_PLACE_JSON, SECOND_PLACE_JSON } from '../cfg/prompt.js'
import CATEGORIES from '../cfg/categories.js'

export default class PlaceControllerClass{
  #place
  #category
  constructor(propmt, placesLimit){
    this.USER_REQ = propmt
    this.countOfPoints = placesLimit;

    this.placeApiLimit = 5;
    this.apiKey = process.env.geoapifyApiKey;

    this.#place = undefined;
    this.#category = undefined;
  }


  async getPlaceCode(place) {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${place}&lang=en&limit=1&type=city&apiKey=${this.apiKey}`;
    const data = await requestsHandler.makeRequest(url);

    if (!data.features || data.features.length === 0) {
        throw new Error(`Место ${place} не найдено`);
    }
    return data.features[0].properties.place_id;
  }

  async findIteretion(nowPlaces, nowShortedPlaces, errorDataForAI = "") {

      try {

        let firstResp = await requestsHandler.getMistralResponse( PROMPT + FIRST_PLACE_JSON + `\nЗапрос пользователя: "${this.USER_REQ}"\n` + `\n\nНа реализацию запроса пользователя тебе дано ${this.countOfPoints} точек` +  `Прерыдущие тобой найденные места: ${JSON.stringify(nowShortedPlaces)}\n` + `Категории: ${CATEGORIES}` + `\n` + errorDataForAI)
        let parsedResponse = requestsHandler.parseJsonAnswer(firstResp)
        console.log(parsedResponse)
        this.#place = parsedResponse.city;
        this.#category = parsedResponse.category;

        const placeCode = await this.getPlaceCode(this.#place);

        const url = `https://api.geoapify.com/v2/places?categories=${this.#category}&filter=place:${placeCode}&lang=ru&limit=${this.placeApiLimit}&apiKey=${this.apiKey}`;
        const answer = await requestsHandler.makeRequest(url);

        let secondResp = await requestsHandler.getMistralResponse( PROMPT + SECOND_PLACE_JSON + `\nЗапрос пользователя: "${this.USER_REQ}"` + `\nНа реализацию запроса пользователя тебе дано ${this.countOfPoints} точек` + `\nПрерыдущие тобой найденные места: ${JSON.stringify(nowShortedPlaces)}` + `\nОтвет системы, выбери самое интересное туристическое место: ${JSON.stringify(requestsHandler.removeUnwantedFields(answer), null, 2)}` + `\n` + errorDataForAI)

        let endResponse = requestsHandler.parseJsonAnswer(secondResp)
        console.log(endResponse)
        console.log(`\nМесто: ${endResponse.formatted}
            Название: ${endResponse.address_line1}
            Координаты: ${endResponse.coordinates[1]} ${endResponse.coordinates[0]}
            Категория: ${endResponse.categories}
            Ответ: ${endResponse.answer_to_user}`);


        nowShortedPlaces.push(`${endResponse.address_line1} в городе ${this.#place.toUpperCase()} под категорией ${this.#category} `)
        nowPlaces.push({type: "place", data: endResponse})

        console.log(nowPlaces, nowShortedPlaces)

      } catch (error) {
          console.error("Ошибка в main:", error, error.message);
          return await this.findIteretion(nowPlaces, nowShortedPlaces, 'В прошлой твоей попытке возникла ошибка - ' + error.message + ` Вот что ты искал. Место ${this.#place}. С категорией ${this.#category}`)
      }
  }

}
