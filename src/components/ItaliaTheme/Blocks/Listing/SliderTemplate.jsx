/*
 * Slider
 */
import 'slick-carousel/slick/slick.css';
import 'design-comuni-plone-theme/components/slick-carousel/slick/slick-theme.css';
import { Col, Container, Row } from 'design-react-kit';
import {
  Icon,
  ListingImage,
  ListingLinkMore,
} from 'design-comuni-plone-theme/components/ItaliaTheme';
import {
  useSlider,
  visibleSlideTitle,
} from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Listing/Commons/utils';
import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import config from '@plone/volto/registry';

const messages = defineMessages({
  viewImage: {
    id: 'viewImage',
    defaultMessage:
      'Sei attualmente in un carosello, per navigare usa le frecce sinistra e destra',
  },
  play: {
    id: 'Play slider',
    defaultMessage: 'Seleziona per riprodurre lo slider',
  },
  pause: {
    id: 'Pause slider',
    defaultMessage: 'Seleziona per mettere in pausa lo slider',
  },
  precedente: {
    id: 'precedente',
    defaultMessage: 'Precedente',
  },
  successivo: {
    id: 'successivo',
    defaultMessage: 'Successivo',
  },
  dots: {
    id: 'dots',
    defaultMessage: 'Navigazione elementi slider',
  },
  slideDot: {
    id: 'slideDot',
    defaultMessage: 'Vai alla slide {index}',
  },
  carousel: { id: 'carousel', defaultMessage: 'Carosello' },
  carouselSlide: {
    id: 'carouselSlide',
    defaultMessage: 'Slide',
  },
});

function NextArrow(props) {
  // Custom handling of focus for a11y
  const { className, style, onClick, intl, currentSlide } = props;
  const handleClick = (options) => {
    onClick(options, false);
  };
  const handleKeyboardUsers = (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
      e.stopPropagation();
      e.preventDefault();

      const link = visibleSlideTitle(
        `a.slide-link[data-slide="${currentSlide}"]`,
      );
      link && link.focus();
    }
  };

  return (
    <button
      className={className}
      style={{ ...style }}
      onClick={handleClick}
      title={intl.formatMessage(messages.successivo)}
      aria-label={intl.formatMessage(messages.successivo)}
      aria-hidden={true}
      onKeyDown={handleKeyboardUsers}
      id="sliderNextArrow"
    >
      <Icon icon="chevron-right" key="chevron-right" />
      <span class="visually-hidden">
        {intl.formatMessage(messages.successivo)}
      </span>
    </button>
  );
}

function PrevArrow(props) {
  // Custom handling of focus for a11y
  const {
    className,
    style,
    onClick,
    intl,
    focusNext,
    currentSlide,
    slideCount,
  } = props;
  const handleClick = (options) => {
    onClick(options, false);
  };
  const handleKeyboardUsers = (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.stopPropagation();
      e.preventDefault();
      if (currentSlide < slideCount) {
        const link = visibleSlideTitle(
          `a.slide-link[data-slide="${currentSlide}"]`,
        );
        link && link.focus();
      } else focusNext(0);
    }
  };
  return (
    <button
      className={className}
      style={{ ...style }}
      onClick={handleClick}
      title={intl.formatMessage(messages.precedente)}
      aria-label={intl.formatMessage(messages.precedente)}
      aria-hidden={true}
      id="sliderPrevArrow"
      onKeyDown={handleKeyboardUsers}
    >
      <Icon icon="chevron-left" key="chevron-left-prev" />
      <span class="visually-hidden">
        {intl.formatMessage(messages.precedente)}
      </span>
    </button>
  );
}

const Slide = (props) => {
  const { item, index, appearance, appearanceProp, intl } = props;
  const handleKeyboardUsers = (e) => {
    const { key, shiftKey } = e;
    if (key === 'Tab') {
      e.stopPropagation();
      e.preventDefault();
      // Keeping auto pause off for now
      // if (userAutoplay) setUserAutoplay(false);
      // slider.current.slickPause();
      let elementToFocus;
      if (shiftKey) {
        elementToFocus = document.getElementById('sliderPrevArrow');
      } else elementToFocus = document.getElementById('sliderNextArrow');
      elementToFocus.focus();
    }
  };

  const appearances = config.blocks.blocksConfig.listing.variations.filter(
    (v) => v.id === 'slider',
  )[0]?.appearance;
  const SlideItemAppearance = appearances[appearance] ?? appearances['default'];

  return (
    <div
      className="it-single-slide-wrapper"
      key={item['@id'] + index}
      data-slide={index}
      role="group"
      aria-label={
        intl.formatMessage(messages.carouselSlide) + ' ' + (index + 1)
      }
    >
      <div className={'slide-wrapper'}>
        <SlideItemAppearance
          {...props}
          {...appearanceProp}
          messages={messages}
          handleKeyboardUsers={handleKeyboardUsers}
        />
      </div>
    </div>
  );
};

