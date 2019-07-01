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

  // if (indexInTotal === 0 && categories[0].label === 'Adressen') {
  //   // console.log(categories);
  //
  //   const { uri = false } = categories[0].content[0];
  //
  //   if (uri) {
  //     searchForMonument(uri);
  //   }
  // }

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

export function searchBag(query) {
  const uri = query && `${SHARED_CONFIG.API_ROOT}${query}`;
  if (uri) {
    return (
      // verblijfsobject uri: /bag/verblijfsobject/${ID}/
      getByUri(uri).then(response => ({ pandId: response.verblijfsobjectidentificatie, geometrie: response.geometrie }))
    );
  }
  return {};
}

export function searchForMonument(query) {
  // https://acc.api.data.amsterdam.nl/bag/pand/?verblijfsobjecten__id=0363010012062064
  const uri = query && `${SHARED_CONFIG.API_ROOT}bag/pand/?verblijfsobjecten__id=${query}`;
  if (uri) {
    return (
      getByUri(uri)
        // get landelijk_id
        .then(response => (response.results.length > 0 ? response.results[0].landelijk_id : false))
        // get monumenten
        .then(id => (id ? getByUri(`${SHARED_CONFIG.API_ROOT}monumenten/monumenten/?betreft_pand=${id}`) : false))
        .then(response => (response.results.length > 0 ? response.results[0].monumentstatus : false))
    );
  }
  return {};
}

export function searchForBestemmingsplan(query) {
  const { coordinates, type } = query && query.geometrie;
  const uri =
    query &&
    coordinates &&
    `https://www.ruimtelijkeplannen.nl/viewer/web-roo/rest/search/plannen/xy/${coordinates[0]}/${coordinates[1]}`;
  if (uri) {
    return getByUri(uri).then(response => console.log(response));
  }
  return {};
}
