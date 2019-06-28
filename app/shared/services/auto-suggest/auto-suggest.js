import SHARED_CONFIG from '../shared-config/shared-config';

function formatDataAddress(categories) {
  const numberOfResults = categories.reduce((acc, category) => acc + category.content.length, 0);
  let indexInTotal = -1;
  const indexedCategories = categories.map(category => ({
    ...category,
    content: category.content.map(suggestion => {
      indexInTotal += 1;
      return {
        category: category.label,
        index: indexInTotal,
        label: suggestion._display,
        uri: suggestion.uri,
      };
    }),
  }));

  return {
    count: numberOfResults,
    data: indexedCategories,
  };
}

export function searchForAddress(query) {
  // Minimun length for typeahead query in backend is 3 characters
  const uri = query && query.length >= 3 && `${SHARED_CONFIG.API_ROOT}typeahead?q=${query}`;
  if (uri) {
    return fetch(uri)
      .then(response => response.json())
      .then(response => formatDataAddress(response));
  }
  return {};
}

export function searchForMonument(query) {
  const uri = query && `${SHARED_CONFIG.API_ROOT}${query}`;
  if (uri) {
    return fetch(uri)
      .then(response => response.json())
      .then(response => response.panden.href);
  }
  return {};
}
