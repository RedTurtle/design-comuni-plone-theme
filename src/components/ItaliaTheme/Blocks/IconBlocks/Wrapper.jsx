import React from 'react';

import { Container } from 'design-react-kit';

import config from '@plone/volto/registry';

const Wrapper = ({
  data,
  wrapperProps = {},
  containerProps = {},
  children,
}) => {
  const Image = config.getComponent({ name: 'Image' }).component;
  const backgroundImage = data.background?.[0];

  return (
    <div className="public-ui" {...wrapperProps}>
      <div
        className={`full-width section py-5 ${
          !backgroundImage
            ? data.bg_color === 'none'
              ? ''
              : 'bg-' + (data.bg_color ?? 'primary')
            : ''
        }`}
      >
        {backgroundImage ? (
          <div className="background-image">
            <Image
              item={backgroundImage}
              alt=""
              role={null}
              responsive={true}
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="background-image no-image"></div>
        )}

        <Container className="px-md-4" {...containerProps}>
          {children}
        </Container>
      </div>
    </div>
  );
};

export default Wrapper;
