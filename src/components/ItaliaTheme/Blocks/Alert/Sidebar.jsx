import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { FileWidget, FormFieldWrapper } from '@plone/volto/components';
import { ColorListWidget } from 'design-comuni-plone-theme/components/ItaliaTheme';
import ImageSizeWidget from '@plone/volto/components/manage/Widgets/ImageSizeWidget';

const messages = defineMessages({
  Color: {
    id: 'Color',
    defaultMessage: 'Colore',
  },
  color_warning: {
    id: 'color_warning',
    defaultMessage: 'Giallo',
  },
  color_orange: {
    id: 'color_orange',
    defaultMessage: 'Arancione',
  },
  color_danger: {
    id: 'color_danger',
    defaultMessage: 'Rosso',
  },
  Image: {
    id: 'Image',
    defaultMessage: 'Immagine',
  },
  size_image: {
    id: 'size_image',
    defaultMessage: 'Dimensione immagine',
  },
  CardImageSize: {
    id: 'CardImageSize',
    defaultMessage: 'Dimensione immagine',
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
        name: 'warning',
        label: this.props.intl.formatMessage(messages.color_warning),
      },
      {
        name: 'warning-orange',
        label: this.props.intl.formatMessage(messages.color_orange),
      },
      {
        name: 'danger',
        label: this.props.intl.formatMessage(messages.color_danger),
      },
    ];
    return (
      <Segment.Group raised>
        <header className="header pulled">
          <h2>
            <FormattedMessage id="blocco_alert" defaultMessage="Blocco alert" />
          </h2>
        </header>

        <Segment className="form">
          <ColorListWidget
            id="color"
            title={this.props.intl.formatMessage(messages.Color)}
            value={this.props.data.border_color}
            onChange={(id, value) => {
              this.props.onChangeBlock(this.props.block, {
                ...this.props.data,
                [id]: value,
              });
            }}
            colors={bg_colors}
          />
          <FileWidget
            id="image"
            title={this.props.intl.formatMessage(messages.Image)}
            value={this.props.data.image}
            onChange={(name, value) => {
              this.props.onChangeBlock(this.props.block, {
                ...this.props.data,
                image: value,
              });
            }}
          />
          <ImageSizeWidget
            id="sizeImage"
            title={this.props.intl.formatMessage(messages.size_image)}
            onChange={(name, value) => {
              this.props.onChangeBlock(this.props.block, {
                ...this.props.data,
                sizeImage: value,
              });
            }}
            value={this.props.data.sizeImage}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default injectIntl(Sidebar);
