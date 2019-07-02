import SHARED_CONFIG from '../shared-config/shared-config';

import { grachtengordel } from './grachtengordel';

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

const hasPointInPolygon = (point, vs) => {
  var x = point[0],
    y = point[1];

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];

    var intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

export function searchBag(query) {
  const uri = query && `${SHARED_CONFIG.API_ROOT}${query}`;
  if (uri) {
    return (
      // verblijfsobject uri: /bag/verblijfsobject/${ID}/
      getByUri(uri).then(response => ({
        pandId: response.verblijfsobjectidentificatie,
        geometrie: response.geometrie,
        isInGrachtengordel: hasPointInPolygon(response.geometrie.coordinates, grachtengordel),
      }))
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
