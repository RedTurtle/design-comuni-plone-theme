import { Card, CardBody, CardText, CardTitle, Icon } from 'design-react-kit';
import { UniversalLink } from '@plone/volto/components';

const ContactsCard = ({ contact = {} }) => {
  return (
    <Card teaser className="shadow rounded">
      <Icon icon="it-telephone" />
      <CardBody>
        <CardTitle className="h5">
          <UniversalLink href={contact['@id']} className="text-decoration-none">
            {contact.title}
          </UniversalLink>
        </CardTitle>
        <CardText>
          {contact.address && <p>{contact.address}</p>}
          {contact.telephone && <p className="mt-3">T {contact.telephone}</p>}
          {contact.web && (
            <p>
              <UniversalLink
                href={
                  contact.web.match(/^(http:\/\/|https:\/\/)/gm)
                    ? contact.web
                    : `http://${contact.web}`
                }
                aria-label={`scopri di più su ${contact.web} - link esterno - apertura nuova scheda`}
                title={`scopri di più su ${contact.web} - link esterno - apertura nuova scheda`}
                target="_blank"
              >
                {contact.web}
              </UniversalLink>
            </p>
          )}
          {contact.email && (
            <p>
              <UniversalLink
                href={`mailto:${contact.email}`}
                aria-label={`invia un'email a ${contact.email} - apertura casella postale`}
                title={`invia un'email a ${contact.email} - apertura casella postale`}
                target="_blank"
              >
                {contact.email}
              </UniversalLink>
            </p>
          )}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default ContactsCard;
