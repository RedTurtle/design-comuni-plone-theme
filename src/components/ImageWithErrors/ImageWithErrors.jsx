import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { Image } from '@plone/volto/components';
const messages = defineMessages({
  image_error: {
    id: 'Error - Image not found',
    defaultMessage: 'Errore: immagine non trovata',
  },
});
const ImageWithErrors = (props) => {
  const intl = useIntl();
  return (
    <Image
      {...props}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        // currentTarget.src="image_path_here";
        currentTarget.parentElement.innerHTML = intl.formatMessage(
          messages.image_error,
        );
      }}
    />
  );
};
export default ImageWithErrors;
