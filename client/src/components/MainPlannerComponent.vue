<script setup lang="ts">
  import FindRoutesComponent from './FindRoutesComponent.vue'
  import promptInputComponent from './baseComponents/promptInputComponent.vue';
  import { ref } from 'vue'; // Импортируем ref

  // Реактивная переменная для хранения данных маршрута
  // Изначально null, т.к. данных еще нет
  const tripData = ref<object | null>(null); // Используем 'any' пока не знаем точную структуру данных

  // Импортируем defineEmits для определения событий, которые компонент может издавать
  const emits = defineEmits(['data-generated-up']); // Объявляем событие с именем 'data-generated'

  // Функция-обработчик события 'data-generated'
  function handleTripDataReceived(dataArgument) {
    console.log("mainPlannerController получил данные:", dataArgument);
    tripData.value = dataArgument; // Сохраняем данные в реактивной переменной
    emits("data-generated-up", dataArgument)
    // Теперь tripData реактивно обновится, и FindRoutesComponent получит новые данные через проп
  }
  </script>

  <template>
    <main>
      <div class="hero-container">
        <div class="hero-text">
          <h1 class="hero-title">Постройте свое идеальное путешествие с ИИ</h1>
          <promptInputComponent @data-generated="handleTripDataReceived"/>
        </div>
        <div class="hero-component">
          <FindRoutesComponent :trip-data="tripData"/>
        </div>
      </div>
      <div class="background-overlay"></div>
    </main>
  </template>

<style scoped>
main {
  /* margin-top: 70px; */
  width: 100%;
  min-height: 100vh;
  color: #fff;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(37, 99, 235, 0.9) 0%,
    rgba(59, 130, 246, 0.85) 50%,
    rgba(6, 182, 212, 0.8) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-container {
  display: flex;
  width: 90%;
  max-width: 1200px;
  z-index: 2;
  align-items: center;
  text-align: left;
}

.hero-text {
  flex: 0.9 1;
  animation: fadeInUp 0.8s ease-out;
}

.hero-component {
  flex: 1.25;
  animation: fadeInUp 0.8s ease-out 0.2s;
  animation-fill-mode: both;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 2.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 600px;
  line-height: 1.6;
  font-weight: 300;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==');
  z-index: 1;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 2.8rem;
  }
  .hero-container {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
    padding: 2rem 0;
    gap: 3rem;
  }

  .hero-title {
    font-size: 2.2rem;
    text-align: center;
  }

  .hero-subtitle {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1rem;
  }

  .hero-text,
  .hero-component {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  main {
    align-items: flex-start;
    overflow-y: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
