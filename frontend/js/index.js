import data from '../../json/kladr.json'
import Autocomplete from './autocomplete'

function App() {
   Autocomplete(loadData());
}

function loadData() {
   return data;
}

App();
