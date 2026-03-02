<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="radio">
    <span class="custom-radio"></span>
    <input id="radio" type="checkbox" />
    <label for="radio">{{ msg }}</label>
  </div>
</template>

<style scoped>
.radio {
  display: flex;
  align-items: center; /* Выравнивание по вертикали */
  font-size: 25px;
  vertical-align: center;
}

input[type='checkbox'] {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-radio {
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 2px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  /* border: 2px; */
  border-color: orange;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  /* background-color: ; */
}
</style>
