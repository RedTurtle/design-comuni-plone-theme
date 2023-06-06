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
import { getBackgroundClass } from '@plone/volto/components/manage/Blocks/Search/utils';
import {
  RichText,
  richTextHasContent,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

const FacetWrapper = ({ children }) => (
  <Col basic className="facet pt-4">
    {children}
  </Col>
);

const RightColumnFacets = (props) => {
  const {
    children,
    data,
    totalItems,
    facets,
    setFacets,
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
  console.log('rfc', richTextHasContent(data.columnText));
  const showColumn =
    richTextHasContent(data.columnText) || data?.facets?.length > 0;
  return (
    <div
      className={`full-width ${getBackgroundClass(
        data?.show_block_bg,
        data?.bg_color,
      )}`}
    >
      <Container className="searchBlock-facets right-column-facets" stackable>
        {data.headline && (
          <Row>
            <Col>
              <h2 className="headline mb-5">{data.headline}</h2>
            </Col>
          </Row>
        )}

        <Row>
          <Col className={showColumn ? 'col-lg-8' : 'col-lg-12'}>
            {(Object.keys(data).includes('showSearchInput')
              ? data.showSearchInput
              : true) && (
              <div className="search-wrapper  d-flex input-group">
                <SearchInput {...props} isLive={isLive} />
              </div>
            )}

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

            <div className="search-results-count-sort">
              <SearchDetails
                text={searchedText}
                total={totalItems}
                data={data}
              />
            </div>
            {children}
          </Col>

          {showColumn && (
            <Col className="col-lg-4 ps-5">
              {richTextHasContent(data.columnText) && (
                <div className="columnText mb-5">
                  <RichText serif={false} data={data.info_testata} />
                </div>
              )}
              {data.facets?.length > 0 && (
                <div className="facets">
                  {data.facetsTitle && (
                    <h5 className="mb-4">{data.facetsTitle}</h5>
                  )}
                  <Facets
                    querystring={querystring}
                    data={data}
                    facets={facets}
                    isEditMode={isEditMode}
                    setFacets={(f) => {
                      flushSync(() => {
                        setFacets(f);
                        onTriggerSearch(searchedText || '', f);
                      });
                    }}
                    facetWrapper={FacetWrapper}
                  />
                </div>
              )}
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default RightColumnFacets;
