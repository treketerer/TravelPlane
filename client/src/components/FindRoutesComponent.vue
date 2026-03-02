<script setup lang="ts">
  // Импортируем все необходимые компоненты
  import placeRoutes from './baseComponents/placeRoutes.vue';
  import flyRoutes from './baseComponents/flyRoutes.vue'; // Раскомментировать/добавить
  import hotelRoutes from './baseComponents/hotelRoutes.vue'; // Раскомментировать/добавить
  // import buttonBase from './baseComponents/buttonBase.vue';

  // Определяем тип данных для элемента путешествия (опционально, но полезно для TS)
  interface TripItem {
    type: 'place' | 'flight' | 'hotel'; // Указываем возможные типы
    key: string; // Позволяет иметь любые другие свойства, включая `data`
  }


  const props = defineProps<{
    tripData: TripItem[] | null;
  }>();

  // Создаем карту, которая связывает строковые типы с импортированными компонентами
  const componentMap: { [key: string]:unknown } = {
    'place': placeRoutes,
    'flight': flyRoutes,
    'hotel': hotelRoutes,
    // Добавьте другие типы, если они появятся
  };


</script>

<template>
  <div class="destination-card">
    <div class="card-content">
      <h2 class="card-title">Куда вы хотите отправиться?</h2>
      <div class="inputs-container">

        <template v-if="props.tripData && Array.isArray(props.tripData)">
          <div v-for="(item, index) in props.tripData" :key="index">
            <component
              :is="componentMap[item.type]"
              :itemData="item"
            />
          </div>
        </template>
        <template v-else>
            <p style="color: #0051ffb0; font-weight: 750; font-size: 20px; text-align: center;">Нет данных о путешествии для отображения.</p>
        </template>
<!--
        <placeRoutes />
        <flyRoutes />
        <hotelRoutes /> -->

        <!-- <buttonBase msg="Добавить" /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ваши стили остаются без изменений */
.destination-card {
  margin: 0 auto;
  margin-bottom: 2%;
  width: 100%;
  max-width: 600px;
  border-radius: 24px;
  display: flex;
  background-color: white;
  font-size: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  padding: 32px;
  flex-direction: column;
  color: white; /* Этот цвет кажется неверным для текста, возможно, он должен быть черным или другим */
}

.destination-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
}

.card-title {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #2563eb; /* Синий цвет для заголовка */
}

.inputs-container {
  max-height: 400px; /* Ограничиваем высоту и добавляем скролл */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px; /* Расстояние между динамическими компонентами */
  padding-right: 8px; /* Отступ для скроллбара */
}

/* Стили для базовой кнопки, если вы ее не убрали */
/* Если используете buttonBase, эти стили могут быть в buttonBase.vue */
.destination-button {
  width: 100%;
  padding: 12px 16px;
  border: 0px;
  border-radius: 12px;
  transition: 0.2s;
  background-color: #0051ff;
  text-align: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.destination-button:hover {
  background-color: #004aea;
}

@media (max-width: 768px) {
  .destination-card {
    width: 90%;
    padding: 24px;
  }

  .card-title {
    font-size: 24px;
  }

  .inputs-container {
    max-height: 300px;
  }
}
</style>
