import React, { useState } from 'react';
import { Button, Divider, Heading, Icon, Paragraph, TopBar, Modal } from '@datapunt/asc-ui';
import { Close } from '@datapunt/asc-assets';
import styled from '@datapunt/asc-core';
import PropTypes from 'prop-types';

const ModalBlock = styled.div`
  display: block;
  padding: 0 15px;
  margin: 15px 0;
`;

const ToelichtingModal = ({ modalText }) => {
  const [toelichtingShown, toggleToelichtingShown] = useState(false);

  return (
    <div>
      <Button color="primary" onClick={() => toggleToelichtingShown(!toelichtingShown)}>
        Toelichting
      </Button>
      <Modal
        style={{ top: '34%' }}
        aria-labelledby="Toelichting"
        aria-describedby="Toelichting"
        open={toelichtingShown}
        onClose={() => toggleToelichtingShown(!toelichtingShown)}
      >
        <div style={{ minHeight: '50vh' }}>
          <TopBar>
            <Heading $as="h4" style={{ flexGrow: 1 }}>
              Toelichting
              <Button type="button" size={30} variant="blank">
                <Icon size={20}>
                  <Close onClick={() => toggleToelichtingShown(!toelichtingShown)} />
                </Icon>
              </Button>
            </Heading>
          </TopBar>
          <Divider />
          <ModalBlock>
            <Paragraph>{modalText}</Paragraph>
          </ModalBlock>
        </div>
      </Modal>
    </div>
  );
};

ToelichtingModal.propTypes = {
  modalText: PropTypes.string,
};

export default ToelichtingModal;
