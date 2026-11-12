/**
 * RichTextHtml component.
 * @module components/ItaliaTheme/View/Commons/RichTextHtml
 *
 * Renders an HTML rich text value (e.g. a field edited with HtmlSlateWidget)
 * as React elements instead of injecting it with dangerouslySetInnerHTML.
 *
 * HtmlSlateWidget serializes the editor with renderToStaticMarkup, where
 * effects never run: the external link icon (DesignIcon, loaded in a
 * useEffect) is saved as its empty loading placeholder <span>. Rendering that
 * HTML as-is shows an empty span instead of the icon.
 *
 * Here every <a href> is rendered through UniversalLink, so external links
 * get the real icon, title and target like links in slate text blocks, and
 * the saved placeholders are dropped. Works in SSR (html-react-parser uses
 * htmlparser2 on the server and the browser DOM on the client).
 */

import React from 'react';
import PropTypes from 'prop-types';
import parse, {
  attributesToProps,
  domToReact,
  Element,
} from 'html-react-parser';
import { UniversalLink } from '@plone/volto/components';
import { flattenHTMLToAppURL } from '@plone/volto/helpers';

// classes added by UniversalLink itself: it adds them again when rendering
const UNIVERSAL_LINK_CLASSES = ['with-external-link-icon', 'matomo_download'];

const getClasses = (node) => (node.attribs?.class ?? '').split(/\s+/);

// <span class="icon ... external-link"> saved by HtmlSlateWidget
const isExternalLinkIconPlaceholder = (node) =>
  node.name === 'span' &&
  getClasses(node).includes('external-link') &&
  (node.children ?? []).length === 0;

const parserOptions = {
  replace(node) {
    if (!(node instanceof Element)) {
      return;
    }

    if (isExternalLinkIconPlaceholder(node)) {
      return <></>;
    }

    if (node.name === 'a' && node.attribs.href) {
      // title, rel and aria-label are computed by UniversalLink: the saved
      // ones come from the serialized UniversalLink and would be duplicated
      const {
        href,
        target,
        download,
        class: className,
        title,
        rel,
        'aria-label': ariaLabel,
        ...attribs
      } = node.attribs;

      const classes = getClasses(node)
        .filter((c) => c && !UNIVERSAL_LINK_CLASSES.includes(c))
        .join(' ');

      return (
        <UniversalLink
          {...attributesToProps(attribs)}
          href={href}
          openLinkInNewTab={target === '_blank' ? true : undefined}
          download={download !== undefined}
          className={classes || null}
        >
          {domToReact(node.children, parserOptions)}
        </UniversalLink>
      );
    }
  },
};

/**
 * Parse an HTML string to React elements.
 * @function parseRichTextHtml
 * @param {string} html HTML string.
 * @returns {React.ReactNode} React elements.
 */
export const parseRichTextHtml = (html) =>
  html ? parse(flattenHTMLToAppURL(html), parserOptions) : null;

/**
 * RichTextHtml view component.
 * @function RichTextHtml
 * @param {string} html HTML string.
 * @returns {string} Markup of the component.
 */
const RichTextHtml = ({ html, ...props }) => (
  <div {...props}>{parseRichTextHtml(html)}</div>
);

RichTextHtml.propTypes = {
  html: PropTypes.string,
};

export default RichTextHtml;
