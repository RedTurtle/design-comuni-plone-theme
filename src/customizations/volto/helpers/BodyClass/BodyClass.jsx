/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/helpers/BodyClass/BodyClass.jsx
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
 * - `remove` is order-independent: removals are collected separately and
 *   applied after the full list is built, so a `<BodyClass remove />`
 *   mounted anywhere always wins over an `add` for the same class name,
 *   regardless of which one mounted first. Needed because a `remove`
 *   instance can be mounted earlier in the tree (e.g. near the app root)
 *   than the instance whose class it needs to suppress (e.g. a Sidebar
 *   mounted deeper, later, permanently-but-hidden for a form widget).
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
  const removals = new Set();
  propsList.forEach((props) => {
    if (props.className) {
      if (props.remove) {
        removals.add(props.className);
      } else {
        classList = classList.concat(props.className.split(' '));
      }
    }
  });
  return classList.filter((c) => !removals.has(c));
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
