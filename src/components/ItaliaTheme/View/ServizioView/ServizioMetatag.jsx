import { Helmet } from '@plone/volto/helpers';
import { getSiteProperty } from 'design-comuni-plone-theme/helpers';

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

  return (
    <Helmet>
      <script type="application/ld+json">
        {`
          '@context': ${content.title},
          '@type': 'GovernmentService',
          name: ${content.title},
          serviceType: ${content.parent.title},
          serviceOperator: {
            '@type': 'GovernmentOrganization',
            name: ${siteTitle},
          },
          areaServed: {
            '@type': 'AdministrativeArea',
            name: ${fieldDataToPlainText(content.copertura_geografica)},
          },
          audience: {
            '@type': 'Audience',
            audienceType: ${fieldDataToPlainText(content.a_chi_si_rivolge)},
          },
          availableChannel: {
            '@type': 'ServiceChannel',
            name: 'Dove rivolgersi',
            serviceUrl: ${content.canale_digitale_link},
            availableLanguage: {
              '@type': 'Language',
              name: 'Italian',
              alternateName: 'it',
            },
            serviceLocation: {
              '@type': 'Place',
              name: ${content.ufficio_responsabile[0].title},
              address: {
                '@type': 'PostalAddress',
                streetAddress: ${
                  content.ufficio_responsabile[0].sede[0].street
                },
                postalCode:  ${
                  content.ufficio_responsabile[0].sede[0].zip_code
                },
                addressLocality:  ${
                  content.ufficio_responsabile[0].sede[0].city
                },
              },
            },
          },
        `}
      </script>
    </Helmet>
  );
};

export default ServizioMetatag;
