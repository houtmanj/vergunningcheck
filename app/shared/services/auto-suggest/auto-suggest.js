import SHARED_CONFIG from '../shared-config/shared-config';

const getByUri = (uri, params) => fetch(uri, params).then(response => response.json());

function getVerblijfsobjectUri(categories, streetNumberFromInput) {
  const indexedCategories = categories.filter(category =>
    category.content.filter(suggestion => suggestion.category === 'Adressen'),
  );

  // No returned suggestions
  if (indexedCategories.length < 1 || indexedCategories[0].content.length < 1) return '';

  const { content } = indexedCategories[0];

  if (content.length === 1) {
    return content[0].uri;
  } else {
    // @TODO: find other solution for fetching correct address
    return content
      .filter(address => {
        const { _display: label } = address;
        const streetNameFromApi = label.slice(label.lastIndexOf(' ')).trim();
        return streetNameFromApi === streetNumberFromInput;
      })
      .map(address => address.uri);
  }
}

function formatAddress(categories) {
  const indexedCategories = categories
    .filter(category =>
      category.content.filter(suggestion => {
        if (suggestion.category === 'Adressen') return suggestion;
      }),
    )
    .map(category => ({
      content: category.content.map(suggestion => ({
        category: category.label,
        label: suggestion._display,
        uri: suggestion.uri,
      })),
    }));

  if (indexedCategories.length < 1 || !indexedCategories[0].content) return [];
  else return indexedCategories[0].content;
}

function formatStreetname(categories) {
  const indexedCategories = categories.filter(category =>
    category.content.filter(suggestion => suggestion.category === 'Straatnamen'),
  );

  // @TODO: what if there's multiple streetnames on 1 postcode? EG: 1018xa
  return indexedCategories.length > 0 && indexedCategories[0].content.length === 1
    ? indexedCategories[0].content[0]._display
    : '';
}

export function searchForAddress(query) {
  // Minimun length for typeahead query in backend is 3 characters
  const uri = query && query.length >= 3 && `${SHARED_CONFIG.API_ROOT}typeahead?q=${query}`;
  if (uri) {
    return getByUri(uri).then(response => formatAddress(response));
  }
  return {};
}

export function searchForStreetname(query) {
  // Minimun length for typeahead query in backend is 3 characters
  const uri = query && query.length >= 3 && `${SHARED_CONFIG.API_ROOT}typeahead?q=${query}`;
  if (uri) {
    return getByUri(uri).then(response => formatStreetname(response));
  }
  return {};
}

export function searchBag(query) {
  const { postcode = '', streetNumber = '' } = query;
  const uri = postcode && streetNumber && `${SHARED_CONFIG.API_ROOT}typeahead?q=${postcode}+${streetNumber}`;
  if (uri) {
    return (
      getByUri(uri)
        .then(response => getVerblijfsobjectUri(response, streetNumber))
        // verblijfsobject uri: /bag/verblijfsobject/${ID}/
        .then(response => {
          if (response) {
            return getByUri(`${SHARED_CONFIG.API_ROOT}${response}`).then(response => ({
              pandId: response.verblijfsobjectidentificatie,
              geometrie: response.geometrie,
            }));
          } else {
            return response;
          }
        })
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
        response.features.length > 0 &&
        response.features.filter(zone => zone.properties.id === 'kernzone' || zone.properties.id === 'bufferzone');
      query.isUnesco = unesco.length > 0 ? response.features[0].properties.id : '';
      return query;
    });
  }
  return query;
}

export function searchForMonument(query) {
  // URI: https://acc.api.data.amsterdam.nl/bag/pand/?verblijfsobjecten__id=0363010012062064
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
