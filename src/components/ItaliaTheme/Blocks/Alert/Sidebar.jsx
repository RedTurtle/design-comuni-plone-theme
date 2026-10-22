import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { ColorListWidget } from 'design-comuni-plone-theme/components/ItaliaTheme';
import ImageSizeWidget from '@plone/volto/components/manage/Widgets/ImageSizeWidget';
import ImageWidget from '@plone/volto/components/manage/Widgets/ImageWidget';
import {
  getImageItem,
  toImageValue,
  LegacyImageNotice,
} from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Common/BlockImage';

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
        name: 'info',
        label: this.props.intl.formatMessage(messages.color_warning),
      },
      {
        name: 'warning',
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
            <FormattedMessage id="Alert" defaultMessage="Alert" />
          </h2>
        </header>

        <Segment className="form">
          <ColorListWidget
            id="bg_color"
            className="alert-colors-widget"
            title={this.props.intl.formatMessage(messages.Color)}
            value={this.props.data.bg_color}
            onChange={(id, value) => {
              this.props.onChangeBlock(this.props.block, {
                ...this.props.data,
                [id]: value,
              });
            }}
            colors={bg_colors}
          />
          <LegacyImageNotice image={this.props.data.image} />
          <ImageWidget
            id="image"
            block={this.props.block}
            title={this.props.intl.formatMessage(messages.Image)}
            value={getImageItem(this.props.data.image)?.['@id']}
            hideLinkPicker={true}
            onChange={(name, url, extra) => {
              this.props.onChangeBlock(this.props.block, {
                ...this.props.data,
                image: toImageValue(url, extra),
              });
            }}
          />
          <ImageSizeWidget
            id="sizeImage"
            title={this.props.intl.formatMessage(messages.CardImageSize)}
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
