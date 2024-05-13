import React, { useState } from 'react';
import _ from 'lodash';
import { defineMessages, useIntl } from 'react-intl';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardCategory,
  CardTitle,
  CardText,
} from 'design-react-kit';
import { Pagination } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { UniversalLink } from '@plone/volto/components';

const messages = defineMessages({
  servizi_offerti: {
    id: 'servizi_offerti',
    defaultMessage: 'Servizi disponibili',
  },
});

const UOServices = ({ content }) => {
  const intl = useIntl();

  //* Pagination **/
  const divideServicesIntoBatches = (arr, batchSize) => {
    const batches = [];
    for (let i = 0; i < arr.length; i += batchSize) {
      batches.push(arr.slice(i, i + batchSize));
    }
    return batches;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const bSize = 4;

  //* Calcolo numero pagine

  const pageNumbers = _.range(
    1,
    Math.ceil(content?.servizi_offerti?.length / bSize + 1),
  );

  const onPaginationChange = (activePage) => {
    const current = activePage?.children ?? 1;
    setCurrentPage(current);
  };

  return content?.servizi_offerti?.length > 0 ? (
    <section
      id={'servizi_offerti'}
      className={'it-page-section anchor-offset mb-5 '}
    >
      <h2 id={`header-servizi_offerti`} className="mb-3 h4">
        {intl.formatMessage(messages.servizi_offerti)}
      </h2>
      <Row className="card-wrapper card-teaser-wrapper align-items-stretch">
        {divideServicesIntoBatches(content?.servizi_offerti, bSize)[
          currentPage - 1
        ]?.map((servizio, i) => (
          <Col xs="12" lg="6">
            <Card className="shadow rounded card-big-io-comune p-3 my-3">
              <CardBody>
                <CardCategory date="">{servizio.parent_title}</CardCategory>
                <CardTitle tag="h5">
                  <UniversalLink href={servizio['@id']}>
                    {servizio.title}
                  </UniversalLink>
                </CardTitle>
                <CardText>{servizio.description}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="pagination-wrapper">
        <Pagination
          activePage={currentPage}
          totalPages={pageNumbers.length}
          onPageChange={(e, { activePage }) => onPaginationChange(activePage)}
        />
      </div>
    </section>
  ) : null;
};

export default UOServices;
