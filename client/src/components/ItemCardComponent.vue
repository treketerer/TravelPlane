<script setup lang="ts"></script>

<template>
  <card>
    <img src="@/assets/Eiffel.webp" />
    <div class="cardText">
      <div class="ItemName">Эйфелева Башня</div>
      <div class="ItemCity">Город: Париж</div>
      <button class="Plus">+</button>
    </div>
  </card>
</template>

<style scoped>
card {
  margin: 0 auto;
  margin-bottom: 2%;
  width: 90%;
  max-height: 30%;
  border-radius: 50px;
  display: flex;
  background-color: rgb(255, 255, 255);
  color: black;
  font-size: 30px;
  overflow: hidden;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

card:hover {
  transform: scale(1.05);
}

.cardText {
  display: flex;
  flex-direction: column;
  margin: 2%;
  padding: 0px;
}

.ItemName {
  font-weight: 600;
  line-height: 0.8;
}

.ItemCity {
  font-size: 22px;
  color: gray;
  font-weight: 400;
  margin: 0;
}

img {
  max-width: 35%;
  height: auto;
}

button {
  height: auto;
  max-width: 60%;
  font-size: 25px;
  color: rgb(255, 209, 0);
  background: linear-gradient(135deg, #fca729, #ff8138);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 7px;
  cursor: pointer;
  /* background-color: #ff5e00; */
  transition: 0.2s;
}

button:hover {
  background: linear-gradient(135deg, #fc6f29, #ff3838);
  transform: scale(1.05);
}
</style>
