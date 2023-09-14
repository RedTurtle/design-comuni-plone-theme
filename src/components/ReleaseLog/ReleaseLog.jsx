/**
 * ReleaseLog component.
 * @module components/ReleaseLog/ReleaseLog
 */

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Container } from 'design-react-kit/dist/design-react-kit';

//import ReleaseInternal from 'design-comuni-plone-theme/../RELEASE-INTERNAL.md';
import { marked } from 'marked';
import './ReleaseLog.css';

const ReleaseLog = () => {
  const intl = useIntl();
  const ReleaseInternal = require('design-comuni-plone-theme/../RELEASE-INTERNAL.md');

  const [releaseInternal, setReleaseInternal] = useState('');

  useEffect(() => {
    fetch(ReleaseInternal)
      .then((res) => res.text())
      .then((text) => setReleaseInternal(marked(text)));
  }, []);

  return (
    <div className="public-ui">
      <Container className="px-4 my-4">
        <div dangerouslySetInnerHTML={{ __html: releaseInternal }}></div>
      </Container>
    </div>
  );
};

export default ReleaseLog;
