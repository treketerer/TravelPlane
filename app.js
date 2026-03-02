// Подключение путей
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Путь к текущему файлу
const __dirname = path.dirname(__filename); // Путь к директории
const viewsPath = path.join(__dirname, 'dist'); // Путь к папке views

// Импорт переменных из .env
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '.env') }); // Подргрузка переменных из .env файла

// Инициализация сервера
import express from "express";
import cors from 'cors'

const generateTrip = (await import('./server/generator.js')).default;

const app = express();

// Статика и модификаторы
app.use(express.static(viewsPath));
app.use(express.json());
app.use(cors())

// Эндпоинты
app.get('/', function (req,res) {
  res.sendFile(path.join(viewsPath, "index.html"));
});

app.post('/api/generate-trip', async (req,res) => { // Обработка запроса на генерацию маршрута
  if (!req.body.prompt || !req.body.pointCount){ // Проврка на наличие данных для генерации
    res.status(400).send('Bad Request');
    return
  }

  try{
    await generateTrip(req.body.prompt, Number(req.body.pointCount), tripData => { // Вызов функции генерации маршрута
      res.json(tripData); // Возврат ответа пользователю
    })
  } catch(err){
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/api/generate-trip', async (req,res) => {
  await generateTrip("Выбери одно место в Москве и в Питере", 2, tripData => {
    res.json(tripData);
  })
});

let port = process.env.server_port || 3000;
app.listen(port, () => { // Добавим callback для подтверждения запуска
  console.log(`Сервер запущен на http://127.0.0.1:${port}`);
});
