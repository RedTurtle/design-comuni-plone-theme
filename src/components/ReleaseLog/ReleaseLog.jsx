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
  const ReleaseFile = require('design-comuni-plone-theme/../RELEASE.md');
  const Markdown = marked.marked;
  const [releaseFileContent, setReleaseFileContent] = useState('');

  useEffect(() => {
    fetch(ReleaseFile)
      .then((res) => res.text())
      .then((text) => setReleaseFileContent(Markdown(text)));
  }, []);

  return (
    <div className="public-ui">
      <Helmet title="Release LOG" />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container className="px-4 my-4">
        <div dangerouslySetInnerHTML={{ __html: releaseFileContent }}></div>
      </Container>
    </div>
  );
};

export default injectLazyLibs(['marked'])(ReleaseLog);
