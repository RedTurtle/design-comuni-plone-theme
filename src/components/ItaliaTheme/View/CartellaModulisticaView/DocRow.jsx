/**
 * DocRow view component.
 * @module components/theme/View/DocRow
 */

import React, { useState } from 'react';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { DownloadFileFormat } from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import { FontAwesomeIcon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import cx from 'classnames';

/**
 * DocRow view component class.
 * @function DocRow
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */

const Downloads = ({ item, titleDoc }) => {
  return item['@type'] === 'Modulo' ? (
    <React.Fragment>
      {!titleDoc ? (
        <div className="title">{item.title}</div>
      ) : (
        titleDoc !== item.title && <div className="title">{item.title}</div>
      )}
      <div className="downloads">
        <DownloadFileFormat file={item?.file_principale} />
        <DownloadFileFormat file={item?.formato_alternativo_1} />
        <DownloadFileFormat file={item?.formato_alternativo_2} />
      </div>
    </React.Fragment>
  ) : (
    <UniversalLink
      href={flattenToAppURL(item['@id'])}
      title={item.title}
      className="modulistica-link"
    >
      <div className="title">{item.title}</div>
      <FontAwesomeIcon
        icon={['fas', 'link']}
        alt={item.title}
        role="presentation"
        aria-hidden={true}
      />
    </UniversalLink>
  );
};

const DocRow = ({ doc, items }) => {
  const [itemOpen, setItemOpen] = useState(false);

  const titleWrapper = (
    <div
      className={cx('title-wrap', {
        'single-row': items?.length === 1,
      })}
    >
      <div id={`title-${doc.id}`} className="title">
        <UniversalLink href={flattenToAppURL(doc['@id'])}>
          {doc.title}
        </UniversalLink>
        {doc?.description && (
          <p className="description text-muted">{doc.description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={cx('doc-row', {
        'has-children': items?.length > 1,
      })}
      key={doc['@id']}
    >
      {/*Only title and/or description, no files */}
      {!items && <div className="doc">{titleWrapper}</div>}

      {/*Single file*/}
      {items?.length === 1 && (
        <div className="doc">
          {titleWrapper}
          {items?.length === 1 && (
            <Downloads item={items[0]} titleDoc={doc.title} />
          )}
        </div>
      )}

      {/*Accordion*/}
      {items?.length > 1 && (
        <>
          <div className="accordion-wrapper">
            <div id="headingAccordion" className="accordion-header doc">
              {titleWrapper}
            </div>
            <button
              onClick={() => {
                setItemOpen(itemOpen ? false : true);
              }}
              aria-expanded={itemOpen}
              aria-controls="collapsedContent"
              aria-labelledby={`title-${doc.id}`}
            >
              <Icon
                color="primary"
                icon={itemOpen ? 'it-minus' : 'it-plus'}
                padding={false}
              />
            </button>
          </div>
          <div
            id="collapsedContent"
            className={cx('accordion-content', { open: itemOpen })}
            role="region"
            aria-labelledby="headingAccordion"
          >
            <div className="accordion-inner">
              {items.map((modulo) => (
                <div className="doc modulo" key={modulo['@id']}>
                  <Downloads item={modulo} titleDoc={null} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DocRow;
