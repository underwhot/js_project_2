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
        filmsForm = document.querySelector('.add'),
        filmsFormInp = filmsForm.querySelector('.adding__input'),
        filmsLikeCheck = filmsForm.querySelector('input[type=checkbox]');

  makeChanges();
  removeAdv(advBannersEl);
  refreshFilmsList();

  function makeChanges() {
    genreEl.textContent = "Драма";
    promoBgEl.style.cssText = "background: url(./img/bg.jpg) center center/cover no-repeat;";
  }
  
  function removeAdv(el) {
    el.forEach(function (banner) {
      banner.remove();
    });
  }

  filmsForm.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
      e.preventDefault();
      addNewFilm();
      refreshFilmsList();
    }
  });
  
  promoListEl.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
      deleteFilm(e.target);
      refreshFilmsList();
    }
  });
  
  function addNewFilm() {
    let newFilm = filmsFormInp.value.trim();
    
    if (newFilm === '') {
      filmsFormInp.value = '';
      filmsFormInp.focus();
      return;
    }
  
    if (newFilm.length > 21) {
      newFilm = newFilm.slice(0, 21) + '...';
    }
  
    if (filmsLikeCheck) {
      console.log('Добавляем любимый фильм');
      filmsLikeCheck.checked = false;
    }
  
    movieDB['movies'].push(newFilm);
  
    filmsFormInp.value = '';
    filmsFormInp.focus();
  };
  
  function refreshFilmsList() {
    promoListEl.innerHTML = '';
    movieDB['movies'].sort();
  
    movieDB['movies'].forEach(function(item, index) {
      promoListEl.innerHTML += `
          <li class="promo__interactive-item">${index+1}. ${item}
            <div class="delete"></div>
          </li>
        `
    });
  };
  
  function deleteFilm(elem) {
    const delFilm = elem.parentElement.textContent.trim().slice(3);
  
    movieDB['movies'].forEach(function(item, i) {
      if (delFilm === item) {
        movieDB['movies'].splice(i,1)
      }
    });
  };
});

