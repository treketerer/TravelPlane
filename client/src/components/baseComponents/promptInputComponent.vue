<script setup lang="ts">
  import { ref } from 'vue';

  const emits = defineEmits(['data-generated']);
  const promptText = ref('');
  const pointCount = ref(5); // Значение по умолчанию - 5 точек
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function sendGenerateReq(){
    const promptValue = promptText.value;
    const count = pointCount.value;
    console.log("Текст из поля ввода:", promptValue);
    console.log("Количество точек:", count);

    if (!promptValue.trim()) {
      console.warn("Поле ввода пустое.");
      error.value = "Поле ввода не может быть пустым.";
      return;
    }

    isLoading.value = true;
    error.value = null;

    // const url = 'http://127.0.0.1:3000/api/generate-trip';
    const url = '/api/generate-trip';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptValue,
          pointCount: count
        })
      });

      console.log(response)

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      const data = await response.json();
      console.log("Полученные данные:", data);
      emits('data-generated', data);

    } catch (err) {
      console.error("Произошла ошибка при запросе:", err);
      error.value = "Произошла ошибка при запросе: " + err.message;
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <div class="input-container">
    <textarea
      placeholder="Введи предпочтения о маршруте..."
      id="prompt-input"
      v-model="promptText"
      rows="3"
      :disabled="isLoading"
    ></textarea>

    <div class="slider-control">
      <label for="point-slider">Количество точек интереса: <span class="slider-value">{{ pointCount }}</span></label>
      <input
        type="range"
        id="point-slider"
        v-model.number="pointCount"
        min="1"
        max="20"
        step="1"
        :disabled="isLoading"
        class="styled-slider"
      >
    </div>

    <button id="generateTrip" @click="sendGenerateReq" :disabled="isLoading">
      {{ isLoading ? 'Генерация...' : 'Сгенерировать' }}
    </button>

    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<style scoped>
/* Основные стили из первого варианта */
.error-message {
  color: #ff4d4f;
  margin-top: 10px;
  font-size: 0.9em;
  text-align: center;
}

button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

textarea:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

button {
  width: 100%;
  padding: 10px;
  border: 0px;
  border-radius: 12px;
  transition: 0.2s;
  background-color: #0051ff;
  text-align: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
}

button:hover {
  background-color: #004aea;
  cursor: pointer;
}

#prompt-input {
  min-height: calc(3 * 1.5em + 24px);
  box-sizing: border-box;
  width: 100%;
  height: 45%;
  padding: 12px;
  border: 0px solid white;
  border-radius: 12px;
  resize: vertical;
}

#prompt-input::placeholder {
  color: #757575;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
}

/* Стили для ползунка */
.slider-control {
  margin: 15px 0;
  width: 100%;
}

.slider-value {
  display: inline-block;
  min-width: 20px;
  text-align: center;
  font-weight: bold;
  color: #0051ff;
}

.styled-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e0e0e0;
  outline: none;
  margin-top: 8px;
}

.styled-slider:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.styled-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0051ff;
  cursor: pointer;
  transition: all 0.2s;
}

.styled-slider:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
}

.styled-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  background: #0038b8;
}

.styled-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0051ff;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.styled-slider:disabled::-moz-range-thumb {
  cursor: not-allowed;
}

.styled-slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  background: #0038b8;
}
</style>
