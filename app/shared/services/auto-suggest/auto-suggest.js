import SHARED_CONFIG from '../shared-config/shared-config';

const getByUri = (uri, params) => fetch(uri, params).then(response => response.json());

function preparePostCall(url, body) {
  const headers = {
    'Content-Type': 'text/xml',
  };

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  fetch(url, options).catch(err => {
    throw err;
  });
}

export function searchForBestemmingsplan() {
  const uri = `http://afnemers.ruimtelijkeplannen.nl/afnemers/services?REQUEST=GetFeature&serv
ice=WFS&version=1.0.0&typename=ProvinciaalPlangebied`;

  if (uri) {
    // const coordinates = [118986, 488256];
    const body = `
<GetFeature
  version="2.0.0"
  service="WFS"
  xmlns="http://www.opengis.net/wfs/2.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:gml="http://www.opengis.net/gml"
  xsi:schemaLocation="http://www.opengis.net/wfs
http://schemas.opengis.net/wfs/2.0/wfs.xsd">
  <Query typeNames="app:Plangebied_PCP" fid="" xmlns:app="http://www.deegree.org/app">
    <PropertyName>app:fid</PropertyName>
    <PropertyName>app:datum</PropertyName>
    <PropertyName>app:historisch</PropertyName>
    <PropertyName>app:identificatie</PropertyName>
    <PropertyName>app:naam</PropertyName>
    <PropertyName>app:naamOverheid</PropertyName>
    <PropertyName>app:overheidscode</PropertyName>
    <PropertyName>app:plangebied</PropertyName>
    <PropertyName>app:planstatus</PropertyName>
    <PropertyName>app:typePlan</PropertyName>
    <PropertyName>app:versieIMRO</PropertyName>
    <fes:Filter xmlns:fes="http://www.opengis.net/fes/2.0">
      <fes:And>
        <fes:DWithin>
          <gml:Point gml:id="P1" srsName="urn:ogc:def:crs:EPSG::28992">
            <gml:pos>118986 488256</gml:pos>
          </gml:Point>
          <fes:Distance uom="m">1</fes:Distance>
        </fes:DWithin>
        <fes:Or>
          <fes:PropertyIsEqualTo>
            <fes:ValueReference>app:planstatus</fes:ValueReference>
            <fes:Literal>vastgesteld</fes:Literal>
          </fes:PropertyIsEqualTo>
          <fes:PropertyIsEqualTo>
            <fes:ValueReference>app:planstatus</fes:ValueReference>
            <fes:Literal>onherroepelijk</fes:Literal>
          </fes:PropertyIsEqualTo>
        </fes:Or>
      </fes:And>
    </fes:Filter>
  </Query>

  <Query typeNames="app:Bestemmingsplangebied" fid="" xmlns:app="http://www.deegree.org/app">
    <PropertyName>app:fid</PropertyName>
    <PropertyName>app:datum</PropertyName>
    <PropertyName>app:historisch</PropertyName>
    <PropertyName>app:identificatie</PropertyName>
    <PropertyName>app:naam</PropertyName>
    <PropertyName>app:naamOverheid</PropertyName>
    <PropertyName>app:overheidscode</PropertyName>
    <PropertyName>app:plangebied</PropertyName>
    <PropertyName>app:planstatus</PropertyName>
    <PropertyName>app:typePlan</PropertyName>
    <PropertyName>app:versieIMRO</PropertyName>
    <fes:Filter xmlns:fes="http://www.opengis.net/fes/2.0">
      <fes:And>
        <fes:DWithin>
          <gml:Point gml:id="P1" srsName="urn:ogc:def:crs:EPSG::28992">
            <gml:pos>118986 488256</gml:pos>
          </gml:Point>
          <fes:Distance uom="m">1</fes:Distance>
        </fes:DWithin>
        <fes:Or>
          <fes:PropertyIsEqualTo>
            <fes:ValueReference>app:planstatus</fes:ValueReference>
            <fes:Literal>vastgesteld</fes:Literal>
          </fes:PropertyIsEqualTo>
          <fes:PropertyIsEqualTo>
            <fes:ValueReference>app:planstatus</fes:ValueReference>
            <fes:Literal>onherroepelijk</fes:Literal>
          </fes:PropertyIsEqualTo>
        </fes:Or>
      </fes:And>
    </fes:Filter>
  </Query>
</GetFeature>`;

    preparePostCall(uri, body);
  }
  return {};
}

