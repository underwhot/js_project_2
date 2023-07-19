/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

"use strict";

document.addEventListener('DOMContentLoaded', function() { 
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
        addForm = document.querySelector('.add'),
        addInput = addForm.querySelector('.adding__input'),
        addCheckbox = addForm.querySelector('input[type=checkbox]');

  makeChanges();
  removeAdv(advBannersEl);
  createMovieList(movieDB['movies'], promoListEl);

  addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let newFilm = addInput.value.trim();
    const favorite = addCheckbox.checked;

    if (newFilm) {

      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0,22)}...`;
      }

      if (favorite) {
        console.log('Добавляем любимый фильм');
      }

      movieDB['movies'].push(newFilm);
      sortArr(movieDB['movies']);
  
      createMovieList(movieDB['movies'], promoListEl);
    }

    e.target.reset();
    addInput.focus();
  });

  function makeChanges() {
    genreEl.textContent = "Драма";
    promoBgEl.style.cssText = "background: url(./img/bg.jpg) center center/cover no-repeat;";
  }
  
  function removeAdv(arr) {
    arr.forEach(function (banner) {
      banner.remove();
    });
  }
  
  function sortArr(arr) {
    arr.sort();
  };
  
  function createMovieList(filmsDB, parentEl) {
    parentEl.innerHTML = '';
    sortArr(filmsDB);
  
    filmsDB.forEach(function(item, index) {
      parentEl.innerHTML += `
          <li class="promo__interactive-item">${index+1}. ${item}
            <div class="delete"></div>
          </li>
        `
    });

    document.querySelectorAll('.delete').forEach(function(item, i) {
      item.addEventListener('click', function() {
        item.parentElement.remove();
        movieDB['movies'].splice(i,1);

        createMovieList(filmsDB, parentEl);
      })
    });
  };
});

