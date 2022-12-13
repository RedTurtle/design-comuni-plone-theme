import { flattenToAppURL } from '@plone/volto/helpers';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-intl-redux';
import { DefaultView } from '@plone/volto/components';
import { ConnectedRouter } from 'connected-react-router';
import Image from 'design-comuni-plone-theme/components/Image/Image';

export const blockIsNotEmptyPlaceholder = (blockField) => {
  return Object.values(blockField?.blocks)?.some((entry) => {
    const type = entry['@type'];
    if (entry[type]?.blocks?.length > 0) return true;
    else if (type === 'image' && entry[type]?.url) return true;
    else return false;
  });
};

export const simulateImageHTMLField = (image) => {
  return `<img src=${flattenToAppURL(image?.download ?? '#')} title="${
    image?.filename
  }"/>`;
};

export const SSRRenderHtml = (history, store, content, type) => {
  if (type === 'json' || type === 'blocks') {
    return ReactDOMServer.renderToStaticMarkup(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <DefaultView content={content} />
        </ConnectedRouter>
      </Provider>,
    );
  } else if (type === 'image') {
    return content
      ? ReactDOMServer.renderToStaticMarkup(<Image image={content} />)
      : '<p></p>';
  } else return `<p>${content ?? ''}</p>`;
};
