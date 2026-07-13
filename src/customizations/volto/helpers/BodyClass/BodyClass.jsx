/*
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/helpers/BodyClass/BodyClass.jsx
 *
 * CUSTOMIZATIONS:
 * - Added a `remove` prop (PropTypes.bool, default `false`) to `BodyClass`.
 * - Changed `reducePropsToState` to split `props.className` into individual
 *   class tokens as soon as they are collected
 *   (`classList.concat(props.className.split(' '))`) instead of pushing the
 *   whole className string as a single entry, and to support removal: when
 *   `props.remove` is true, the existing `classList` is filtered to drop
 *   entries equal to `props.className` instead of being concatenated —
 *   allowing a mounted `<BodyClass className="x" remove />` to remove a
 *   previously-added body class.
 * - Simplified `handleStateChangeOnClient` accordingly: it no longer needs
 *   the upstream branch that splits space-separated class strings on the
 *   fly, since `reducePropsToState` now always stores single-token class
 *   names.
 */
import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import withSideEffect from 'react-side-effect';

/**
 * @export
 * @class BodyClass
 * @extends {Component}
 */
class BodyClass extends Component {
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.children) {
      return Children.only(this.props.children);
    }
    return null;
  }
}

BodyClass.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  remove: PropTypes.bool,
};

BodyClass.defaultProps = {
  children: null,
  className: null,
  remove: false,
};

/**
 * reducePropsToState
 * @function reducePropsToState
 * @param {*} propsList propsList
 * @returns {List} classList
 */
function reducePropsToState(propsList) {
  let classList = [];
  propsList.forEach((props) => {
    if (props.className) {
      if (props.remove) {
        classList = classList.filter((c) => c !== props.className);
      } else {
        classList = classList.concat(props.className.split(' '));
      }
    }
  });
  return classList;
}

/**
 * handleStateChangeOnClient
 * @function handleStateChangeOnClient
 * @param {*} classList classList
 * @returns {null} null
 */
function handleStateChangeOnClient(classList) {
  document.body.className = '';
  classList.forEach((className) => {
    if (!document.body.classList.contains(className)) {
      document.body.classList.add(className);
    }
  });
}

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient,
)(BodyClass);