const SliderTemplate = ({
  items,
  title,
  isEditMode,
  show_block_bg,
  linkTitle,
  linkHref,
  slidesToShow = '1',
  full_width = false,
  show_image_title = true,
  show_dots = true,
  autoplay = false,
  autoplay_speed = 2, //seconds
  slide_appearance = 'default',
  reactSlick,
  ...appearanceProp
}) => {
  const intl = useIntl();
  const [userAutoplay, setUserAutoplay] = useState(autoplay);
  const nSlidesToShow =
    items.length < parseInt(slidesToShow)
      ? items.length
      : parseInt(slidesToShow);
  const Slider = reactSlick.default;
  const { slider, focusNext } = useSlider(userAutoplay);
  const toggleAutoplay = () => {
    if (!slider?.current) return;
    if (userAutoplay) {
      setUserAutoplay(false);
      slider.current.slickPause();
    } else {
      setUserAutoplay(true);
      slider.current.slickPlay();
    }
  };

  const renderCustomDots = (props) => {
    // Custom handling of focus for a11y
    return (
      <ul
        className="slick-dots"
        aria-label={intl.formatMessage(messages.dots)}
        title={intl.formatMessage(messages.dots)}
      >
        {props.map((item, index) => {
          const El = item.type;
          const children = item.props.children;
          // Justified assumption: children is an Object and not an Array here
          const Child =
            children.type ||
            function () {
              return null;
            };
          return (
            <El
              className={`${item.props.className} slick-dot`}
              tabIndex={-1}
              title={intl.formatMessage(messages.slideDot, {
                index: index + 1,
              })}
              aria-hidden={true}
            >
              <Child
                {...children.props}
                tabIndex={-1}
                style={{ padding: 0 }}
                title={intl.formatMessage(messages.slideDot, {
                  index: index + 1,
                })}
                aria-label={intl.formatMessage(messages.slideDot, {
                  index: index + 1,
                })}
              />
            </El>
          );
        })}
      </ul>
    );
  };

  const settings = {
    dots: show_dots,
    infinite: true,
    autoplay: autoplay,
    speed: 500,
    slidesToShow: nSlidesToShow,
    slidesToScroll: nSlidesToShow,
    autoplaySpeed: autoplay_speed * 1000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    swipe: true,
    swipeToSlide: true,
    focusOnSelect: false,
    draggable: true,
    accessibility: true,
    nextArrow: <NextArrow intl={intl} focusNext={focusNext} />,
    prevArrow: <PrevArrow intl={intl} focusNext={focusNext} />,
    appendDots: renderCustomDots,
    // Custom handling of focus for a11y
    afterChange: focusNext,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className={cx(`sliderTemplate slidesToShow-${nSlidesToShow || 1}`, {
        'no-margin': full_width,
        ['appearance_' + slide_appearance]: slide_appearance,
      })}
    >
      <Container className="px-4">
        {title && (
          <Row>
            <Col>
              <h2 className="mb-4">{title}</h2>
            </Col>
          </Row>
        )}
        <div
          className={cx('slider-container', {
            'px-4 px-md-0': !full_width,
            'full-width': full_width,
          })}
        >
          <div className="it-carousel-all it-card-bg">
            {items?.length > nSlidesToShow && (
              <div className="play-pause-wrapper">
                <button
                  onClick={toggleAutoplay}
                  title={
                    userAutoplay
                      ? intl.formatMessage(messages.pause)
                      : intl.formatMessage(messages.play)
                  }
                  aria-label={
                    userAutoplay
                      ? intl.formatMessage(messages.pause)
                      : intl.formatMessage(messages.play)
                  }
                  tabIndex={0}
                >
                  <Icon
                    key={userAutoplay ? 'pause' : 'play'}
                    icon={userAutoplay ? 'pause' : 'play'}
                  />
                  <span>{userAutoplay ? 'pause' : 'play'}</span>
                </button>
              </div>
            )}

            <div
              role="region"
              aria-label={intl.formatMessage(messages.carousel)}
            >
              <Slider {...settings} role="region" ref={slider}>
                {items.map((item, index) => {
                  const image = ListingImage({
                    item,
                    loading: index === 0 ? 'eager' : 'lazy',
                    sizes: `max-width(991px) 620px, ${1300 / nSlidesToShow}px`,
                    critical: true,
                  });
                  return (
                    <Slide
                      image={image}
                      index={index}
                      full_width={full_width}
                      item={item}
                      show_image_title={show_image_title}
                      intl={intl}
                      setUserAutoplay={setUserAutoplay}
                      userAutoplay={userAutoplay}
                      slider={slider}
                      appearance={slide_appearance}
                      appearanceProp={appearanceProp}
                    />
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
        <ListingLinkMore title={linkTitle} href={linkHref} className="my-4" />
      </Container>
    </div>
  );
};

SliderTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkTitle: PropTypes.any,
  linkHref: PropTypes.any,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
};

export default injectLazyLibs(['reactSlick'])(SliderTemplate);
