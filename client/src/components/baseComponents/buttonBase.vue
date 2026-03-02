<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <button>{{ msg }}</button>
</template>

<style scoped>
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
}
</style>
