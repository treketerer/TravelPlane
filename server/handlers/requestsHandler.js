import axios from "axios"
import OpenAI from 'openai';


class RequestsController{

  constructor(){
    this.mistralApiKey = process.env.mistralApiKey;

    this.client = new OpenAI({
        apiKey: this.mistralApiKey,
        baseURL: "https://api.mistral.ai/v1/",
    });
  }


  async makeRequest(url, athorization = undefined) {
      console.log(url);
      try {
          let config = {}
          if (athorization){
              config = {
                  headers: {
                      'Authorization': athorization
                  }
              }
          }
          const response = await axios.get(url, config);
          return response.data;
      } catch (error) {
          console.error("Ошибка запроса:", error);
          throw error;
      }
  }

  async getMistralResponse(content) {
    // console.log(content)
    try {
        const response = await this.client.chat.completions.create({
            model: "mistral-small-latest",
            messages: [{'role': 'user', 'content': content}],
            temperature: 0.7, // Добавлен параметр для контроля креативности ответов
        });

        // Убрано JSON.parse, так как response уже объект
        console.log(response.choices[0]?.message?.content || "Не удалось получить ответ");

        return response.choices[0]?.message?.content;
    } catch (error) {
        console.error("Ошибка при запросе к API:", error);
        throw error;
    }
  }

  removeUnwantedFields(geoJson) {
      if (!geoJson || !geoJson.features || !Array.isArray(geoJson.features)) {
        return geoJson;
      }

      const cleanedFeatures = geoJson.features.map(feature => {
        // Создаем копию объекта feature, чтобы не мутировать оригинал
        const cleanedFeature = {...feature};

        // Удаляем geometry
        if (cleanedFeature.geometry) {
          delete cleanedFeature.geometry;
        }

        // Удаляем поля из properties
        if (cleanedFeature.properties) {
          const props = cleanedFeature.properties;
          delete props.details;
          delete props.datasource;
          delete props.place_id;
        }

        return cleanedFeature;
      });

      return {
        ...geoJson,
        features: cleanedFeatures
      };
    }

  parseJsonAnswer(text){
    // Извлекаем JSON
    const jsonStart = text.indexOf('```json') + 7;
    const jsonEnd = text.indexOf('```', jsonStart);
    const jsonString = text.substring(jsonStart, jsonEnd).trim();

    // Парсим JSON
    console.log(text)
    return JSON.parse(jsonString)
  }
}

export default (new RequestsController())
