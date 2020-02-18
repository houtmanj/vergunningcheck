import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem, Paragraph } from '@datapunt/asc-ui';

import LocationResult from './LocationResult';

const LocationData = ({
  monumentLoading,
  monumentStatus,
  stadsgezichtLoading,
  stadsgezichtStatus,
  bestemmingsplanLoading,
  bestemmingsplanStatus,
}) => (
  <div>
    <LocationResult loading={monumentLoading} title="Monument:">
      <Paragraph>{monumentStatus ? `Ja. ${monumentStatus}` : 'Geen monument'}</Paragraph>
    </LocationResult>

    <LocationResult loading={stadsgezichtLoading} title="Beschermd stads- of dorpsgezicht:">
      {stadsgezichtStatus ? (
        <Paragraph>Ja. {stadsgezichtStatus}</Paragraph>
      ) : (
        <Paragraph>
          Wij kunnen op dit moment niet uit ons systeem halen of het gebouw in een beschermd stads- of dorpsgezicht
          ligt. Controleer dit zelf op de{' '}
          <a href="https://maps.amsterdam.nl/cultuurhistorie/?LANG=nl&amp;L=6,7,8,9,10" target="_blank">
            Cultuurhistorische waardenkaart op Amsterdam Maps
          </a>
        </Paragraph>
      )}
    </LocationResult>

    <LocationResult loading={bestemmingsplanLoading} title="Bestemmingsplannen:">
      {bestemmingsplanStatus.length === 0 && <Paragraph>Geen bestemmingsplan</Paragraph>}
      {bestemmingsplanStatus.length > 0 && (
        <List variant="bullet" style={{ backgroundColor: 'inherit', marginBottom: '0' }}>
          {bestemmingsplanStatus.map(bestemmingsplan => (
            <ListItem key={bestemmingsplan.text}>{bestemmingsplan.text}</ListItem>
          ))}
        </List>
      )}
    </LocationResult>
  </div>
);

LocationData.propTypes = {
  monumentStatus: PropTypes.string,
  monumentLoading: PropTypes.bool,
  stadsgezichtStatus: PropTypes.string,
  stadsgezichtLoading: PropTypes.bool,
  bestemmingsplanStatus: PropTypes.arrayOf(PropTypes.object),
  bestemmingsplanLoading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    monumentLoading,
    monumentStatus,
    stadsgezichtLoading,
    stadsgezichtStatus,
    bestemmingsplanLoading,
    bestemmingsplanStatus,
  } = state.locationData;
  return {
    monumentLoading,
    monumentStatus,
    stadsgezichtLoading,
    stadsgezichtStatus,
    bestemmingsplanLoading,
    bestemmingsplanStatus,
  };
};

export default connect(mapStateToProps)(LocationData);
