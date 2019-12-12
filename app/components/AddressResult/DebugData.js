import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddressResult from './AddressResult';
import { fetchBagData, fetchStreetname } from '../../containers/LocationPage/actions';

const DebugData = ({
  monumentLoading,
  monumentStatus,
  stadsgezichtLoading,
  stadsgezichtStatus,
  bestemmingsplanLoading,
  bestemmingsplanStatus,
}) => (
  <>
    <div>
      <AddressResult loading={monumentLoading} title="Voorbeeld postcodes:">
        <p>
          1074VE = De Pijp <br />
          1079VR = Rivierenbuurt
        </p>
      </AddressResult>

      <AddressResult loading={monumentLoading} title="Monument:">
        {monumentStatus ? `Ja. ${monumentStatus}` : 'Geen monument'}
      </AddressResult>

      <AddressResult loading={stadsgezichtLoading} title="Beschermd stadsgezicht:">
        {stadsgezichtStatus ? `Ja. ${stadsgezichtStatus}` : 'Geen beschermd stadsgezicht'}
      </AddressResult>

      {/* <AddressResult loading={bagLoading} title="Type gebouw:"> */}
      {/*  {buildingType || '...'} */}
      {/* </AddressResult> */}

      <AddressResult loading={bestemmingsplanLoading} title="Ruimtelijke bestemmingsplannen:">
        {bestemmingsplanStatus.length === 0 && `Geen bestemmingsplan`}
        {bestemmingsplanStatus.length > 0 && (
          <ul>
            {bestemmingsplanStatus.map(bestemmingsplan => (
              <li key={bestemmingsplan.text}>{bestemmingsplan.text}</li>
            ))}
          </ul>
        )}
      </AddressResult>
    </div>
  </>
);

DebugData.propTypes = {
  bagStatus: PropTypes.shape({
    _display: PropTypes.string,
    _buurtcombinatie: PropTypes.shape({
      naam: PropTypes.string,
    }),
    ligging: PropTypes.shape({
      omschrijving: PropTypes.string,
    }),
    _gebiedsgerichtwerken: PropTypes.shape({
      naam: PropTypes.string,
    }),
    geometrie: PropTypes.object,
    _gemeente: PropTypes.object,
  }),
  monumentStatus: PropTypes.string,
  monumentLoading: PropTypes.bool,
  stadsgezichtStatus: PropTypes.string,
  stadsgezichtLoading: PropTypes.bool,
  bestemmingsplanStatus: PropTypes.arrayOf(PropTypes.object),
  bestemmingsplanLoading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    addressResultsLoading,
    addressResults,
    bagFetch,
    bagLoading,
    bagStatus,
    monumentLoading,
    monumentStatus,
    stadsgezichtLoading,
    stadsgezichtStatus,
    bestemmingsplanLoading,
    bestemmingsplanStatus,
    noResults,
  } = state.location;
  return {
    addressResultsLoading,
    addressResults,
    bagFetch,
    bagLoading,
    bagStatus,
    monumentLoading,
    monumentStatus,
    stadsgezichtLoading,
    stadsgezichtStatus,
    bestemmingsplanLoading,
    bestemmingsplanStatus,
    noResults,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onFetchBagData: fetchBagData,
      onFetchStreetname: fetchStreetname,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DebugData);
