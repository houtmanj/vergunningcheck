// @TODO: what do we do with this file?

import { createSelector } from 'reselect';

const getAddressInput = state => state.addressInput;

const getLoadingState = () =>
  createSelector(getAddressInput, state => state.bagLoading || state.monumentLoading || state.addressResultsLoading);

export { getLoadingState };
