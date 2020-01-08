import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      {monumentStatus ? `Ja. ${monumentStatus}` : 'Geen monument'}
    </LocationResult>

    <LocationResult loading={stadsgezichtLoading} title="Beschermd stadsgezicht:">
      {stadsgezichtStatus ? `Ja. ${stadsgezichtStatus}` : 'Geen beschermd stadsgezicht'}
    </LocationResult>

    <LocationResult loading={bestemmingsplanLoading} title="Ruimtelijke bestemmingsplannen:">
      {bestemmingsplanStatus.length === 0 && `Geen bestemmingsplan`}
      {bestemmingsplanStatus.length > 0 && (
        <ul>
          {bestemmingsplanStatus.map(bestemmingsplan => (
            <li key={bestemmingsplan.text}>{bestemmingsplan.text}</li>
          ))}
        </ul>
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
