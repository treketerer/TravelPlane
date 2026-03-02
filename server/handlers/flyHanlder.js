import { getPlaceCoords, getDistanceByTwoPlaces, getDateByDay } from "./utils.js"
import requestsHandler from "./requestsHandler.js";

class FlyController{
  #geoapifyApiKey
  #travelpayoutsApiKey
  constructor(){
    this.#geoapifyApiKey = process.env.geoapifyApiKey;
    this.#travelpayoutsApiKey = process.env.travelpayoutsApiKey;
  }

  async getNearAirportByCoords(lat, lan){
    try{
      let find = await requestsHandler.makeRequest(`https://api.geoapify.com/v2/places?categories=airport.international&filter=circle:${lat},${lan},350000&bias=proximity:${lat},${lan}&lang=ru&limit=1&apiKey=${this.#geoapifyApiKey}`)
      console.log(find)
      if (find.features.length != 0) {find = this.parseAirportData(find)}
      if (find.airport.iata == "OSF") {
        find = await requestsHandler.makeRequest(`https://api.geoapify.com/v2/places?categories=airport.international&filter=circle:${lat},${lan},500000&bias=proximity:${lat},${lan}&lang=ru&limit=2&apiKey=${this.#geoapifyApiKey}`)
        find = this.parseAirportData(find, 1)
      }
      return find
    } catch(err){
        console.error(err)
        return {
          "type": "FeatureCollection",
          "features": []
        }
      }
    }

  parseAirportData(airport, featureId = 0){
      console.log(JSON.stringify(airport, null, 4))
      let baseAirport = requestsHandler.removeUnwantedFields(airport).features[featureId].properties
      baseAirport.coordinates = [baseAirport.lat, baseAirport.lon]
      return baseAirport
  }

  async getAirtravel(from, to){
      let date = new Date()
      date.setDate(date.getDate() + 30);
      let answer = await requestsHandler.makeRequest(`https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${from}&destination=${to}&departure_at=${getDateByDay(1)}&sorting=price&direct=false&limit=5&page=1&one_way=true&token=${this.#travelpayoutsApiKey}`)
      return answer.data[0]
  }

  async findFlightTickets(places){
      let duplicateArr = [...places]
      let coef = 0

      for (let i = 0; i < places.length-1; i++){
        try{
          if (getDistanceByTwoPlaces(places[i], places[i+1]) > 250){
              let fAirport = await this.getNearAirportByCoords( ...getPlaceCoords(places[i]) )
              let sAirport = await this.getNearAirportByCoords( ...getPlaceCoords(places[i+1]) )

              console.  log(sAirport.features)
              console.log(fAirport.features)

              if (fAirport.features || sAirport.features){
                continue;}

              console.log(fAirport, sAirport)
              let coupleArr = [fAirport,  sAirport]

              let airtravel = await this.getAirtravel(coupleArr[0].airport.iata, coupleArr[1].airport.iata)

              let retObj = {
                type: 'flight',
                data: {
                  from:coupleArr[0],
                  to: coupleArr[1],
                  flight_data: airtravel
                }
              }

              duplicateArr.splice(i + 1 + coef, 0, retObj);
              coef++;
          }
        } catch (err){
          console.error(err)
        }
      }

      // Переназначаю исходный массив, теперь с аэропортами
      places.length = 0; // Очищаем исходный массив
      places.push(...duplicateArr); // Заполняем новыми значениями
    }
  }



export default (new FlyController())
