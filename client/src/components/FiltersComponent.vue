<script setup lang="ts">
import radioInput from '@/components/baseComponents/radioInput.vue'
</script>

<template>
  <card>

    <radioInput msg="Это Армения" />
    <radioInput msg="Не Армения" />
    <radioInput msg="Без вариантов" />
  </card>
</template>

<style scoped>
card {
  margin-bottom: 2%;
  width: 70%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  color: black;
  font-size: 20px;
  overflow: hidden;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
  padding-left: 2%;
  padding-top: 1.5%;
}

.head {
  font-weight: 500;
  font-size: 30px;
  margin: 0 auto;
  padding-left: 0;
  text-align: center; /* Центрируем текст */
}
</style>
