const URL = '/json/kladr.json';

export default function autocompleteRequest(callback) {
   var xhr = new XMLHttpRequest();

   xhr.open('GET', URL, true);
   xhr.send();

   xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
         console.log(xhr.status + ': ' + xhr.statusText);
      } else {
         callback(JSON.parse(xhr.responseText));
      }
   }
}
