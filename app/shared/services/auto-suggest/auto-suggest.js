import SHARED_CONFIG from '../shared-config/shared-config';

const getByUri = (uri, params) => fetch(uri, params).then(response => response.json());

function formatDataAddress(categories) {
  const filteredCategories = categories.filter(category => {
    return category.content.filter(suggestion => {
      if (suggestion.category === 'Straatnamen' || suggestion.category === 'Adressen') return suggestion;
    });
  });

  const indexedCategories = filteredCategories.map(category => ({
    content: category.content.map(suggestion => ({
      final: category.label === 'Adressen' && category.content.length === 1 ? true : false,
      category: category.label,
      label: suggestion._display,
      uri: suggestion.uri,
    })),
  }));

  if (indexedCategories.length < 1 || !indexedCategories[0].content) return [];
  else return indexedCategories[0].content;
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
      getByUri(uri)
        .then(response => ({
          pandId: response.verblijfsobjectidentificatie,
          geometrie: response.geometrie,
        }))
        .then(response => searchForUnesco(response))
    );
  }
  return {};
}

export function searchForUnesco(query) {
  const uri =
    query &&
    `${SHARED_CONFIG.API_ROOT}geosearch/search/?item=unesco&x=${query.geometrie.coordinates[0]}&y=${
      query.geometrie.coordinates[1]
    }`;
  if (uri) {
    return getByUri(uri).then(response => {
      const unesco =
        response.features.length > 0 && response.features.filter(zone => zone.properties.id === 'kernzone');
      query.isUnesco = unesco.length > 0 ? true : false;
      return query;
    });
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
