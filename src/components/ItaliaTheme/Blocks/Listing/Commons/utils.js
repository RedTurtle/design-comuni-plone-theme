import { useRef, useEffect } from 'react';
import {
  NextArrow,
  PrevArrow,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

export const getCategory = (item, show_type, show_section, props) => {
  let cat = [];

  if (item) {
    if (show_section) {
      cat.push(item.parent?.title);
    }
    if (show_type) {
      cat.push(item.design_italia_meta_type);
    }
  }

  if (cat.length > 0) {
    return cat.join(' - ');
  }
  return null;
};

export const useSlider = (userAutoplay, block_id) => {
  const slider = useRef(null);
  const sliderContainer = document.getElementById('outside-slider-' + block_id);
  const sliderElement = document.querySelector(`#slider_${block_id}`);
  const onIntersection = (entries, opt) => {
    entries.forEach((entry) =>
      entry.target.classList.toggle('visible', entry.isIntersecting),
    );
  };
  const observer = new IntersectionObserver(onIntersection, {
    root: null,
    threshold: 0.5,
  });

  if (sliderContainer) observer.observe(sliderContainer);
  useEffect(() => {
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focusNext = (currentSlide) => {
    if (!sliderElement) return;
    const sliderIsVisible = sliderContainer.classList.contains('visible');

    if (!sliderIsVisible) {
      slider.current.slickPause();
      return;
    }
    const slide = sliderElement.querySelector(
      `#slider_${block_id} .slick-slide[data-index="${currentSlide}"]`,
    );

    if (userAutoplay && !slide) return;

    if (!slide || document.activeElement === slide) {
      return;
    }
    // eslint-disable-next-line no-unused-expressions
    else if (
      // if the focus was already on a slide, move it to the current one
      Array.from(
        document.querySelectorAll(`#slider_${block_id} .slick-slide`),
      ).some((el) => el.contains(document.activeElement))
    ) {
      slide.focus();
    }
  };

  const visibleSlide = (selector) => {
    // Needed to deal with react-slick duplicating a lot of slides
    // when used in infinite mode. It's an useless and counterproductive
    // thing to do on their part, there are multiple issues opened.
    // The lib is not actually mantained so...

    return Array.from(document.querySelectorAll(selector)).find((e) => {
      const slick_slide = e.closest('.slick-slide');
      return !slick_slide.classList.contains('slick-cloned');
    });
  };

  const SliderNextArrow = (props) => {
    // Custom handling of focus for a11y
    const { className, style, onClick, currentSlide } = props;
    const handleClick = (options) => {
      onClick(options, false);
    };
    const handleKeyboardUsers = (e) => {
      if (e.key === 'Tab' && e.shiftKey) {
        e.stopPropagation();
        e.preventDefault();

        const slide = visibleSlide(
          `#slider_${block_id} .slick-slide[data-index="${currentSlide}"]`,
        );
        slide && slide.focus();
      }
    };

    return (
      <NextArrow
        className={className}
        style={{ ...style }}
        onClick={handleClick}
        onKeyDown={handleKeyboardUsers}
        id={'sliderNextArrow_' + block_id}
      />
    );
  };

  const SliderPrevArrow = (props) => {
    // Custom handling of focus for a11y
    const { className, style, onClick, focusNext, currentSlide, slideCount } =
      props;
    const handleClick = (options) => {
      onClick(options, false);
    };
    const handleKeyboardUsers = (e) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.stopPropagation();
        e.preventDefault();

        if (currentSlide < slideCount) {
          const slide = visibleSlide(
            `#slider_${block_id} .slick-slide[data-index="${currentSlide}"]`,
          );

          slide && slide.focus();
        } else focusNext(0, block_id);
      }
    };
    return (
      <PrevArrow
        className={className}
        style={{ ...style }}
        onClick={handleClick}
        onKeyDown={handleKeyboardUsers}
        id={'sliderPrevArrow_' + block_id}
      />
    );
  };

  return {
    slider,
    focusNext,
    visibleSlide,
    SliderNextArrow,
    SliderPrevArrow,
  };
};
