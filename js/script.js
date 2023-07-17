/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};

const promoAdvEl = document.querySelector(".promo__adv"),
      advBannersEl = promoAdvEl.querySelectorAll("img"),
      genreEl = document.querySelector(".promo__genre"),
      promoBgEl = document.querySelector(".promo__bg"),
      promoListEl = document.querySelector(".promo__interactive-list"),
      promoListItemEl = promoListEl.querySelectorAll(".promo__interactive-item");

advBannersEl.forEach(function (banner) {
  banner.remove();
});

genreEl.textContent = "Драма";

promoBgEl.style.cssText = "background: url(./img/bg.jpg) center center/cover no-repeat;";

promoListEl.innerHTML = '';
movieDB['movies'].sort();

movieDB['movies'].forEach(function(item, index) {
  promoListEl.innerHTML += `
      <li class="promo__interactive-item">${index+1}. ${item}
        <div class="delete"></div>
      </li>
    `
  // promoListEl.insertAdjacentHTML('beforeend', `
  //   <li class="promo__interactive-item">${index+1}. ${item}
  //     <div class="delete"></div>
  //   </li>
  //   `) 
});