import { jsx } from 'slate-hyperscript';
import { deserializeChildren } from '@plone/volto-slate/editor/deserialize';
import { TD, TH, TEXT_NODE } from '@plone/volto-slate/constants';

/*rispetto a quello di volto-slate:
- aggiunge anche la classe (styleName) se era stata impostata
*/
export const blockTagDeserializer = (tagname) => (editor, el, options) => {
  // if (tagname === 'h2') debugger;
  let children = deserializeChildren(el, editor, options).filter(
    (n) => n !== null,
  );

  if (
    [TD, TH].includes(tagname) &&
    children.length > 0 &&
    typeof children[0] === 'string'
  ) {
    // TODO: should here be handled the cases when there are more strings in
    // `children` or when there are besides strings other types of nodes too?
    const p = { type: 'div', children: [{ text: '' }] };
    p.children[0].text = children[0];
    children = [p];
  }

  // normalizes block elements so that they're never empty
  // Avoids a hard crash from the Slate editor
  const hasValidChildren = children.length && children.find((c) => !!c);
  if (!hasValidChildren) {
    children = [{ text: '' }];
  }

  return jsx(
    'element',
    { type: tagname, styleName: el.getAttribute('class') },
    children,
  );
};

/*rispetto a quello di volto-slate:
- se il tag body contiene direttamente dei children <li> allora crea un <ul> wrapper
*/
export const bodyTagDeserializer = () => (editor, el, options) => {
  if (
    el?.firstElementChild?.nodeName === 'LI' &&
    el?.lastElementChild?.nodeName === 'LI'
  ) {
    return jsx(
      'element',
      { type: 'ul' },
      deserializeChildren(el, editor, options),
    );
  }
  return jsx('fragment', {}, deserializeChildren(el, editor, options));
};

export const spanTagDeserializer = (editor, el, options) => {
  const style = el.getAttribute('style') || '';
  let children = el.childNodes;

  if (
    // handle formatting from OpenOffice
    children.length === 1 &&
    children[0].nodeType === TEXT_NODE &&
    children[0].textContent === '\n'
  ) {
    return jsx('text', {}, ' ');
  }
  children = deserializeChildren(el, editor, options);

  // whitespace is replaced by deserialize() with null;
  children = children.map((c) => (c === null ? '' : c));

  // THIS IS THE PATCH FOR THE DEFAULT DESERIALIZER:
  // Text pasted from Word Online has some "strange" html and styles
  // like bold, underline and italic are set in css inline styles and not as markup
  const stylesMapping = {
    'font-weight:bold': 'strong',
    'font-style:italic': 'em',
    'text-decoration:underline': 'u',
  };
  function parseStyles(style) {
    if (!style) return [];
    const cleaned = style.replace(/\s/g, '').toLowerCase();

    return Object.entries(stylesMapping)
      .filter(([cssProp]) => cleaned.includes(cssProp))
      .map(([, type]) => type);
  }

  function nestStyles(children, styleString) {
    const activeStyles = parseStyles(styleString);

    if (activeStyles.length === 0) {
      return children;
    }

    // Riduci da destra a sinistra creando la struttura annidata con jsx
    return activeStyles.reduceRight((acc, styleType) => {
      const attrs = { type: styleType };
      // acc può essere array di children, ma jsx vuole children singolo o array
      return [jsx('element', attrs, acc)];
    }, children);
  }

  if (parseStyles(style).length > 0) {
    const styled = nestStyles(children, style);
    return Array.isArray(styled) && styled.length === 1 ? styled[0] : styled;
  }

  // TODO: handle sub/sup as <sub> and <sup>
  // Handle Google Docs' <sub> formatting
  if (style.replace(/\s/g, '').indexOf('vertical-align:sub') > -1) {
    const attrs = { sub: true };
    return children.map((child) => {
      return jsx('text', attrs, child);
    });
  }

  // Handle Google Docs' <sup> formatting
  if (style.replace(/\s/g, '').indexOf('vertical-align:super') > -1) {
    const attrs = { sup: true };
    return children.map((child) => {
      return jsx('text', attrs, child);
    });
  }

  const res = children.find((c) => typeof c !== 'string')
    ? children
    : jsx('text', {}, children);

  return res;
};

export default function install(config) {
  config.settings.slate.htmlTagsToSlate.BODY = bodyTagDeserializer();
  config.settings.slate.htmlTagsToSlate.P = blockTagDeserializer('p');
  config.settings.slate.htmlTagsToSlate.OL = blockTagDeserializer('ol');
  config.settings.slate.htmlTagsToSlate.UL = blockTagDeserializer('ul');
  config.settings.slate.htmlTagsToSlate.BLOCKQUOTE =
    blockTagDeserializer('blockquote');
  config.settings.slate.htmlTagsToSlate.SPAN = spanTagDeserializer;

  //A (link) deserializer is defined in ./Link/deserializer.js
}
