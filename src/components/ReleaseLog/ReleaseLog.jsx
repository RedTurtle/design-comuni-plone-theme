/**
 * ReleaseLog component.
 * @module components/ReleaseLog/ReleaseLog
 */

import React, { useState, useEffect } from 'react';

import { Container } from 'design-react-kit/dist/design-react-kit';
import { Helmet } from '@plone/volto/helpers';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import './ReleaseLog.css';

const ReleaseLog = ({ marked }) => {
  const ReleaseInternal = require('design-comuni-plone-theme/../RELEASE-INTERNAL.md');
  const Markdown = marked.marked;
  const [releaseInternal, setReleaseInternal] = useState('');

  useEffect(() => {
    fetch(ReleaseInternal)
      .then((res) => res.text())
      .then((text) => setReleaseInternal(Markdown(text)));
  }, []);

  return (
    <div className="public-ui">
      <Helmet title="Release LOG" />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container className="px-4 my-4">
        <div dangerouslySetInnerHTML={{ __html: releaseInternal }}></div>
      </Container>
    </div>
  );
};

export default injectLazyLibs(['marked'])(ReleaseLog);
