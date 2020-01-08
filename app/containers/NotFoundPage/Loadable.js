/**
 * Asynchronously loads the component for NotFoundPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import { Spinner } from '@datapunt/asc-ui';

export default loadable(() => import('./index'), {
  fallback: <Spinner />,
});
