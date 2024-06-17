/**
 * DocRow view component.
 * @module components/theme/View/DocRow
 */

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { v4 as uuid } from 'uuid';
import Highlighter from 'react-highlight-words';

import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { DownloadFileFormat } from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import { FontAwesomeIcon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

/**
 * DocRow view component class.
 * @function DocRow
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */

const Downloads = ({ item, titleDoc, filteredWords }) => {
  return item['@type'] === 'Modulo' ? (
    <React.Fragment>
      {(!titleDoc || titleDoc !== item.title) && (
        <div className="title">
          <Highlighter
            highlightClassName="highlighted-text"
            searchWords={filteredWords}
            autoEscape={true}
            textToHighlight={item.title}
          />
        </div>
      )}
      <div className="downloads">
        <DownloadFileFormat file={item?.file_principale} />
        <DownloadFileFormat file={item?.formato_alternativo_1} />
        <DownloadFileFormat file={item?.formato_alternativo_2} />
      </div>
    </React.Fragment>
  ) : (
    <>
      <div className="title">
        <UniversalLink
          href={item.remoteUrl || flattenToAppURL(item['@id'])}
          title={item.title}
        >
          <Highlighter
            highlightClassName="highlighted-text"
            searchWords={filteredWords}
            autoEscape={true}
            textToHighlight={item.title}
          />
        </UniversalLink>
      </div>
      <div className="downloads">
        <UniversalLink
          href={item.remoteUrl || flattenToAppURL(item['@id'])}
          title={item.title}
          className="modulistica-link"
        >
          <FontAwesomeIcon
            icon={['fas', 'link']}
            alt={item.title}
            role="presentation"
            aria-hidden={true}
          />
        </UniversalLink>
      </div>
    </>
  );
};

const DocRow = ({ doc, items, searchableText, collapsable }) => {
  const filteredWords = searchableText.split(' ');
  const id = uuid();

  const [itemOpen, setItemOpen] = useState(!collapsable);

  useEffect(() => {
    //se ho fatto una ricerca, espando l'elemento
    if (collapsable) {
      if (searchableText?.length > 0) {
        setItemOpen(true);
      } else {
        setItemOpen(false);
      }
    }
  }, [searchableText, collapsable]);

  const titleWrapper = (
    <div
      className={cx('title-wrap', {
        'single-row': items?.length === 1,
      })}
    >
      <div id={`title-${doc.id}`} className="title">
        <UniversalLink href={doc.remoteUrl || flattenToAppURL(doc['@id'])}>
          <Highlighter
            highlightClassName="highlighted-text"
            searchWords={filteredWords}
            autoEscape={true}
            textToHighlight={doc.title}
          />
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
      {(!items || items.length === 0) && (
        <div className="doc">{titleWrapper}</div>
      )}

      {/*Single file*/}
      {items?.length === 1 && (
        <div className="doc">
          {titleWrapper}
          <Downloads
            item={items[0]}
            titleDoc={doc.title}
            filteredWords={filteredWords}
          />
        </div>
      )}

      {/*Accordion*/}
      {items?.length > 1 && (
        <>
          <div className="accordion-wrapper">
            <div id="headingAccordion" className="accordion-header doc">
              {titleWrapper}
            </div>
            {collapsable && (
              <button
                onClick={() => {
                  setItemOpen(itemOpen ? false : true);
                }}
                aria-expanded={itemOpen}
                aria-controls={`accordion-content-${id}`}
                aria-labelledby={`title-${doc.id}`}
              >
                <Icon
                  color="primary"
                  icon={itemOpen ? 'it-minus' : 'it-plus'}
                  padding={false}
                  key={itemOpen + id}
                />
              </button>
            )}
          </div>
          <div
            id={`accordion-content-${id}`}
            className={cx('accordion-content', { open: itemOpen })}
            role="region"
            aria-labelledby="headingAccordion"
          >
            <div className="accordion-inner">
              {items.map((modulo) => (
                <div className="doc modulo" key={modulo['@id']}>
                  <Downloads
                    item={modulo}
                    titleDoc={null}
                    filteredWords={filteredWords}
                  />
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
