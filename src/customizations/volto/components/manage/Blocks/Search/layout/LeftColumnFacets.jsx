import React from 'react';
import {
  SearchInput,
  SearchDetails,
  Facets,
  FilterList,
  SortOn,
} from '@plone/volto/components/manage/Blocks/Search/components';
import { Container, Row, Col } from 'design-react-kit';
import { flushSync } from 'react-dom';
import { defineMessages, useIntl } from 'react-intl';
import { getBackgroundClass } from '@plone/volto/components/manage/Blocks/Search/utils';

const messages = defineMessages({
  searchButtonText: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const FacetWrapper = ({ children }) => (
  <Col className="facet pt-4">{children}</Col>
);

const LeftColumnFacets = (props) => {
  const {
    children,
    data,
    totalItems,
    facets,
    setFacets,
    setSortOn,
    setSortOrder,
    sortOn,
    sortOrder,
    onTriggerSearch,
    searchedText, // search text for previous search
    isEditMode,
    querystring = {},
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;

  return (
    <div
      className={`full-width ${getBackgroundClass(
        data?.show_block_bg,
        data?.bg_color,
      )}`}
    >
      <Container
        className="searchBlock-facets px-4 left-column-facets"
        stackable
      >
        {data.headline && (
          <Row>
            <Col>
              <h2 className="headline mb-5">{data.headline}</h2>
            </Col>
          </Row>
        )}

        <Row>
          {data.facets?.length > 0 && (
            <>
              <Col className="col-lg-4 pe-5 d-flex flex-column">
                <div className="facets">
                  {data.facetsTitle && (
                    <h5 className="mb-4">{data.facetsTitle}</h5>
                  )}
                  <Facets
                    querystring={querystring}
                    data={data}
                    facets={facets}
                    setFacets={(f) => {
                      flushSync(() => {
                        setFacets(f);
                        onTriggerSearch(searchedText || '', f);
                      });
                    }}
                    facetWrapper={FacetWrapper}
                  />
                </div>
                <div className="test">colonna di test</div>
              </Col>
            </>
          )}

          <Col className="col-lg-8">
            {(Object.keys(data).includes('showSearchInput')
              ? data.showSearchInput
              : true) && (
              <div className="search-wrapper d-flex input-group">
                <SearchInput {...props} isLive={isLive} />
              </div>
            )}

            <div className="search-results-count-sort d-flex align-center">
              <SearchDetails
                text={searchedText}
                total={totalItems}
                data={data}
              />
              <FilterList
                {...props}
                isEditMode={isEditMode}
                setFacets={(f) => {
                  flushSync(() => {
                    setFacets(f);
                    onTriggerSearch(searchedText || '', f);
                  });
                }}
              />

              {data.showSortOn && (
                <div className="sort-views-wrapper">
                  <SortOn
                    querystring={querystring}
                    data={data}
                    isEditMode={isEditMode}
                    sortOn={sortOn}
                    sortOrder={sortOrder}
                    setSortOn={(sortOn) => {
                      flushSync(() => {
                        setSortOn(sortOn);
                        onTriggerSearch(searchedText || '', facets, sortOn);
                      });
                    }}
                    setSortOrder={(sortOrder) => {
                      flushSync(() => {
                        setSortOrder(sortOrder);
                        onTriggerSearch(
                          searchedText || '',
                          facets,
                          sortOn,
                          sortOrder,
                        );
                      });
                    }}
                  />
                </div>
              )}
            </div>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LeftColumnFacets;
