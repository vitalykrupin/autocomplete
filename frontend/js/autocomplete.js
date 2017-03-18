const CLASS_NAMES = {
   CLOSE_VISIBLE: 'autocomplete__close_visible',
   ERROR: 'autocomplete__input_error'
}

const SELECTORS = {
   AUTOCOMPLETE: '.autocomplete',
   CLOSE: '.autocomplete__close',
   INPUT: '.autocomplete__input',
   DROP: '.autocomplete__drop'
};

let container = document.querySelector(SELECTORS.AUTOCOMPLETE);
let closeButton = document.querySelector(SELECTORS.CLOSE);
let input = document.querySelector(SELECTORS.INPUT);
let dropDown = document.querySelector(SELECTORS.DROP);
let myData;

export default function Autocomlete(data) {
    if (!data) return;

    myData = data;

    decorate();
}

function decorate() {
   closeButton.addEventListener('click', clearInputValue);
   input.addEventListener('input', inputHandler);
   dropDown.addEventListener('click', dropDownHandler)
}

function inputHandler() {
   if (input.value) {
      showCloseButton();
   } else {
      hideCloseButton();
   }

   let dropDownData = search(input.value, myData);
   renderDropDown(dropDownData);
}

function dropDownHandler(event) {
   complete(event.target.innerHTML);
}

function complete(str) {
   input.value = str;
   clearDropDown();
}

function search(queryStr, data) {
   if (!queryStr) {
      return [];
   }

   let result = data.filter(function(item){
      return substring(item.City, queryStr);
   });

   return result;
}

function substring (str, substr) {
   return str.toLowerCase().indexOf(substr.toLowerCase()) === 0
}

function renderDropDown (data) {
   clearDropDown();

   if (!data.length) {
      if (input.value){
         showError();
      } else {
         hideError();
      }
      return;
   } else {
      hideError();
   }
   
   let html = '<ul class="autocomplete__list">';
   
   data.forEach(function(item, i, arr){
      html += '<li class="autocomplete__item">' + item.City + '</li>'; 
   });

   html += '</ul>'

   dropDown.innerHTML = html;
}

function clearDropDown() {
   dropDown.innerHTML = '';
}

function showCloseButton() {
   closeButton.classList.add(CLASS_NAMES.CLOSE_VISIBLE);
}

function hideCloseButton() {
   closeButton.classList.remove(CLASS_NAMES.CLOSE_VISIBLE);
}

function clearInputValue() {
   input.value = '';
   clearDropDown();
   hideCloseButton();
   hideError();
   input.focus();
}

function showError() {
   input.classList.add(CLASS_NAMES.ERROR);
}

function hideError() {
   input.classList.remove(CLASS_NAMES.ERROR);
}
