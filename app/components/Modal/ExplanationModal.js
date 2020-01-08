import React, { useState } from 'react';
import { Button, Divider, Heading, Icon, TopBar, Modal, Paragraph } from '@datapunt/asc-ui';
import { Close } from '@datapunt/asc-assets';
import ReactMarkdown from 'react-markdown';
import styled from '@datapunt/asc-core';
import PropTypes from 'prop-types';

const ModalBlock = styled.div`
  display: block;
  padding: 0 15px;
  margin: 15px 0;
`;

const ExplanationModal = ({ modalText }) => {
  const [explanationShown, toggleExplanationShown] = useState(false);

  return (
    <div style={{ marginBottom: '24px' }}>
      <Button type="button" color="primary" onClick={() => toggleExplanationShown(!explanationShown)}>
        Toelichting
      </Button>
      <Modal
        style={{ top: '34%' }}
        aria-labelledby="Toelichting"
        aria-describedby="Toelichting"
        open={explanationShown}
        onClose={() => toggleExplanationShown(!explanationShown)}
      >
        <div style={{ minHeight: '50vh' }}>
          <TopBar>
            <Heading $as="h4" style={{ flexGrow: 1 }}>
              Toelichting
              <Button type="button" size={30} variant="blank">
                <Icon size={20}>
                  <Close onClick={() => toggleExplanationShown(!explanationShown)} />
                </Icon>
              </Button>
            </Heading>
          </TopBar>
          <Divider />
          <ModalBlock>
            <ReactMarkdown source={modalText} renderers={{ paragraph: Paragraph }} linkTarget="_blank" />
          </ModalBlock>
        </div>
      </Modal>
    </div>
  );
};

ExplanationModal.propTypes = {
  modalText: PropTypes.string,
};

export default ExplanationModal;
