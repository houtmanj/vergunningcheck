import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styled from '@datapunt/asc-core';
import { Divider, Heading, Modal, Paragraph, TopBar, Button, Icon } from '@datapunt/asc-ui';
import { Close } from '@datapunt/asc-assets';

import Form from 'components/Form/Form';

const ModalBlock = styled.div`
  display: block;
  padding: 0 15px;
  margin: 15px 0;
`;

Modal.propTypes = {
  modalText: PropTypes.string,
};

const Question = ({ className, heading, headingAs, paragraph, modalText, children, ...otherProps }) => {
  const [toelichtingShown, toggleToelichtingShown] = useState(false);

  return (
    <Form className={className} {...otherProps}>
      {heading && <Heading $as={headingAs}>{heading}</Heading>}
      {paragraph && <ReactMarkdown source={paragraph} />}
      {modalText && (
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
      )}
      {children}
    </Form>
  );
};

Question.defaultProps = {
  headingAs: 'h3',
};

Question.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  headingAs: PropTypes.string,
  paragraph: PropTypes.string,
  modalText: PropTypes.string,
  children: PropTypes.any,
};

export default Question;
