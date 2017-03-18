import AutocompleteRequest from './request'
import Autocomplete from './autocomplete'

function App() {
  let autocompleteInit = Autocomplete;
  let autocompleteRequest = AutocompleteRequest(autocompleteInit);
}

App();
