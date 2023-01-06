import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardText, CardTitle, Icon } from 'design-react-kit';
import { getContent, resetContent } from '@plone/volto/actions';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

const ContactsCard = ({ contact = {} }) => {
  const dispatch = useDispatch();

  const contactUrl = contact['@id'];

  const { loading, loaded, error, data } = useSelector(
    (state) => state.content.subrequests[flattenToAppURL(contactUrl)] ?? {},
  );

  useEffect(() => {
    if (!loading && !loaded) {
      dispatch(
        getContent(
          flattenToAppURL(contactUrl),
          null,
          flattenToAppURL(contactUrl),
        ),
      );
    }
  }, [dispatch, contactUrl, loading, loaded]);

  useEffect(
    () => () => dispatch(resetContent(flattenToAppURL(contactUrl))),
    [dispatch, contactUrl],
  );

  if (error) {
    return null;
  }

  return (
    <Card teaser noWrapper className="shadow rounded">
      <Icon icon="it-telephone" />
      <CardBody>
        <CardTitle className="h5">
          <UniversalLink href={contact['@id']} className="text-decoration-none">
            {contact.title}
          </UniversalLink>
        </CardTitle>
        <CardText>
          {data?.value_punto_contatto.map((pdc, index) => {
            switch (pdc.pdc_type) {
              // case 'address':
              //   return <p>{pdc.pdc_value}</p>;
              case 'email':
              case 'pec':
                return (
                  <p key={index}>
                    <UniversalLink href={`mailto:${pdc.pdc_value}`}>
                      {pdc.pdc_value}
                    </UniversalLink>
                  </p>
                );
              case 'telefono':
                return <p key={index}>T {pdc.pdc_value}</p>;
              case 'url':
              case 'account':
              case 'whatsapp':
              case 'telegram':
              case 'skype':
              case 'linkedin':
              case 'twitter':
                return (
                  <p key={index}>
                    <UniversalLink
                      href={
                        pdc.pdc_value.match(/^(http:\/\/|https:\/\/)/gm)
                          ? pdc.pdc_value
                          : `http://${pdc.pdc_value}`
                      }
                    >
                      {pdc.pdc_value}
                    </UniversalLink>
                  </p>
                );
              default:
                return null;
            }
          }) ?? null}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default ContactsCard;
