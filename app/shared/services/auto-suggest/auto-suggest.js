import SHARED_CONFIG from '../shared-config/shared-config';

const getByUri = uri => fetch(uri).then(response => response.json());

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
    return getByUri(uri).then(response => formatDataAddress(response));
  }
  return {};
}

export function searchForMonument(query) {
  const uri = query && `${SHARED_CONFIG.API_ROOT}${query}`;
  if (uri) {
    return (
      // verblijfsobject uri: /bag/verblijfsobject/${ID}/
      getByUri(uri)
        .then(response => response.panden.href || false)
        // panden uri: /bag/pand/?verblijfsobjecten__id=0363010012062064
        .then(href => (href ? getByUri(href) : false))
        .then(response => (response.results.length > 0 ? response.results[0].landelijk_id : false))
        // get monumenten
        .then(id => (id ? getByUri(`${SHARED_CONFIG.API_ROOT}monumenten/monumenten/?betreft_pand=${id}`) : false))
        .then(response => (response.results.length > 0 ? response.results[0].monumentstatus : false))
    );
  }
  return {};
}
