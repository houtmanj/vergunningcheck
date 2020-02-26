import React from "react";
import PropTypes from "prop-types";
import { breakpoint, Paragraph } from "@datapunt/asc-ui";
import styled from "@datapunt/asc-core";

const Container = styled(`div`)`
  display: flex;
  flex-direction: column;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    flex-direction: row;
  }
`;

const SingleMediaContainer = styled(`div`)`
  width: 100%;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    width: 30%;
    margin-right: 5%;
    &:last-of-type {
      margin-right: 0%;
    }
  }
`;

const MediaContainer = ({ media }) => (
  <Container>
    {media.map((image, index) => (
      <SingleMediaContainer
        key={image.id}
        style={index === 0 ? { marginLeft: 0 } : null}
      >
        <img
          src={image.url}
          alt={image.description}
          style={{ maxWidth: "100%", width: "100%" }}
        />
        <Paragraph>{image.description}</Paragraph>
      </SingleMediaContainer>
    ))}
  </Container>
);

MediaContainer.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  )
};

export default MediaContainer;
