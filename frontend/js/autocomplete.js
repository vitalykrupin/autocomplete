const CLASS_NAMES = {
  CLOSE_VISIBLE: 'autocomplete__close_visible',
  ERROR: 'autocomplete__input_error'
};

const SELECTORS = {
  AUTOCOMPLETE: '.autocomplete',
  CLOSE: '.autocomplete__close',
  INPUT: '.autocomplete__input',
  DROP: '.autocomplete__drop'
};

const closeButton = document.querySelector(SELECTORS.CLOSE);
const input = document.querySelector(SELECTORS.INPUT);
const dropDown = document.querySelector(SELECTORS.DROP);
let myData;

export default function (data) {
  if (!data) return;
  
  myData = data;
  
  decorate();
}

const decorate = () => {
  closeButton.addEventListener('click', clearInputValue);
  input.addEventListener('input', inputHandler);
  dropDown.addEventListener('click', dropDownHandler)
};

const inputHandler = () => {
  if (input.value) {
    showCloseButton();
  } else {
    hideCloseButton();
  }
  
  let dropDownData = search(input.value, myData);
  renderDropDown(dropDownData);
};

const dropDownHandler = (event) => {
  complete(event.target.innerHTML);
};

const complete = (str) => {
  input.value = str;
  clearDropDown();
};

const search = (queryStr, data) => {
  if (!queryStr) {
    return [];
  }
  
  return data.filter(function (item) {
    return substring(item.City, queryStr);
  });
};

const substring = (str, substr) => {
  return str.toLowerCase().indexOf(substr.toLowerCase()) === 0
};

const renderDropDown = (data) => {
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
  
  const html = `
    <ul class="autocomplete__list">
      ${data
        .map((item) => `<li class="autocomplete__item">${item.City}</li>`)
        .join(``)
      }
    </ul>
  `;
  
  dropDown.innerHTML = html;
};

const clearDropDown = () => {
  dropDown.innerHTML = '';
};

const showCloseButton = () => {
  closeButton.classList.add(CLASS_NAMES.CLOSE_VISIBLE);
};

const hideCloseButton = () => {
  closeButton.classList.remove(CLASS_NAMES.CLOSE_VISIBLE);
};

const clearInputValue = () => {
  input.value = '';
  clearDropDown();
  hideCloseButton();
  hideError();
  input.focus();
};

const showError = () => {
  input.classList.add(CLASS_NAMES.ERROR);
};

const hideError = () => {
  input.classList.remove(CLASS_NAMES.ERROR);
};
