import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { ColorListWidget } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { CheckboxWidget } from '@plone/volto/components';

const messages = defineMessages({
  info_color: {
    id: 'info_color',
    defaultMessage: 'Color',
  },
  info_color_primary: {
    id: 'info_color_primary',
    defaultMessage: 'Primary color',
  },
  info_color_secondary: {
    id: 'info_color_secondary',
    defaultMessage: 'Secondary color',
  },
  info_color_tertiary: {
    id: 'info_color_tertiary',
    defaultMessage: 'Tertiary color',
  },
  bg_color: {
    id: 'bg_color',
    defaultMessage: 'Colore di sfondo',
  },
});

class Sidebar extends Component {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    block: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
  };

  render() {
    const bg_colors = [
      {
        name: 'primary',
        label: this.props.intl.formatMessage(messages.info_color_primary),
      },
      {
        name: 'secondary',
        label: this.props.intl.formatMessage(messages.info_color_secondary),
      },
      {
        name: 'tertiary',
        label: this.props.intl.formatMessage(messages.info_color_tertiary),
      },
    ];

    return (
      <Segment.Group raised>
        <header className="header pulled infoblock">
          <h2>
            <FormattedMessage
              id="blocco_info"
              defaultMessage="Blocco informazioni"
            />
          </h2>
        </header>

        <Segment className="form">
          <ColorListWidget
            id="color"
            title={this.props.intl.formatMessage(messages.info_color)}
            value={this.props.data.color}
            onChange={(id, value) => {
              this.props.onChangeBlock(this.props.block, {
                ...this.props.data,
                [id]: value,
              });
            }}
            colors={bg_colors}
          />

          <CheckboxWidget
            id="bg_color"
            title={this.props.intl.formatMessage(messages.bg_color)}
            value={this.props.data.bg_color ? this.props.data.bg_color : false}
            onChange={(name, checked) => {
              this.props.onChangeBlock(this.props.block, {
                ...this.props.data,
                [name]: checked,
              });
            }}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default injectIntl(Sidebar);
