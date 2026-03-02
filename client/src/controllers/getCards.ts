import axios from 'axios'

export const getCardsData = async function () {
  try {
    console.log('START')
    const response = await axios.get('https://wikiway.com/dostoprimechatelnosti/top100/')
    const html = response.data
    console.log(html)
    // Здесь вы можете обработать HTML и передать данные в компоненты
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
  }
}
