/**
 * Image view component.
 * @module components/theme/View/ImageView
 *
 * CUSTOMIZATIONS:
 * - il link sotto l'immagine ora punta a @@download/image invece che a @@images/image
 *   (che serve l'immagine inline): tramite UniversalLink, che riconosce "@@download"
 *   nell'url e aggiunge l'attributo `download`, il click avvia il download nativo
 *   del browser invece di aprire l'immagine in una nuova scheda senza contesto
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container as SemanticContainer } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import prettybytes from 'pretty-bytes';
import { UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';

/**
 * Image view component class.
 * @function ImageView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ImageView = ({ content }) => {
  const Image = config.getComponent({ name: 'Image' }).component;
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  return (
    <Container className="view-wrapper">
      <h1 className="documentFirstHeading">
        {content.title}
        {content.subtitle && ` - ${content.subtitle}`}
      </h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content?.image?.download && (
        <UniversalLink href={`${content['@id']}/@@download/image`}>
          <Image
            item={content}
            imageField="image"
            alt={content.title}
            responsive={true}
          />
          <figcaption>
            <FormattedMessage
              id="Size: {size}"
              defaultMessage="Size: {size}"
              values={{ size: prettybytes(content.image.size) }}
            />
            &nbsp; &mdash; &nbsp;
            <FormattedMessage
              id="Click to download full sized image"
              defaultMessage="Click to download full sized image"
            />
          </figcaption>
        </UniversalLink>
      )}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ImageView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.shape({
      scales: PropTypes.shape({
        preview: PropTypes.shape({
          download: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};

export default ImageView;
