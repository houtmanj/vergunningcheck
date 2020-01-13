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

    <LocationResult loading={stadsgezichtLoading} title="Beschermd stadsgezicht:">
      <Paragraph>{stadsgezichtStatus ? `Ja. ${stadsgezichtStatus}` : 'Geen beschermd stadsgezicht'}</Paragraph>
    </LocationResult>

    <LocationResult loading={bestemmingsplanLoading} title="Ruimtelijke bestemmingsplannen:">
      {bestemmingsplanStatus.length === 0 && <Paragraph>Geen bestemmingsplan</Paragraph>}
      {bestemmingsplanStatus.length > 0 && (
        <List variant="bullet" style={{ backgroundColor: 'inherit' }}>
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
