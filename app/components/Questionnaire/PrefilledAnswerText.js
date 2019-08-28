import React from 'react';
import PropTypes from 'prop-types';

import styled from '@datapunt/asc-core';

const PrefilledAnswerText = ({ className }) => (
  <div className={className}>
    <p>
      Deze vraag is al door de gemeente beantwoord, op basis van de gegevens die bij ons bekend zijn. Wanneer u denkt
      dat dit niet klopt, kunt u dit aanpassen. Dit wordt later gecontroleerd.
    </p>
    <p>
      Heeft u op basis van deze vraag een vergunning nodig? Dan kunt u deze vergunningschecker verlaten, en direct gaan
      naar Vergunning aanbouw en uitbouw om te zien wat u verder moet aanleveren. Wij adviseren u om verder te gaan,
      zodat u ziet welke andere kenmerken leiden tot vergunningplicht. Zo vergroot u de kans op een vergunning.
    </p>
  </div>
);

const StyledPrefilledAnswerText = styled(PrefilledAnswerText)`
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(215, 215, 215, 1);

  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

PrefilledAnswerText.propTypes = {
  className: PropTypes.string,
};

export default StyledPrefilledAnswerText;
