<template>
  <div class="head">
    <div class="logo">
      <div
        class="bg-blue-600 rounded-full p-2 rotate-12 transform hover:rotate-0 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-plane-takeoff h-6 w-6 text-white"
        >
          <path d="M2 22h20"></path>
          <path
            d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"
          ></path>
        </svg>
      </div>
      <div class="text">TRAVEL PLANE</div>
    </div>

    <div class="menu">
      <a href="/">МЕНЮ</a>
      <a href="/">ПЛАН</a>
      <a href="/">О НАС</a>
    </div>
  </div>
</template>

<style scoped>
.head {
  position:sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px; /* Фиксированная высота вместо 14% */
  z-index: 1000;
  backdrop-filter: blur(7px);
  background-color: rgba(100%, 100%, 100%, 75%);
  /* position: fixed; Фиксируем хедер на верху страницы */
  /* top: 0; Располагаем хедер в верхней части страницы */
  /* left: 2.25%; */

  /* width: 100%; /* Растягиваем хедер на всю ширину страницы */
  /* height: 14%; */
  /* border-bottom: 1px rgb(222, 222, 222) solid; */
  /*background-color: #fff;  Фон хедера */

  /* z-index: 1000; Убедитесь, что хедер находится поверх других элементов */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); Тень для хедера */

  display: flex;
  align-items: center;
  color: #2564eb;
}

a {
  color: #2564eb;
  font-weight: 600;
  font-size: 17px;
}
h3 {
  font-weight: 500;
  font-family: century-gothic, sans-serif;
  transition: 0.2s;
  cursor: pointer;
}

h3:hover {
  transform: scale(1.1);
}

.menu {
  width: 60%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  /* border-width: 0 2px 0 2px; top right bottom left */
  /* border-style: solid; */
  /* border-color: rgb(222, 222, 222); */
}

/* .midleH { */
/* border-left: 2px rgb(222, 222, 222) solid; */
/* } */

.logo {
  display: flex;
  align-items: center;
  margin: 0;
  padding-left: 2%;
  /* width: 30%; */
  height: 100%;
}
img {
  height: 70%;
  width: auto;
}

.text {
  font-size: 25px;
  font-weight: 500;
  padding: 5px;
  padding-bottom: 10px;
}
</style>
