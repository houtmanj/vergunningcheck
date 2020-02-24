import { xml2js } from 'xml-js';
import uniqBy from 'lodash.uniqby';
import SHARED_CONFIG from '../shared-config/shared-config';

const getByUri = (uri, params) => fetch(uri, params).then(response => response.json());

const preparePostCall = (url, body) => {
  const options = {
    method: 'POST',
    body,
  };

  return fetch(url, options)
    .then(response => response.text())
    .catch(err => {
      throw err;
    });
};

function convertXMLtoJS(xml) {
  return (
    xml &&
    xml2js(xml, {
      compact: true,
      ignoreAttributes: true,
      ignoreCdata: true,
      ignoreComment: true,
      ignoreDeclaration: true,
      ignoreDoctype: true,
      ignoreInstruction: true,
      textKey: 'text',
      elementNameFn: val =>
        val
          .replace('wfs:', '')
          .replace('app:', '')
          .replace('Plangebied_PCP', 'bestemmingsplan')
          .replace('Bestemmingsplangebied', 'bestemmingsplan'),
    })
  );
}

function formatBestemmingPlan(response) {
  if (response && response.FeatureCollection && response.FeatureCollection.member) {
    const {
      FeatureCollection: { member = [] },
    } = response;

    // Response only contains one plan
    if (typeof member.bestemmingsplan !== 'undefined') {
      return [member.bestemmingsplan.naam];
    }
    // Response contains multiple plans
    if (member.length > 1) {
      return member.map(plan => plan.bestemmingsplan.naam);
    }
  }
  return [];
}

// Use these PropertyNames to fetch more details:
// <PropertyName>app:datum</PropertyName>
// <PropertyName>app:historisch</PropertyName>
// <PropertyName>app:identificatie</PropertyName>
// <PropertyName>app:naamOverheid</PropertyName>
// <PropertyName>app:overheidscode</PropertyName>
// <PropertyName>app:plangebied</PropertyName>
// <PropertyName>app:typePlan</PropertyName>
// <PropertyName>app:versieIMRO</PropertyName>

export function searchForBestemmingsplan(query) {
  const uri = `https://afnemers.ruimtelijkeplannen.nl/afnemers/services?REQUEST=GetFeature&service=WFS&version=1.0.0&typename=ProvinciaalPlangebied`;
  if (uri && query) {
    const body = `
<GetFeature
  version="2.0.0"
  service="WFS"
  xmlns="http://www.opengis.net/wfs/2.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:gml="http://www.opengis.net/gml"
  xsi:schemaLocation="http://www.opengis.net/wfs
http://schemas.opengis.net/wfs/2.0/wfs.xsd">
  <Query typeNames="app:Plangebied_PCP" xmlns:app="http://www.deegree.org/app">
    <PropertyName>app:planstatus</PropertyName>
    <PropertyName>app:naam</PropertyName>
    <fes:Filter xmlns:fes="http://www.opengis.net/fes/2.0">
      <fes:And>
        <fes:DWithin>
          <gml:Point gml:id="P1" srsName="urn:ogc:def:crs:EPSG::28992">
            <gml:pos>${query.coordinates[0]} ${query.coordinates[1]}</gml:pos>
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

  <Query typeNames="app:Bestemmingsplangebied" xmlns:app="http://www.deegree.org/app">
    <PropertyName>app:planstatus</PropertyName>
    <PropertyName>app:naam</PropertyName>
    <fes:Filter xmlns:fes="http://www.opengis.net/fes/2.0">
      <fes:And>
        <fes:DWithin>
          <gml:Point gml:id="P1" srsName="urn:ogc:def:crs:EPSG::28992">
            <gml:pos>${query.coordinates[0]} ${query.coordinates[1]}</gml:pos>
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
    return preparePostCall(uri, body)
      .then(response => convertXMLtoJS(response))
      .then(response => formatBestemmingPlan(response));
  }
  return {};
}

function filterByStreetNumber(data, streetNumber) {
  const streetNumberClean = streetNumber.replace('-', ' ').trim();
  const streetNumberSplit = streetNumberClean.split(' ');
  const suffix = `${streetNumberSplit[0].replace(/\D/g, '')} ${streetNumberSplit[0].replace(/[0-9]/g, '').trim()}`;
  const dataWithoutDuplicates = uniqBy(data, 'toevoeging');

  if (dataWithoutDuplicates[0].huisnummer && !dataWithoutDuplicates[0].bag_toevoeging && !data[0].bag_huisletter) {
    return dataWithoutDuplicates.filter(address => address.huisnummer === Number(streetNumberSplit[0]));
  }

  return dataWithoutDuplicates.filter(
    address =>
      address.huisnummer === Number(streetNumberSplit[0].replace(/\D/g, '')) || address.toevoeging === `${suffix}`,
  );
}

export function searchForAddress(query) {
  const { postalCode, streetNumber } = query;

  const uri = `${SHARED_CONFIG.API_ROOT}atlas/search/adres/?q=${postalCode}+${streetNumber}`;
  let addressResults = [];

  if (postalCode && streetNumber) {
    addressResults = getByUri(uri).then(response => filterByStreetNumber(response.results, streetNumber));
  }

  return addressResults;
}

export async function searchBag(query) {
  const { postalCode = '', streetNumber = null } = query;

  const uri =
    postalCode && streetNumber && `${SHARED_CONFIG.API_ROOT}atlas/search/adres/?q=${postalCode}+${streetNumber}`;

  if (uri && postalCode && streetNumber) {
    const response = await getByUri(uri)
      .then(streetResult => filterByStreetNumber(streetResult.results, streetNumber))
      .then(search =>
        search[0].adresseerbaar_object_id
          ? getByUri(`${SHARED_CONFIG.API_ROOT}bag/verblijfsobject/${search[0].adresseerbaar_object_id}`)
          : false,
      );
    return response;
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
  const { landelijk_id: id } = query?.hoofdadres;
  // URI: https://acc.api.data.amsterdam.nl/monumenten/situeringen/?betreft_nummeraanduiding=0363200012062152
  const uri = query && id && `${SHARED_CONFIG.API_ROOT}monumenten/situeringen/?betreft_nummeraanduiding=${id}`;
  if (uri) {
    return (
      getByUri(uri)
        // get monument key
        .then(response =>
          response.results.length > 0 ? response.results[0].hoort_bij_monument.identificerende_sleutel_monument : false,
        )
        // URI: https://acc.api.data.amsterdam.nl/monumenten/monumenten/aef46aca-843e-44a5-b772-6a6d6490bb21/
        .then(key => (key ? getByUri(`${SHARED_CONFIG.API_ROOT}monumenten/monumenten/${key}`) : false))
        // get monument status
        .then(response => (response.monumentstatus ? response.monumentstatus : ''))
    );
  }
  return false;
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

export function getSttrFile(file) {
  if (file) {
    const response = getByUri(file);
    return response;
  }
  return {};
}
