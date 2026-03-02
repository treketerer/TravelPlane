import { getDistanceByTwoPlaces, getDateByDay } from "./utils.js"
import requestsHandler from "./requestsHandler.js";

class HotelsController{
  #hotelApiToken
  constructor(){
    this.#hotelApiToken = process.env.hotellookToken;
  }

  async findHotels(placesArr) {
    try {
      let duplicateArr = [...placesArr];
      let coef = 0
      let lastPlaceCoef = 0

      if (placesArr.length == 1) return;

      for (let i = 1; i < placesArr.length; i++) { // Начинаем с 1, так как сравниваем с предыдущим

        const currentPlace = placesArr[i];
        const previousPlace = placesArr[lastPlaceCoef];

        console.log("START", placesArr[i].type);
        if (currentPlace.type === 'flight') {
                continue;
            }

        const distance = getDistanceByTwoPlaces( currentPlace, previousPlace );
        console.log(distance);

        if (distance > 50) {
          console.log("SUCCCES");
          let hotelData = await this.getHotelsByCoords( currentPlace.data.coordinates );

          let retObj = {
            type: 'hotel',
            data: hotelData.results
          };

          console.log(retObj);

          // Вставляем отель после текущего места (i+1)
          duplicateArr.splice(i + coef, 0, retObj);
          lastPlaceCoef = i
          coef++;
        }
      }

      placesArr.length = 0;
      placesArr.push(...duplicateArr);
    } catch(err) {
      console.error(err);
    }
  }

  async hotelsGetKey() {
    try {
        const data = {
            grant_type: 'client_credentials',
            client_id: process.env.amadeusClientId,
            client_secret: process.env.amadeusClientSecret
        };

        const response = await axios.post(
            'https://test.api.amadeus.com/v1/security/oauth2/token',
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error("Ошибка запроса:", error.response?.data || error.message);
        throw error;
    }
  }

  async getHotelsByCoords(coordinatesArr){
    console.log(coordinatesArr)
    let hotels = await requestsHandler.makeRequest(`http://engine.hotellook.com/api/v2/lookup.json?query=${coordinatesArr[0]},${coordinatesArr[1]}&lang=ru&lookFor=both&limit=3&token=${this.#hotelApiToken}`)
    let hotelsData = hotels.results.hotels[0]
    console.log(hotelsData)
    return hotels
  }

  async getCostInHotel(hotelData){
    let cost = await requestsHandler.makeRequest(`http://engine.hotellook.com/api/v2/cache.json?&hotelId=${hotelData.id}&checkIn=${getDateByDay(7)}&checkOut=${getDateByDay(8)}&currency=rub&limit=1&token=${this.#hotelApiToken}`)                                                                                         //location=Saint-Petersburg
    return cost
  }

}

export default new HotelsController()
