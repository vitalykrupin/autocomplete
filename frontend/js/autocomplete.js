const SELECTORS = {
   AUTOCOMPLETE: '.autocomplete',
   INPUT: '.autocomplete__input',
   DROP: '.autocomplete__drop'
};

let container = document.querySelector(SELECTORS.AUTOCOMPLETE);
let input = document.querySelector(SELECTORS.INPUT);
let dropDown = document.querySelector(SELECTORS.DROP);
let myData;

export default function Autocomlete(data) {
   if (!data) return;

   myData = data;

   decorate();
}

function decorate() {
   input.addEventListener('input', inputHandler);
   dropDown.addEventListener('click', dropDownHandler)
}

function inputHandler() {
   let dropDownData = search(input.value, myData);

   showDropDown(dropDownData);
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

function showDropDown (data) {
   clearDropDown();

   if (!data.length) return;
   
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