searchForBestemmingsplan();

function getVerblijfsobjectUri(categories, streetNumberFromInput) {
  const indexedCategories = categories.filter(category =>
    category.content.filter(suggestion => suggestion.category === 'Adressen'),
  );

  // No returned suggestions
  if (indexedCategories.length < 1 || indexedCategories[0].content.length < 1) return '';

  const { content } = indexedCategories[0];

  if (content.length === 1) {
    return content[0].uri;
  }

  const filteredAddress = content.filter(address => {
    const { _display: label } = address;
    const streetNameFromApi = label.slice(label.lastIndexOf(' ')).trim();
    return streetNameFromApi === streetNumberFromInput;
  });
  if (filteredAddress && filteredAddress.uri) {
    return filteredAddress.uri;
  }

  return '';
}

function formatAddress(categories) {
  const indexedCategories = categories
    .filter(category => category.content.filter(suggestion => suggestion.category === 'Adressen'))
    .map(category => ({
      content: category.content.map(suggestion => {
        const { label, uri } = suggestion;
        return {
          category: category.label,
          label,
          uri,
        };
      }),
    }));

  if (indexedCategories.length < 1 || !indexedCategories[0].content) return [];
  return indexedCategories[0].content;
}

function formatStreetname(categories) {
  const indexedCategories = categories.filter(category =>
    category.content.filter(suggestion => suggestion.category === 'Straatnamen'),
  );

  const { _display: label = '' } = indexedCategories[0].content[0];

  return label;
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
        .then(verblijfsobjectUri => {
          if (verblijfsobjectUri) return getByUri(`${SHARED_CONFIG.API_ROOT}${verblijfsobjectUri}`);
          return false;
        })
    );
  }
  return {};
}

export function searchForStadsgezicht(query) {
  const uri =
    query &&
    `${SHARED_CONFIG.API_ROOT}geosearch/search/?item=unesco&x=${query.coordinates[0]}&y=${query.coordinates[1]}`;
  if (uri) {
    return getByUri(uri).then(response => {
      // Filter specific zones
      const stadsgezicht =
        response.features.length > 0 &&
        response.features.filter(zone => zone.properties.id === 'kernzone' || zone.properties.id === 'bufferzone');
      return stadsgezicht.length > 0 ? stadsgezicht[0].properties.display : '';
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
        .then(response => (response.results.length > 0 ? response.results[0].monumentstatus : ''))
    );
  }
  return '';
}

export function searchForBeperking(query) {
  // URI: https://acc.api.data.amsterdam.nl/bag/pand/?verblijfsobjecten__id=0363010012062064
  const uri = query && `${SHARED_CONFIG.API_ROOT}brk/object/?verblijfsobjecten__id=${query}`;
  if (uri) {
    return (
      getByUri(uri)
        // get id (kadastrale_objecten__id)
        .then(response => (response.results.length > 0 ? response.results[0].id : false))
        // get beperking
        // https://api.data.amsterdam.nl/wkpb/beperking/?kadastrale_objecten__id=NL.KAD.OnroerendeZaak.11440755470000
        .then(id => (id ? getByUri(`${SHARED_CONFIG.API_ROOT}wkpb/beperking/?kadastrale_objecten__id=${id}`) : false))
        .then(response => (response.results.length > 0 ? response.results : []))
    );
  }
  return '';
}
