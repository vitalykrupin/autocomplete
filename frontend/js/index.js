import AutocompleteRequest from './request'
import Autocomplete from './autocomplete'

const App = () => {
  const autocompleteInit = Autocomplete;
  const autocompleteRequest = AutocompleteRequest(autocompleteInit);
};

App();
