import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const HandleAnchor = () => {
  const location = useLocation();
  const content = useSelector((state) => state.content);

  useEffect(() => {
    const sr = Object.keys(content.subrequests ?? {});
    const loaded =
      content.get?.loaded &&
      sr.filter((k) => content.subrequests[k].loaded).length === sr.length;
    if (location.hash && content && loaded) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById(location.hash.replace('#', ''))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });
    }
  }, [location, content]);
  return <></>;
};

export default HandleAnchor;
