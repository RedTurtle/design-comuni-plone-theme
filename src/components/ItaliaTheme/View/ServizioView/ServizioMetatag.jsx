import { Helmet, toPublicURL } from '@plone/volto/helpers';
import { getSiteProperty } from 'design-comuni-plone-theme/helpers';
import { richTextHasContent } from 'design-comuni-plone-theme/components/ItaliaTheme/View';

const ServizioMetatag = ({ content }) => {
  const siteTitle = getSiteProperty('siteTitle');

  const fieldDataToPlainText = (field) => {
    return field.blocks_layout.items.reduce((accumulator, item, index) => {
      if (field.blocks[item]['@type'] === 'text') {
        if (index > 0) accumulator += ' ';
        accumulator += field.blocks[item].text.blocks[0].text;
      }
      return accumulator;
    }, '');
  };

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: content.title,
    serviceType: content.parent.title,
    serviceOperator: {
      '@type': 'GovernmentOrganization',
      name: siteTitle,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: richTextHasContent(content.copertura_geografica)
        ? fieldDataToPlainText(content.copertura_geografica)
        : siteTitle,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'Dove rivolgersi',
      availableLanguage: {
        '@type': 'Language',
        name: 'Italian',
        alternateName: 'it',
      },
    },
  };

  if (richTextHasContent(content.a_chi_si_rivolge)) {
    schemaOrg.audience = {
      '@type': 'Audience',
      name: fieldDataToPlainText(content.a_chi_si_rivolge),
    };
  }

  if (content.canale_digitale_link) {
    schemaOrg.availableChannel.serviceUrl = toPublicURL(
      content.canale_digitale_link,
    );
  }

  if (content.ufficio_responsabile[0]) {
    schemaOrg.availableChannel.serviceLocation = {
      '@type': 'Place',
      name: content.ufficio_responsabile[0].title,
    };

    if (content.ufficio_responsabile[0].sede[0]) {
      schemaOrg.availableChannel.serviceLocation.address = {
        '@type': 'PostalAddress',
        streetAddress: content.ufficio_responsabile[0].sede[0].street,
        postalCode: content.ufficio_responsabile[0].sede[0].zip_code,
        addressLocality: content.ufficio_responsabile[0].sede[0].city,
      };
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json" data-element="metatag">
        {JSON.stringify(schemaOrg)}
      </script>
    </Helmet>
  );
};

export default ServizioMetatag;
